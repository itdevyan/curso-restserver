const { request, response } = require("express");
const { Categoria } = require("../models");

const validarCategoria = async (req = request, res = response, next) => {
  const { categoriaId } = req.body;

  const categoriaEncontrada = await Categoria.findById(categoriaId);

  if (categoriaEncontrada) {
    req.categoria = categoriaEncontrada;
    next();
  } else {
    throw new Error("La categoría no existe");
  }
};

module.exports = {
  validarCategoria,
};
