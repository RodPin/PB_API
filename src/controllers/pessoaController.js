const express = require("express");
const router = express.Router();
const pessoaService = require("../services/pessoaService");
const endpointResponse = require("../middlewares/endpointResponse");
const { Pessoa } = require("../models/init-models");
const { vendedorMiddleware , gerenteMiddleware} = require("../middlewares/nivelMiddlewares");

//Todas as Pessoas
router.get(
  "/",
  vendedorMiddleware,
  endpointResponse((req, res, next) => {
    return pessoaService.read(req.idUsuario);
  })
);

//Detalhes
router.get(
  "/detalhe/:idPessoa",
  vendedorMiddleware,
  endpointResponse((req, res, next) => {
    return pessoaService.readOne(req.params.idPessoa);
  })
);

//Detalhes by CPF/CNPJ
router.get(
  "/detalhe/cpfcnpj/:cpfCnpjPessoa",
  vendedorMiddleware,
  endpointResponse(async (req, res, next) => {
    return pessoaService.readOneCpfCnpj(req.params.cpfCnpjPessoa);
  })
);

// Inclusao de Pessoa
router.post(
  "/",
  gerenteMiddleware,
  endpointResponse((req, res, next) => {
    const pessoa = req.body;
    return pessoaService.create(req.idLoja,pessoa);
  })
);

//Put de Pessoa
router.put(
  "/:idPessoa",
  gerenteMiddleware,
  endpointResponse(async (req, res, next) => {
    const pessoaExistente = await Pessoa.findOne({
      where: {
        idPessoa: req.params.idPessoa,
      },
    });

    if (!pessoaExistente) {
      throw new NotFoundError("Pessoa nao encontrada");
    }

    const pessoaEditada = { ...req.body };

    let pessoa = await pessoaExistente.update(pessoaEditada);

    return pessoa;
  })
);

module.exports = (app) => app.use("/pessoa", router);
