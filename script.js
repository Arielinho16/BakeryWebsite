import express from 'express';
import bodyParser from 'body-parser';

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

app.get("/user", (req, res) => {
  res.render("user.ejs");
});

app.get("/signup", (req, res) => {
  res.render("signup.ejs");
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
  