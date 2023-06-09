const { Router } = require("express");
const {
  usuariosGet,
  usuariosDelete,
  usuariosPatch,
  usuariosPost,
  usuariosPut,
} = require("../controllers/usuarios");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { esRoleValido } = require("../helpers/db-validators");

const router = Router();

router.get("/", usuariosGet);

router.put("/:id", usuariosPut);

// Si mandas 2 argumentos, es la ruta y controlador
// Si mandas 3 argumentos, es la ruta, middleware y controlador
// puedes mandar un middleware o varios, en caso de ser varios,
// mandarlos como un arreglo []
router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check(
      "password",
      "El password debe contener al menos 6 caracteres"
    ).isLength({ min: 6 }),
    check("correo", "El correo no es válido").isEmail(),
    // Otra forma manual de validar enum
    // check("rol", "El rol debe ser válido").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    // (rol) => esRoleValido(rol) es lo mismo que enviar esRoleValido solo
    check("rol").custom(esRoleValido),
    validarCampos,
  ],
  usuariosPost
);

router.delete("/", usuariosDelete);

router.patch("/", usuariosPatch);

module.exports = router;
