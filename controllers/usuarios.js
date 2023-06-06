// Esto solo para no perder el autocompletado,
// si usas Typescript no es necesario (ya que es redundante)
const { request, response } = require("express");

const usuariosGet = (req = request, res = response) => {
  // (Redundante, solo para ayuda)
  //   res.send("Hello world");
  res.json({
    msg: "get API - controlador",
  });
};

const usuariosPost = (req = request, res = response) => {
  // (Redundante, solo para ayuda)
  //   res.send("Hello world");
  res.json({
    msg: "post API - controlador",
  });
};

const usuariosPut = (req = request, res = response) => {
  // (Redundante, solo para ayuda)
  //   res.send("Hello world");
  res.json({
    msg: "put API - controlador",
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
