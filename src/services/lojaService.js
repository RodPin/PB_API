const { Loja, Usuario } = require("../models/init-models");
const { BadRequestError, NotFoundError } = require("../utils/errors/Errors");
const validationCNPJ = require("../validation/validationCNPJ");

const read = async () => {
  const lojas = await Loja.findAll({
    attributes: ["idLoja", "cnpjLoja", "nomeLoja"],
  });
  return lojas;
};

const readOne = async (idLoja) => {
  const loja = await Loja.findOne({
    where: {
      idLoja,
    },
  });

  if (!loja) throw new NotFoundError("Loja nao encontrada");

  return loja;
};

const create = async (loja) => {
  if (
    !loja ||
    !loja.isEstadualLoja ||
    !loja.isMunicipalLoja ||
    !loja.nomeLoja ||
    !loja.cnpjLoja
  ) {
    throw new BadRequestError("Dados invalidos");
  }

  // Verificar se o CNPJ ja existe
  const lojaExistente = await Loja.findOne({
    where: {
      cnpjLoja: loja.cnpjLoja,
    },
  });
  if (lojaExistente) throw new NotFoundError("Loja ja cadastrado");

  // Verifica se CNPJ eh valido
  if (!validationCNPJ(loja.cnpjLoja))
    throw new BadRequestError("CNPJ Invalido");

  if (loja.estadoEnderecoLoja?.length !== 2)
    throw new BadRequestError("Estado deve ter 2 caracteres");

  if (loja.nomeLoja.length > 40)
    throw new BadRequestError("Nome da loja ate 40 caracteres");

  loja.siteLoja = loja.siteLoja || "";
  loja.dddTelefone1Loja = loja.dddTelefone1Loja || "21";
  loja.dddTelefone2Loja = loja.dddTelefone2Loja || "21";

  const novaLoja = await Loja.create(loja);

  console.log("Loja criada com sucesso");
  return novaLoja;
};

const edit = async (idUsuario, lojaEditada) => {
  const lojaExistente = await Loja.findOne({
    where: {
      idLoja: lojaEditada.idLoja,
    },
  });

  if (!lojaExistente) throw new NotFoundError("Loja nao encontrada");

  if (
    !lojaEditada ||
    !lojaEditada.isEstadualLoja ||
    !lojaEditada.isMunicipalLoja ||
    !lojaEditada.nomeLoja
  )
    throw new BadRequestError("Dados invalidos");

  if (lojaEditada?.nomeLoja?.length > 40)
    throw new BadRequestError("Nome da loja ate 40 caracteres");

  const usuario = await Usuario.findOne({
    where: {
      idUsuario,
    },
  });
  if (usuario.nivelUsuario !== "M" && usuario.idLoja !== lojaExistente.idLoja) {
    throw new BadRequestError("Usuario nao pode editar loja que nao e sua");
  }

  lojaEditada.cnpjLoja = undefined;
  lojaEditada.DTYPE = undefined;

  let loja = await lojaExistente.update(lojaEditada);
  return loja;
};
const lojaService = {
  read,
  readOne,
  create,
  edit,
};

module.exports = lojaService;
