import express from 'express';
import bodyParser from 'body-parser';
import { auth } from 'express-openid-connect';
import dotenv from "dotenv";
import Stripe from "stripe";
import cors from "cors";
import fs from 'fs';
import pkg from 'pg';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import PDFDocument from 'pdfkit';
import moment from 'moment';

// Obtener __dirname en un entorno de módulo ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const { Client } = pkg;

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASEURL,
  clientID: process.env.CLIENTID,
  issuerBaseURL: process.env.ISSUERBASEURL,
};

// Verificar si la carpeta 'uploads' existe, si no, crearla
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Configuración de multer para manejar la subida de archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Carpeta donde se guardarán los archivos
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// Configuración de la conexión a la base de datos
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'BakeryDB',
  password: '1234',
  port: 5432,
});

async function setupDatabase() {
  try {
    // Conectar a la base de datos
    await client.connect();
    console.log('Conectado a la base de datos');

    // Leer el archivo JSON
    const data = fs.readFileSync('./data/products.json', 'utf8');
    const productos = JSON.parse(data);

    // Consultar si el producto ya existe
    const checkQuery = 'SELECT COUNT(*) FROM productos WHERE id = $1';
    const insertQuery = `
      INSERT INTO productos (id, name, price, img_url, category)
      VALUES ($1, $2, $3, $4, $5)
      ON CONFLICT (id) DO UPDATE 
      SET name = EXCLUDED.name,
          price = EXCLUDED.price,
          img_url = EXCLUDED.img_url,
          category = EXCLUDED.category
    `;

    for (const producto of productos) {
      const { id, name, price, imgUrl, category } = producto;

      // Verificar si el producto ya existe
      const { rows } = await client.query(checkQuery, [id]);
      const exists = parseInt(rows[0].count) > 0;

      if (!exists) {
        // Insertar el producto si no existe
        const values = [id, name, price, imgUrl, category];
        await client.query(insertQuery, values);
      }
    }
  } catch (err) {
    console.error('Error:', err);
  }
}

setupDatabase();

const app = express();
const port = 3000;

// Configuración de Express
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');

app.use(cors({ origin: "http://localhost:3000" }));
app.use(bodyParser.json());

