const md5 = require("md5");
const Sequelize = require("sequelize");
const { Usuario, Loja } = require("../models/init-models");
const { BadRequestError } = require("../utils/errors/Errors");

const read = async () => {
  const usuarios = await Usuario.findAll({
    include: [
      {
        model: Loja,
        attributes: ["nomeLoja", "dtIniAssinaturaLoja", "idUltEnvelopeLoja"],
      },
    ],
    order: Sequelize.literal("idLoja"),
    attributes: [
      "idLoja",
      "idUsuario",
      "nomeUsuario",
      "dtUltAcesso",
      "nivelUsuario",
      "statusUsuario",
      "loginUsuario",
    ],
  });

  return usuarios;
};

const create = async (usuario) => {
  if (
    !usuario.emailUsuario ||
    !usuario.senhaUsuario ||
    !usuario.nivelUsuario ||
    !usuario.loginUsuario ||
    !usuario.nomeUsuario
  )
    throw new BadRequestError("Dados incorretos");

  if (!usuario.idLoja) throw new BadRequestError("Id loja nao fornecida");

  const loja = await Loja.findOne({
    where: {
      idLoja: usuario.idLoja,
    },
  });

  if (!loja) throw new BadRequestError("Loja inexistente");

  usuario.senhaUsuario = md5(usuario.emailUsuario + usuario.senhaUsuario);
  usuario.statusUsuario = "A";
  const novoUsuario = await Usuario.create(usuario);

  return novoUsuario;
};

const usuarioService = {
  read,
  create,
};

module.exports = usuarioService;
