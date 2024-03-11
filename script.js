import express from 'express';
import bodyParser from 'body-parser';
import { auth } from 'express-openid-connect';
import dotenv from "dotenv";

import Stripe from "stripe"; // Cambiado a import from
import cors from "cors"; // Cambiado a import from

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // Utilizando la variable de entorno para la clave secreta de Stripe

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASEURL,
  clientID: process.env.CLIENTID,
  issuerBaseURL: process.env.ISSUERBASEURL,

};

/*const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "BakeryDB",
  password: "2810",
  port: 5432,
});*/

//db.connect();

const app = express();
const port = 3000;

// Configuración de Express
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs'); // Configuración del motor de plantillas EJS



app.use(cors({ origin: "http://localhost:3000" }));
app.use(bodyParser.json());

app.post("/api/checkout", async (req, res) => {
  // you can get more data to find in a database, and so on
  const { id, amount,nombre,apellido,identificacion, email,direccion,telefono,indicaciones,pais,ciudad,estado } = req.body;
  console.log("Datos recibidos en el backend:", { id });
  console.log("Datos recibidos en el backend:", { amount});
  console.log("Datos recibidos en el backend:", { nombre});
  console.log("Datos recibidos en el backend:", { apellido});
  console.log("Datos recibidos en el backend:", { identificacion});
  console.log("Datos recibidos en el backend:", { email});
  console.log("Datos recibidos en el backend:", { direccion});
  console.log("Datos recibidos en el backend:", { telefono});
  console.log("Datos recibidos en el backend:", { indicaciones});
  console.log("Datos recibidos en el backend:", { pais});
  console.log("Datos recibidos en el backend:", { ciudad});
  console.log("Datos recibidos en el backend:", { estado});

  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "BRL",
      description: "Bakery Product",
      payment_method: id,
      confirm: true, //confirm the payment at the same time
      return_url: "http://localhost:3000", // Aquí debes proporcionar la URL a la que deseas redirigir al cliente
    });

    console.log(payment);

    return res.status(302).header("Location", "http://localhost:3000").end();
  } catch (error) {
    console.log(error);
    return res.json({ message: error.raw.message });
  }
 
});

//Recibir datos del front
app.post('/CheckoutForm', (req, res) => {
  const  { quantity , totalPrice , productNamesAndQuantities}= req.body;
  console.log("Datos recibidos en el backend:", { quantity});
  console.log("Datos recibidos en el backend:", { totalPrice});
  console.log("Datos recibidos en el backend:", { productNamesAndQuantities});
  // Renderiza la plantilla checkout.ejs con los datos recibidos
  
});

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));


app.get("/", async (req,res) =>{
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

//Usuarios
app.get('/user', (req, res) => {

  res.render("user.ejs",{
  isAuthenticated: req.oidc.isAuthenticated(),
  user: req.oidc.user,
  });
});

app.get("/salados", async (req,res) =>{
  res.render("salados.ejs");
});

app.get("/canasta", async (req,res) =>{
  res.render("canastas.ejs");
});

app.get("/dulces", async (req,res) =>{
  res.render("dulces.ejs");
});

app.get("/cafe", async (req,res) =>{
  res.render("cafe.ejs");
});
 
app.get("/jugos", async (req,res) =>{
  res.render("jugos.ejs");
});

app.get("/saludables", async (req,res) =>{
  res.render("saludables.ejs");
});

app.get("/pasteles", async (req,res) =>{
  res.render("pasteleria.ejs");
});

app.get("/combos", async (req,res) =>{
  res.render("combos.ejs");
});



app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
  