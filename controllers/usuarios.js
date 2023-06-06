// Esto solo para no perder el autocompletado,
// si usas Typescript no es necesario (ya que es redundante)
const { request, response } = require("express");

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

const usuariosPost = (req = request, res = response) => {
  const body = req.body;
  const { nombre, edad } = body;
  res.json({
    msg: "post API - controlador",
    body,
    nombre,
    edad,
  });
};

const usuariosPut = (req = request, res = response) => {
  const id = req.params.id;

  res.json({
    msg: "put API - controlador",
    id,
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
