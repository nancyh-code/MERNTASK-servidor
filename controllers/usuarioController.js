const Usuario = require("../models/Usuario");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.crearUsuario = async (req, res) => {
  // revisar si hay errores
  const errores = validationResult(req, res);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }
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

    // Hashear el password
    const salt = await bcryptjs.genSalt(10);
    usuario.password = await bcryptjs.hash(password, salt);

    //guardar usuario
    await usuario.save();

    //Crear y firmar el jwt
    const payload = {
      usuario: {
        id: usuario.id,
      },
    };

    //firmar el jwt
    jwt.sign(
      payload,
      `${process.env.SECRETA}`,
      {
        expiresIn: 360000,
      },
      (error, token) => {
        if (error) throw error;
        //mensaje de confirmación
        res.json({ token: token, msg: "Usuario creado correctamente" }); // si llave y valor se llaman igual puedes retornar uno de ellos
      }
    );
  } catch (err) {
    console.log(err);
    res.status(400).send("Hubo un error");
  }
};
