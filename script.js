import express from 'express';
import bodyParser from 'body-parser';
import { auth } from 'express-openid-connect';
import dotenv from "dotenv";
import Stripe from "stripe";
import cors from "cors";
import fs from 'fs';
import pkg from 'pg';

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

app.post("/api/checkout", async (req, res) => {
  const { id, amount, nombre, apellido, identificacion, email, direccion, telefono, extras, pais, ciudad, estado, metodo_pago, promoCode, monto_total, products } = req.body;
  console.log("Datos recibidos en el backend:", { id, amount, nombre, apellido, identificacion, email, direccion, telefono, extras, pais, ciudad, estado, metodo_pago, promoCode, monto_total, products });

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

   // Crear pedido y productos en la base de datos
   for (const product of products) {
     const totalPrecio = product.quantity * product.price; // Cálculo del precio total por producto
     const insertPedidoQuery = `
       INSERT INTO pedidos (cliente_id, producto_id, cantidad, precio_total, metodo_pago, codigo_promocional, estado_pedido)
       VALUES ($1, (SELECT id FROM productos WHERE name = $2 LIMIT 1), $3, $4, $5, $6, $7);
     `;
     const pedidoValues = [identificacion, product.name, product.quantity, totalPrecio, metodo_pago, promoCode, 'Pendiente'];
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

    // Después de confirmar el pago, redirigir a la página principal
    res.redirect("/");

  } catch (error) {
    console.log(error);
    return res.json({ message: error.raw.message });
  }
});

app.post('/CheckoutForm', (req, res) => {
  const { quantity, totalPrice, productNamesAndQuantities } = req.body;
  console.log("Datos recibidos en el backend:", { quantity, totalPrice, productNamesAndQuantities });
});

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

