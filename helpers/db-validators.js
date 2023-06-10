const Role = require("../models/role");
const Usuario = require("../models/usuario");

const esRoleValido = async (rol = "") => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error(`El rol ${rol} no está registrado en la BD`);
  }
};

const elEmailExiste = async (correo = "") => {
  // verificar si correo existe
  // esto Usuario.findOne({ correo: correo }) es igual que esto
  // Usuario.findOne({ correo })
  const existeEmail = await Usuario.findOne({ correo });
  if (existeEmail) {
    throw new Error(`El correo ${correo} ya existe en la db`);
  }
};

const existeUsuarioPorId = async (id = "") => {
  const existeUsuario = await Usuario.findById(id);
  if (!existeUsuario) {
    throw new Error(`El id: ${id} no existe`);
  }
};

module.exports = {
  esRoleValido,
  elEmailExiste,
  existeUsuarioPorId,
};
