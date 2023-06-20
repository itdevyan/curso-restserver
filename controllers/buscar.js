const { response } = require("express");
const { Usuario } = require("../models");
const { ObjectId } = require("mongoose").Types;

// Esto podría estar en otro archivo

const coleccionesPermitidas = ["productos", "categorias", "usuarios", "roles"];

const buscarUsuarios = async (termino = "", res = response) => {
  const esMongoID = ObjectId.isValid(termino); // true

  if (esMongoID) {
    const usuario = await Usuario.findById(termino);
    res.json({
      results: usuario ? [usuario] : [],
    });
  }

  const regex = new RegExp(termino, "i");

  const usuarios = await Usuario.find({
    $or: [{ nombre: regex }, { correo: regex }],
    $and: [{ estado: true }],
  });

  // Para contar
  // const usuariosContador = await Usuario.cout({
  //   $or: [{ nombre: regex }, { correo: regex }],
  //   $and: [{ estado: true }],
  // });

  res.json({
    results: usuarios,
  });
};

const buscar = (req = require, res = response) => {
  const { coleccion, termino } = req.params;

  if (!coleccionesPermitidas.includes(coleccion)) {
    return res.status(400).json({
      msg: "Colección no permitida",
    });
  }

  switch (coleccion) {
    case "usuarios":
      buscarUsuarios(termino, res);
      break;
    case "categorias":
      break;
    case "productos":
      break;
    case "roles":
      break;
    default:
      return res.status(500).json({
        msg: "Se le olvidó hacer una búsqueda",
      });
  }
};

module.exports = {
  buscar,
};
