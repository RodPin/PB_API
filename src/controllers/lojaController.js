const express = require("express");
const handleFailResponse = require("../utils/handleFailResponse");

const { NotFoundError, BadRequestError } = require("../utils/errors/Errors");
const {
  masterMiddleware,
  socioMiddleware,
  gerenteMiddleware,
  documentalistaMiddleware,
  vendedorMiddleware,
} = require("../middlewares/nivelMiddlewares");
const { Loja } = require("../models/init-models");
const lojaService = require("../services/lojaService");
const endpointResponse = require("../middlewares/endpointResponse");

const router = express.Router();

//Todas as lojas
router.get(
  "/",
  masterMiddleware,
  endpointResponse((req, res, next) => {
    return lojaService.read();
  })
);

//Detalhes
router.get(
  "/detalhe/:idLoja",
  masterMiddleware,
  endpointResponse((req, res, next) => {
    return lojaService.readOne(req.params.idLoja);
  })
);

// Inclusao de Loja
router.post(
  "/",
  masterMiddleware,
  endpointResponse((req, res, next) => {
    return lojaService.create(req.body);
  })
);

// Edicao de Loja
router.put(
  "/:idLoja",
  gerenteMiddleware,
  endpointResponse((req, res, next) => {
    const lojaEditada = { ...req.body, idLoja: req.params.idLoja };
    return lojaService.edit(req.idUsuario, lojaEditada);
  })
);

module.exports = (app) => app.use("/loja", router);
