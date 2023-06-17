const { Router } = require("express");
const { check } = require("express-validator");
const {
  obtenerProductos,
  obtenerProductoPorId,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
} = require("../controllers/productos");
const {
  validarJWT,
  tieneRole,
  validarCampos,
  validarCategoria,
} = require("../middlewares");

const router = Router();

router.get("/", obtenerProductos);

router.get("/:id", obtenerProductoPorId);

router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El campo nombre es obligatorio").not().isEmpty(),
    check("precio", "El campo precio es obligatorio").not().isEmpty(),
    check("categoriaId", "El campo categoriaID es obligatorio").not().isEmpty(),
    check("categoriaId", "La categoría no tiene un ID válido").isMongoId(),
    validarCategoria,
    tieneRole("ADMIN_ROLE", "USER_ROLE", "VENTAS_ROLE"),
    validarCampos,
  ],
  crearProducto
);

router.put("/", actualizarProducto);

router.delete("/", eliminarProducto);

module.exports = router;
