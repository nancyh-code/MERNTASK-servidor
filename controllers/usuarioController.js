const Usuario = require("../models/Usuario");

exports.crearUsuario = async (req, res) => {
  // extraer email y password
  const { email, password } = req.body;

  try {
    //Revisar que el usuario sea unico
    let usuario = await Usuario.findOne({ email });

    if (usuario) {
      return res.status(400).json({ msg: "Usuario ya existe" });
    }

    //crear usuario
    usuario = new Usuario(req.body);

    //guardar usuario
    await usuario.save();

    //mensaje de confirmación
    res.send({ msg: "Usuario creado correctamente" });
  } catch (err) {
    console.log(err);
    res.status(400).send("Hubo un error");
  }
};
