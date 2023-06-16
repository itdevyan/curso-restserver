const { Router } = require("express");
const { validarJWT, validarCampos } = require("../middlewares");
const {
  obtenerCategorias,
  obtenerCategoriasPorID,
  crearCategoria,
  actualizarCategoria,
  eliminarCategoria,
} = require("../controllers/categorias");
const { check } = require("express-validator");

const router = Router();

// validaciones
// crear check('id').custom( existeCategoria )

// Obtener todas las categorias - publico
router.get("/", obtenerCategorias);

// Obtener una categoria por id - publico
router.get("/:id", obtenerCategoriasPorID);

// Crear categoria - privado - cualquier rol con token válido
router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  crearCategoria
);

// Actualizar registro por id - privado = cualquier rol con token válido
router.put("/:id", actualizarCategoria);

// Borrrar una categoría - Admin
router.delete("/:id", eliminarCategoria);

module.exports = router;
