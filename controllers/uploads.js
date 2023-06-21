const { request, response } = require("express");
const { subirArchivo } = require("../helpers");
const { Usuario, Producto } = require("../models");

const cargarArchivo = async (req = request, res = response) => {
  try {
    // Por defecto
    // const nombre = await subirArchivo(req.files);

    // Solo mandar nombre carpeta
    // const nombre = await subirArchivo(req.files, undefined, "textos");

    // Solo mandar todo
    // const nombre = await subirArchivo(req.files, ["txt", "md"], "textos");

    const nombre = await subirArchivo(req.files);
    res.json({
      nombre,
    });
  } catch (err) {
    return res.status(400).json({
      err,
    });
  }
};

const actualizarImagen = async (req = request, res = response) => {
  const { id, coleccion } = req.params;

  let modelo;

  switch (coleccion) {
    case "usuarios":
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un usuario con el id ${id}`,
        });
      }

      break;
    case "productos":
      modelo = await Producto.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un producto con el id ${id}`,
        });
      }
      break;
    default:
      return res.status(500).json({
        msg: "Error genérico",
      });
  }
  try {
    const nombre = await subirArchivo(req.files, undefined, coleccion);
    modelo.img = nombre;
    await modelo.save();
    res.json(modelo);
  } catch (err) {
    return res.status(400).json({
      err,
    });
  }
};

module.exports = {
  cargarArchivo,
  actualizarImagen,
};
