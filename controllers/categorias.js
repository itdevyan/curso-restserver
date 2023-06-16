const { request, response } = require("express");
const { Categoria } = require("../models");

// paginado - total - populate
const obtenerCategorias = async (req = request, res = response) => {
  res.json({
    msg: "work!",
  });
};

// populate
const obtenerCategoriasPorID = async (req = request, res = response) => {
  res.json({
    msg: "work!",
  });
};

const crearCategoria = async (req = request, res = response) => {
  const nombre = req.body.nombre.toUpperCase();

  const categoriaDB = await Categoria.findOne({ nombre });

  if (categoriaDB) {
    return res.status(400).json({
      msg: `La categoría ${categoriaDB.nombre}, ya existe`,
    });
  }

  // Generar la data a guardar
  const data = {
    nombre,
    usuario: req.usuarioToken._id,
  };

  const categoria = new Categoria(data);

  // GuardarDB
  const categoriaGuardada = await categoria.save();

  res.status(201).json({
    categoria,
  });
};

// validaciones- y que no exista la nueva
const actualizarCategoria = async (req = request, res = response) => {
  res.json({
    msg: "work!",
  });
};

// cambiar estado false
const eliminarCategoria = async (req = request, res = response) => {
  res.json({
    msg: "work!",
  });
};

module.exports = {
  obtenerCategorias,
  obtenerCategoriasPorID,
  crearCategoria,
  actualizarCategoria,
  eliminarCategoria,
};
