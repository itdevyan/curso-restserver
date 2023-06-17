const { request, response } = require("express");
const { Producto } = require("../models");

const obtenerProductos = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };
  const [total, productos] = await Promise.all([
    Producto.countDocuments(query),
    Producto.find(query)
      .skip(Number(desde))
      .limit(Number(limite))
      .populate("usuario", ["uid", "nombre", "correo"]),
  ]);
  res.json({
    total,
    productos,
  });
};

const obtenerProductoPorId = async (req = request, res = response) => {
  res.json({
    msg: "work!",
  });
};

const crearProducto = async (req = request, res = response) => {
  const { nombre, precio, disponible, descripcion } = req.body;

  const dataRq = {
    nombre,
    precio,
    disponible,
    descripcion,
    estado: true,
    usuario: req.categoria._id,
    categoria: req.usuarioToken._id,
  };

  const producto = new Producto(dataRq);
  await producto.save();

  res.json(producto);
};

const actualizarProducto = async (req = request, res = response) => {
  res.json({
    msg: "work!",
  });
};

const eliminarProducto = async (req = request, res = response) => {
  res.json({
    msg: "work!",
  });
};

module.exports = {
  obtenerProductos,
  obtenerProductoPorId,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
};
