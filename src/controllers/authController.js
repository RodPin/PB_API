const express = require("express");
const endpointResponse = require("../middlewares/endpointResponse");
const authService = require("../services/authService");
const { vendedorMiddleware } = require("../middlewares/nivelMiddlewares");
const router = express.Router();

//Verifica Login e Senha Usuario
router.post(
  "/login",
  endpointResponse((req, res, next) => {
    const { login, senha } = req.body;
    return authService.login(login, senha);
  })
);

//Auth from token
router.get(
  "/",
  vendedorMiddleware,
  endpointResponse((req, res, next) => {
    const { idUsuario } = req;
    return authService.getAuthFromToken(idUsuario);
  })
);

module.exports = (app) => app.use("/auth", router);
