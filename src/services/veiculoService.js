const Sequelize = require("sequelize");
const { Veiculo, Usuario } = require("../models/init-models");
const { BadRequestError, NotFoundError } = require("../utils/errors/Errors");

const read = async () => {
  return Veiculo.findAll({
    attributes: [
      "idVeiculo",
      "renavamVeiculo",
      "marcaVeiculo",
      "modeloVeiculo",
      "versaoVeiculo",
      "placaVeiculo",
    ],
  });
};

const readOne = async (idVeiculo) => {
  const veiculo = await Veiculo.findOne({
    where: {
      idVeiculo: idVeiculo,
    },
  });

  if (!veiculo) {
    throw new NotFoundError("Id Veiculo nao encontrado");
  }
  return veiculo;
};

const readOneRenavam = async (renavamVeiculo) => {
  return pvFindVeiculoByRenavam(renavamVeiculo);
};

const create = async (veiculo) => {
  await pvCheckInfoVeiculo(veiculo);
  const veiculoExiste = await pvFindVeiculoByRenavam(veiculo.renavamVeiculo);
  if (veiculoExiste) throw new BadRequestError("Renavam existente");
  return Veiculo.create(veiculo);
};

const edit = async (idUsuario, veiculoEditado) => {
  const veiculoExistente = await Veiculo.findOne({
    where: {
      idVeiculo: veiculoEditado.idVeiculo,
    },
  });

  
  if (!veiculoExistente) throw new NotFoundError("Loja nao encontrada");
  const usuario = await Usuario.findOne({
    where: {
      idUsuario,
    },
  });
  if (usuario.idLoja !== veiculoExistente.idLojaVeiculo) {
    throw new BadRequestError("Usuario nao pode editar o veiculo que nao é da sua loja");
  }
  veiculoEditado.renavamVeiculo = veiculoExistente.renavamVeiculo;
  await pvCheckInfoVeiculo(veiculoEditado);
  let veiculo = await veiculoExistente.update(veiculoEditado);
  return veiculo;
};

const veiculoService = {
  read,
  readOne,
  readOneRenavam,
  create,
  edit,
};

module.exports = veiculoService;

async function pvFindVeiculoByRenavam(renavamVeiculo) {
  
  if (renavamVeiculo?.length !== 11) {
    throw new BadRequestError("Renavam deve ter 11 numeros");
  }
  const veiculo = await Veiculo.findOne({
    where: {
      renavamVeiculo,
    },
  });

  if(!veiculo){
    throw new NotFoundError("Veiculo com Renavam não existente");
  }

  return veiculo;
}

async function pvCheckInfoVeiculo(veiculo) {
  if (!veiculo.tipoVeiculo)
    throw new BadRequestError("Tipo do veiculo nao fornecido");
  if (!veiculo.modeloVeiculo)
    throw new BadRequestError("Modelo do veiculo nao fornecido");
  if (!veiculo.marcaVeiculo)
    throw new BadRequestError("Marca do veiculo nao fornecida");
  if (!veiculo.portasVeiculo)
    throw new BadRequestError("Portas do veiculo nao fornecida");
  if (!veiculo.corVeiculo)
    throw new BadRequestError("Cor do veiculo nao fornecida");
  if (!veiculo.placaVeiculo)
    throw new BadRequestError("Placa do veiculo nao fornecida");
  if (!veiculo.chassiVeiculo)
    throw new BadRequestError("Chassi do veiculo nao fornecida");
  if (!veiculo.renavamVeiculo)
    throw new BadRequestError("Renavam nao fornecido");
}