// Ruta de pago y generación de factura
app.post("/api/checkout", async (req, res) => {
  const { id, amount, nombre, apellido, identificacion, email, direccion, telefono, extras, pais, ciudad, estado, metodo_pago, promoCode, monto_total, products, sucursal } = req.body;
  console.log("Datos recibidos en el backend:", { id, amount, nombre, apellido, identificacion, email, direccion, telefono, extras, pais, ciudad, estado, metodo_pago, promoCode, monto_total, products, sucursal });

  try {
    // Crear cliente en la base de datos o actualizar la información existente
    const insertClienteQuery = `
      INSERT INTO clientes (ruc_ci, nombre, apellido, email, telefono, direccion, indicaciones, pais, estado, ciudad, codigo_postal)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      ON CONFLICT (ruc_ci) DO UPDATE 
      SET nombre = EXCLUDED.nombre,
          apellido = EXCLUDED.apellido,
          email = EXCLUDED.email,
          telefono = EXCLUDED.telefono,
          direccion = EXCLUDED.direccion,
          indicaciones = EXCLUDED.indicaciones,
          pais = EXCLUDED.pais,
          estado = EXCLUDED.estado,
          ciudad = EXCLUDED.ciudad,
          codigo_postal = EXCLUDED.codigo_postal;
    `;
    const clienteValues = [identificacion, nombre, apellido, email, telefono, direccion, extras || '', pais, estado, ciudad, ''];
    await client.query(insertClienteQuery, clienteValues);

    // Obtener detalles de la sucursal desde la base de datos
    const sucursalQuery = `
      SELECT nombre_suc, propietario, direccion, telefono, email
      FROM sucursal
      WHERE nombre_suc = $1
    `;
    const sucursalResult = await client.query(sucursalQuery, [sucursal]);
    const sucursalData = sucursalResult.rows[0];

    // Crear un nuevo registro de factura en la base de datos
    const facturaInsertQuery = `
      INSERT INTO facturas (cliente_id, sucursal_id, fecha_emision, monto_total)
      VALUES ($1, (SELECT id FROM sucursal WHERE nombre_suc = $2), NOW(), $3)
      RETURNING id;
    `;
    const facturaResult = await client.query(facturaInsertQuery, [identificacion, sucursal, monto_total]);
    const facturaId = facturaResult.rows[0].id;

    // Crear pedido y productos en la base de datos
    for (const product of products) {
      const totalPrecio = product.quantity * product.price; // Cálculo del precio total por producto
      const insertPedidoQuery = `
        INSERT INTO pedidos (cliente_id, producto_id, cantidad, precio_total, metodo_pago, codigo_promocional, estado_pedido, factura_id)
        VALUES ($1, (SELECT id FROM productos WHERE name = $2 LIMIT 1), $3, $4, $5, $6, $7, $8);
      `;
      const pedidoValues = [identificacion, product.name, product.quantity, totalPrecio, metodo_pago, promoCode, 'Pendiente', facturaId];
      await client.query(insertPedidoQuery, pedidoValues);
    }

    // Confirmación del pago con Stripe
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "BRL",
      description: "Bakery Product",
      payment_method: id,
      confirm: true,
      return_url: "http://localhost:3000",
    });

    console.log(payment);

    // Directorio específico para las facturas
    const invoiceDir = path.join(__dirname, 'facturas');
    try {
      if (!fs.existsSync(invoiceDir)) {
        fs.mkdirSync(invoiceDir);  // Crear el directorio si no existe
      }
    } catch (err) {
      console.error('Error al crear el directorio de facturas:', err);
      return res.status(500).json({ message: 'Error al generar la factura' });
    }

    // Generar la factura en formato PDF
    const doc = new PDFDocument({ size: 'A4' });
    const invoicePath = path.join(invoiceDir, `factura_${facturaId}.pdf`);
    const writeStream = fs.createWriteStream(invoicePath);
    doc.pipe(writeStream);

    // Encabezado de la Tienda
    doc.fontSize(25).text('Factura', { align: 'center' });
    doc.fontSize(15).text('Robina´s Bakery', { align: 'center' });
    doc.fontSize(12).text(`Sucursal: ${sucursalData.nombre_suc}`, { align: 'center' });
    doc.text(`Propietario: ${sucursalData.propietario}`, { align: 'center' });
    doc.text(`Dirección: ${sucursalData.direccion}`, { align: 'center' });
    doc.text(`Teléfono: ${sucursalData.telefono}`, { align: 'center' });
    doc.text(`Email: ${sucursalData.email}`, { align: 'center' });
    doc.moveDown();

    // Información de la factura
    doc.fontSize(12).text(`Nro. de Factura: ${facturaId}`);
    doc.text(`Fecha de Emisión: ${moment().format('DD/MM/YYYY')}`);
    doc.moveDown();

    // Información del cliente
    doc.fontSize(15).text('Detalles del Cliente:', { underline: true });
    doc.fontSize(12).text(`Nombre: ${nombre} ${apellido}`);
    doc.text(`RUC/CI: ${identificacion}`);
    doc.moveDown();

    // Detalles de los productos
    doc.fontSize(15).text('Detalles de la Compra:', { underline: true });
    products.forEach((product, index) => {
      doc.fontSize(12).text(`${index + 1}. Producto: ${product.name}`);
      doc.text(`   Cantidad: ${product.quantity}`);
      doc.text(`   Precio Unitario: ${product.price}`);
      doc.text(`   Precio Total: ${product.quantity * product.price}`);
      doc.moveDown();
    });

    // Monto total
    doc.fontSize(15).text(`Monto Total: ${monto_total}`, { align: 'right' });

    doc.end();

    writeStream.on('finish', () => {
      console.log('Factura generada exitosamente.');
      res.status(200).json({ message: 'Pago procesado y factura generada', facturaId });
    });

    writeStream.on('error', (err) => {
      console.error('Error al generar la factura:', err);
      return res.status(500).json({ message: 'Error al generar la factura' });
    });

  } catch (error) {
    console.log(error);
    return res.json({ message: error.raw ? error.raw.message : 'Error en el servidor' });
  }
});


app.post('/CheckoutForm', (req, res) => {
  const { quantity, totalPrice, productNamesAndQuantities } = req.body;
  console.log("Datos recibidos en el backend:", { quantity, totalPrice, productNamesAndQuantities });
});

// Ruta para recibir el formulario de contratación
app.post('/api/contratacion', upload.fields([{ name: 'cv' }, { name: 'foto' }]), async (req, res) => {
  try {
    const { nombre, identidad, email, telefono, direccion, posicion, disponibilidad, carta_presentacion } = req.body;
    const cvPath = req.files['cv'][0].path;
    const fotoPath = req.files['foto'][0].path;

    // Inserta los datos en la base de datos
    const result = await client.query(
      `INSERT INTO solicitudes (nombre_completo,identidad, email, telefono, direccion, posicion, disponibilidad, carta_presentacion, cv, foto) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9,$10) RETURNING id`,
      [nombre, identidad, email, telefono, direccion, posicion, disponibilidad, carta_presentacion, cvPath, fotoPath]
    );

    res.status(200).json({ message: 'Solicitud enviada exitosamente', solicitudId: result.rows[0].id });
  } catch (error) {
    console.error('Error al guardar los datos', error);
    res.status(500).json({ message: 'Error al guardar los datos' });
  }
});

