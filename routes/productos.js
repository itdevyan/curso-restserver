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
  esAdminRole,
} = require("../middlewares");
const { existeProductoPorId } = require("../helpers");

const router = Router();

router.get("/", obtenerProductos);

router.get(
  "/:id",
  [
    check("id", "El id debe ser válido").isMongoId(),
    check("id").custom(existeProductoPorId),
    validarCampos,
  ],
  obtenerProductoPorId
);

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

router.put(
  "/:id",
  [
    validarJWT, // requiere token
    check("id", "No es un ID válido").isMongoId(), // id producto
    tieneRole("ADMIN_ROLE", "USER_ROLE", "VENTAS_ROLE"),
    validarCampos,
    check("id").custom(existeProductoPorId),
  ],
  actualizarProducto
);

router.delete(
  "/:id",
  [
    validarJWT,
    check("id", "No es un ID válido").isMongoId(), // id producto
    esAdminRole,
    validarCampos,
    check("id").custom(existeProductoPorId),
  ],
  eliminarProducto
);

module.exports = router;
