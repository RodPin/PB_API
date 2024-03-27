const Sequelize = require("sequelize");
const { Compra, Usuario, Veiculo, Pessoa } = require("../models/init-models");
const { BadRequestError, NotFoundError } = require("../utils/errors/Errors");

let options = {
    include: [
        {
          model: Pessoa,
          attributes: ["idPessoa", "nomePessoa", "emailPessoa", "cpfCnpjPessoa"],
        },
        {
            model: Veiculo,
            attributes: ["idVeiculo", "renavamVeiculo", "modeloVeiculo","corVeiculo"],
          },
      ],
      order: Sequelize.literal("idCompra"),
      attributes: [
        "idCompra",
        "idPessoa",
        "idVeiculo",
        "valor",
      ],
  }

 
const read = async (idUsuario, idLoja) => {
   let usuario = await Usuario.findOne({
    where: { idUsuario: idUsuario} 
  })

  return Compra.findAll(options );
};

const readOne = async (idCompra) => {
  const compra = await Compra.findOne({
    ...options,
    where: {
      idCompra: idCompra,
    },
  });

  if (!compra) {
    throw new NotFoundError("Id Compra nao encontrado");
  }
  return compra;
};

const create = async (compra) => {
  await pvCheckInfoCompra(compra);
  return Compra.create(compra);
};

const edit = async (idUsuario, compraEditada) => {
  const compraExistente = await Compra.findOne({
    where: {
      idCompra: compraEditada.idCompra,
    },
  });

  
  if (!compraExistente) throw new NotFoundError("Compra nao encontrada");
  const usuario = await Usuario.findOne({
    where: {
      idUsuario,
    },
  });
  const veiculoExistente = await Veiculo.findOne({
    where: {
      idVeiculo: compraEditada.idVeiculo,
    },
  });

  if (!veiculoExistente) throw new NotFoundError("Veiculo nao encontrada");

  if (usuario.idLoja !== veiculoExistente.idLojaVeiculo) {
    throw new BadRequestError("Usuario nao pode editar a compra que nao é da sua loja");
  }
  await pvCheckInfoCompra(compraEditada);
  let compra = await compraExistente.update(compraEditada);
  return compra;
};

const compraService = {
  read,
  readOne,
  create,
  edit,
};

module.exports = compraService;

async function pvCheckInfoCompra(compra) {
  if (!compra.idVeiculo)
    throw new BadRequestError("idVeiculo nao fornecido");
  if (!compra.idPessoa)
    throw new BadRequestError("idPessoa nao fornecido");
  if (!compra.valor)
    throw new BadRequestError("Valor da nao fornecido");
  if(!pvIsFloat(compra.valor))
        throw new BadRequestError("Valor da compra invalido, deve ser um numero");
   
    const pessoa = await Pessoa.findOne({
        where: {
          idPessoa: compra.idPessoa,
        },
      });
    
    if (!pessoa) throw new NotFoundError("Pessoa nao encontrado");

    const veiculo = await Veiculo.findOne({
        where: {
          idVeiculo: compra.idVeiculo,
        },
      });
    
    if (!veiculo) throw new NotFoundError("Veiculo nao encontrado");
}

function pvIsFloat(value) {
    if (typeof value === 'number' && !Number.isNaN(value)) {
      return true;
    }
    return false;
  }
