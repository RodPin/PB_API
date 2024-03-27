const express = require("express");
const endpointResponse = require("../middlewares/endpointResponse");
const { gerenteMiddleware, vendedorMiddleware } = require("../middlewares/nivelMiddlewares");
const compraService = require("../services/compraService");

const router = express.Router();

//Todos os Compras
router.get(
  "/",
  vendedorMiddleware,
  endpointResponse(async (req, res, next) => {
    return compraService.read(req.idUsuario, req.idLoja);
  })
);

//Detalhes Id Compra
router.get(
  "/detalhe/:idCompra",
  vendedorMiddleware,
  endpointResponse(async (req, res, next) => {
    return compraService.readOne(req.params.idCompra);
  })
);


//Create Compra
router.post(
  "/",
  vendedorMiddleware,
  endpointResponse(async (req, res, next) => {
    const compra = { ...req.body };
    return compraService.create(compra);
  })
);

// Edicao de Compra
router.put(
  "/:idCompra",
  gerenteMiddleware,
  endpointResponse((req, res, next) => {
    const compraEditada = { ...req.body, idCompra: req.params.idCompra };
    return compraService.edit(req.idUsuario, compraEditada);
  })
);

module.exports = (app) => app.use("/compra", router);
