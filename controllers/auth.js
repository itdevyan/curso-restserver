const { response, request } = require("express");
const Usuario = require("../models/usuario");
const bcryptjs = require("bcryptjs");
const { generarJWT } = require("../helpers/generar-jwt");

const login = async (req = request, res = response) => {
  const { correo, password } = req.body;

  try {
    // verificar si correo existe
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      console.log("Usuario no existe");
      return res.status(400).json({
        msg: "Usuario / Password no son correctos",
      });
    }

    // verificar si usuario esta activo
    if (!usuario.estado) {
      console.log("Usuario no habilitado");
      return res.status(400).json({
        msg: "Usuario / Password no son correctos",
      });
    }

    // verificar contraseña
    const validPassword = bcryptjs.compareSync(password, usuario.password);
    if (!validPassword) {
      console.log("Password incorrecta");
      return res.status(400).json({
        msg: "Usuario / Password no son correctos",
      });
    }

    // generar el JWT
    const token = await generarJWT(usuario.id);

    res.json({
      msg: "login ok",
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Algo salió mal, intente más tarde",
    });
  }
};

module.exports = {
  login,
};
