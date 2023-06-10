// Esto solo para no perder el autocompletado,
// si usas Typescript no es necesario (ya que es redundante)
const { request, response } = require("express");
// Idealmente con la primera letra mayuscula, para identificarlo
// cuando se instancia, es más que nada una buena práctica
// Es un estandar, pero no obligatorio
const Usuario = require("../models/usuario");
const bcryptjs = require("bcryptjs");

const usuariosGet = (req = request, res = response) => {
  const query = req.query;
  const { q, oam = "no name" } = query;

  res.json({
    msg: "get API - controlador",
    query,
    q,
    oam,
  });
};

// const usuariosPost = (req = request, res = response) => {
//   const body = req.body;
//   const { nombre, edad } = body;
//   res.json({
//     msg: "post API - controlador",
//     body,
//     nombre,
//     edad,
//   });
// };

const usuariosPost = async (req = request, res = response) => {
  // Con ...rest, podemos sacar el resto de atrbitos
  // const { nombre, ...resto } = req.body;

  const { nombre, correo, password, rol } = req.body;
  const usuario = new Usuario({
    nombre,
    correo,
    password,
    rol,
  });

  // encriptar contraseña
  const salt = bcryptjs.genSaltSync(); // numero de vueltas (entre mas vueltas más dificil la encriptación y segura), por defecto en 10
  usuario.password = bcryptjs.hashSync(password, salt);

  // si nos manda un atributo que no este definido en el modelo
  // mongoose lo ignora
  await usuario.save();

  res.json({
    usuario,
  });
};

const usuariosPut = async (req = request, res = response) => {
  // Esto quiere decir que el id viene en la ruta
  // ../api/usuarios/12941294
  const { id } = req.params;
  // Separar las variables, separa los atributos del "resto"
  const { _id, password, google, correo, ...resto } = req.body;

  // TODO: Validar contra base de datos
  if (password) {
    // encriptar contraseña
    const salt = bcryptjs.genSaltSync(); // numero de vueltas (entre mas vueltas más dificil la encriptación y segura), por defecto en 10
    resto.password = bcryptjs.hashSync(password, salt);
  }

  const usuario = await Usuario.findByIdAndUpdate(id, resto, { new: true });

  res.json({
    msg: "put API - controlador",
    usuario,
  });
};

const usuariosPatch = (req = request, res = response) => {
  // (Redundante, solo para ayuda)
  //   res.send("Hello world");
  res.json({
    msg: "patch API - controlador",
  });
};

const usuariosDelete = (req = request, res = response) => {
  // (Redundante, solo para ayuda)
  //   res.send("Hello world");
  res.json({
    msg: "delete API - controlador",
  });
};

module.exports = {
  usuariosGet,
  usuariosDelete,
  usuariosPatch,
  usuariosPost,
  usuariosPut,
};
