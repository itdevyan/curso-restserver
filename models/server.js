const express = require("express");
const cors = require("cors");

class Server {
  constructor() {
    // Configuración e inicialización
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosPath = "/api/usuarios";

    // Middlewares
    this.middlewares();

    // Rutas
    this.routes();
  }

  middlewares() {
    // CORS
    this.app.use(cors());
    // Directorio público
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.usuariosPath, require("../routes/usuarios"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor iniciado en puerto", this.port);
    });
  }
}

module.exports = Server;
