const Sequelize = require("sequelize");
const { Veiculo, Usuario, Compra } = require("../models/init-models");
const { BadRequestError, NotFoundError } = require("../utils/errors/Errors");

const read = async (idUsuario, idLoja) => {
  let usuario = await Usuario.findOne({
    where: { idUsuario: idUsuario} 
  })

  let veiculos = await Veiculo.findAll({
    attributes: [
      "idVeiculo",
      "renavamVeiculo",
      "marcaVeiculo",
      "modeloVeiculo",
      "versaoVeiculo",
      "placaVeiculo",
      "valorVeiculo"
    ],
    where: usuario.nivelUsuario === 'M' ? undefined : {
      idLojaVeiculo: idLoja
    },
    raw: true
  });

  for (let veiculo of veiculos){
    veiculo.vendido = 0;
    let compra = await Compra.findOne({
      where: { idVeiculo: veiculo.idVeiculo}
    })

    if(compra){
      veiculo.vendido = 1;
      veiculo.valorVenda = compra.valor;
      veiculo.lucro = compra.valor - veiculo.valorVeiculo;
    }
  }

  return veiculos;
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

const create = async (idLoja, veiculo) => {
  await pvCheckInfoVeiculo(veiculo);
  veiculo.tipoVeiculo = '1'
  veiculo.idLojaVeiculo = idLoja
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
  create,
  edit,
};

module.exports = veiculoService;

async function pvCheckInfoVeiculo(veiculo) {
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
