const { Router } = require("express");
const { check } = require("express-validator");
const { cargarArchivo, actualizarImagen } = require("../controllers/uploads");
const { validarCampos, validarArchivo } = require("../middlewares");
const { coleccionesPermitidas } = require("../helpers");

const router = Router();

router.post("/", validarArchivo, cargarArchivo);

router.put(
  "/:coleccion/:id",
  [
    check("id", "El id no es válido").isMongoId(),
    check("coleccion").custom((coleccion) =>
      coleccionesPermitidas(coleccion, ["usuarios", "productos"])
    ),
    validarCampos,
    validarArchivo,
  ],
  actualizarImagen
);

module.exports = router;
