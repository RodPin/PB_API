const md5 = require("md5");
const jwt = require("jsonwebtoken");
const { Usuario, Loja } = require("../models/init-models");
const { NotFoundError, BadRequestError } = require("../utils/errors/Errors");
const { jwtSecret } = require("../../appConfig");

const ONE_DAY_EXPIRATION = 86400;

const login = async (email, senha) => {
  if (!email || !senha) {
    throw new BadRequestError("Email ou senha invalida");
  }
  const usuario = await Usuario.findOne({
    where: {
      loginUsuario: email,
    },
  });

  if (!usuario) {
    throw new NotFoundError("Login do Usuario nao encontrado");
  }

  // Verifica Senha
  console.log("Verificando Senha");

  let hashSenha = generateHash(email, senha);

  if (hashSenha !== usuario.senhaUsuario) {
    throw new BadRequestError("Senha invalida");
  }

  usuario.senhaUsuario = undefined;

  // Define qual o nivel do Usuario para oferecimento de Menu com as funcoes do Sistema, habilitadas ao seu nivel
  // M ---> Master -- Menu Administrativo
  // S ---> Socio  -- Menu Socio
  // G ---> Gerente -- Menu Gerente
  // d ---> Documentalista -- Menu Documentos
  // v ---> Vendedor       -- Menu Vendedor

  // Habilitar o Menu somente no cso que o Usuario tenha seu Status como A, ou seja, ATIVO

  // Front End
  // Monta Meni, com loja usuario

  //Criacao do JSON web token
  const token = pvSignToken(usuario);

  const resposta = {
    usuario: usuario,
    token: token,
  };

  await pvUpdateLastLogin(usuario.idUsuario);

  return resposta;
};

const getAuthFromToken = async (idUsuario) => {
  const usuario = await Usuario.findOne({
    where: { idUsuario },
    include: [
      {
        model: Loja,
        attributes: ["nomeLoja"],
      },
    ],
  });
  return usuario;
};

const authService = {
  login,
  getAuthFromToken,
};

module.exports = authService;

const generateHash = (email, senha) => md5(email + senha);

const pvUpdateLastLogin = (idUsuario) => {
  return Usuario.update(
    { dtUltAcesso: pvGetTodayDate() },
    { where: { idUsuario } }
  );
};

const pvGetTodayDate = () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  return yyyy + "-" + mm + "-" + dd;
};

function pvSignToken(usuario) {
  return jwt.sign(
    {
      idUsuario: usuario.idUsuario,
      nivelUsuario: usuario.nivelUsuario,
      emailUsuario: usuario.emailUsuario,
      idLoja: usuario.idLoja
    },
    jwtSecret,
    {
      expiresIn: ONE_DAY_EXPIRATION,
    }
  );
}