app.post('/api/contacto', async (req, res) => {
  try {
    const { nombre, email, area, comentarios, politicaAceptada } = req.body;

    // Asegurarse de que todos los campos requeridos están presentes
    if (!nombre || !email || !area || !comentarios || politicaAceptada === undefined) {
      return res.status(400).json({ message: 'Todos los campos son requeridos' });
    }

    // Inserta los datos en la base de datos
    const result = await client.query(
      `INSERT INTO contacto (nombre, email, area, comentarios, politica) 
       VALUES ($1, $2, $3, $4, $5) RETURNING id`,
      [nombre, email, area, comentarios, politicaAceptada]
    );

    res.status(200).json({ message: 'Solicitud enviada exitosamente', solicitudId: result.rows[0].id });
  } catch (error) {
    console.error('Error al guardar los datos:', error);
    res.status(500).json({ message: 'Error al guardar los datos' });
  }
});



//auth0 para inicios de sesion
app.use(auth(config));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/nosotros", (req, res) => {
  res.render("nosotros.ejs");
});

app.get("/menu", (req, res) => {
  res.render("menu.ejs");
});

app.get("/contacto", (req, res) => {
  res.render("contacto.ejs");
});

app.get("/empresa", (req, res) => {
  res.render("empresa.ejs");
});

app.get('/user', (req, res) => {
  res.render("user.ejs", {
    isAuthenticated: req.oidc.isAuthenticated(),
    user: req.oidc.user,
  });
});

app.get("/salados", async (req, res) => {
  res.render("salados.ejs");
});

app.get("/canasta", async (req, res) => {
  res.render("canastas.ejs");
});

app.get("/dulces", async (req, res) => {
  res.render("dulces.ejs");
});

app.get("/cafe", async (req, res) => {
  res.render("cafe.ejs");
});

app.get("/jugos", async (req, res) => {
  res.render("jugos.ejs");
});

app.get("/saludables", async (req, res) => {
  res.render("saludables.ejs");
});

app.get("/pasteles", async (req, res) => {
  res.render("pasteleria.ejs");
});

app.get("/combos", async (req, res) => {
  res.render("combos.ejs");
});

app.get("/cart", async (req, res) => {
  res.render("cart.ejs");
});

app.get("/checkout", async (req, res) => {
  res.render("checkout.ejs");
});

app.get("/contratacion", async (req, res) => {
  res.render("contratacion.ejs");
});

app.get("/locales", async (req, res) => {
  res.render("locales.ejs");
});

// Ruta de búsqueda
app.get('/buscar', async (req, res) => {
  const query = req.query.query.toLowerCase();

  try {
    // Buscar en productos por nombre
    const productResult = await client.query(
      'SELECT category FROM productos WHERE LOWER(name) = $1',
      [query]
    );

    if (productResult.rows.length > 0) {
      // Si se encuentra el producto, redirigir por categoría
      const category = productResult.rows[0].category.toLowerCase();
      res.redirect(`/menu/${category}`);
      return; // Salir para no realizar la búsqueda por categoría
    }

    // Buscar en productos por categoría
    const categoryResult = await client.query(
      'SELECT DISTINCT category FROM productos WHERE LOWER(category) = $1',
      [query]
    );

    if (categoryResult.rows.length > 0) {
      // Si se encuentra la categoría, redirigir a la página de esa categoría
      const category = categoryResult.rows[0].category.toLowerCase();
      res.redirect(`/menu/${category}`);
    } else {
      // Redirigir a la página general si no se encuentra ni producto ni categoría
      res.redirect('/menu');
    }
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('Error en la búsqueda');
  }
});

// Ruta para manejar las categorías dinámicas
app.get('/menu/:category', (req, res) => {
  const category = req.params.category.toLowerCase();

  // Validar si la categoría existe en las rutas definidas
  const validCategories = ['cafe', 'dulces', 'canasta', 'salados', 'jugos', 'saludables', 'pasteles', 'combos'];
  
  if (validCategories.includes(category)) {
    // Redirigir a la ruta específica para la categoría
    res.redirect(`/${category}`);
  } else {
    // Redirigir a la página general si la categoría no es válida
    res.redirect('/menu');
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

