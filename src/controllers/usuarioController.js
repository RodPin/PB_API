const express = require("express");
const {
  masterMiddleware,
  socioMiddleware,
  gerenteMiddleware,
  documentalistaMiddleware,
  vendedorMiddleware,
} = require("../middlewares/nivelMiddlewares");
const usuarioService = require("../services/usuarioService");
const endpointResponse = require("../middlewares/endpointResponse");

const router = express.Router();

//Todos os Usuarios
router.get(
  "/",
  masterMiddleware,
  endpointResponse((req, res, next) => {
    return usuarioService.read();
  })
);

//======================================================================================================
// Incluir Usuario, que deve estar vinculado a uma loja
// Lista Lojas, seleciona Loja, obtem idLoja, obtem dados do Usuario, insere usuario com Id da Loja
// Nao pode Inserir Usuario que ja esteja cadastrado na mesma loja, fazer o check pelo email
//     Se email = emaildigitado e IdUsuarioLoja = IddaLojaDigita
//                    Nao incluir
router.post(
  "/",
  endpointResponse((req, res, next) => {
    const usuario = { ...req.body };
    return usuarioService.create(usuario);
  })
);

module.exports = (app) => app.use("/usuario", router);
