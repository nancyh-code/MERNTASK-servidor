const mongoose = require("mongoose");

const UsuariosSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true, //elimina espacios en blanco
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  registro: {
    type: Date,
    default: Date.now(), //genera la fecha en el momento ue el usuario se registra
  },
});

module.exports = mongoose.model("Usuario", UsuariosSchema);
