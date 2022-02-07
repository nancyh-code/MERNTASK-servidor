const express = require("express");
const conectarDB = require("./config/db");

//crear el servidor
const app = express();

// Conectar a la base de datos
conectarDB();

// Habilitar express.json
app.use(express.json({ extend: true }));
//puerto
const PORT = process.env.PORT || 4000;

//Importar rutas
app.use("/api/usuarios", require("./routes/usuarios"));

//Definir página principal
// app.get("/", (req, res) => {
//   res.send("hola mundo");
// });

// arrancar la app
app.listen(PORT, () => {
  console.log(`El servidor esta funcionando en el puerto ${PORT}`);
});
