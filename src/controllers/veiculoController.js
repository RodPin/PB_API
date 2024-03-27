const express = require("express");
const endpointResponse = require("../middlewares/endpointResponse");
const { gerenteMiddleware } = require("../middlewares/nivelMiddlewares");
const veiculoService = require("../services/veiculoService");

const router = express.Router();

//Todos os Veiculos
router.get(
  "/",
  endpointResponse(async (req, res, next) => {
    return veiculoService.read();
  })
);

//Detalhes Id Veiculo
router.get(
  "/detalhe/:idVeiculo",
  endpointResponse(async (req, res, next) => {
    return veiculoService.readOne(req.params.idVeiculo);
  })
);


//Create veiculo
router.post(
  "/",
  endpointResponse(async (req, res, next) => {
    const veiculo = { ...req.body };
    return veiculoService.create(veiculo);
  })
);

// Edicao de Veiculo
router.put(
  "/:idVeiculo",
  gerenteMiddleware,
  endpointResponse((req, res, next) => {
    const veiculoEditada = { ...req.body, idVeiculo: req.params.idVeiculo };
    return veiculoService.edit(req.idUsuario, veiculoEditada);
  })
);

module.exports = (app) => app.use("/veiculo", router);
