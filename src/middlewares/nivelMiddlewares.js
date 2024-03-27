const { ForbiddenError } = require("../utils/errors/Errors");
const handleFailResponse = require("../utils/handleFailResponse");
const authMiddleware = require("./authMiddleware");

const MASTER_NIVEL = ["M"];
const SOCIO_NIVEL = [...MASTER_NIVEL, "S"];
const GERENTE_NIVEL = [...SOCIO_NIVEL, "G"];
const DOCUMENTALISTA_NIVEL = [...GERENTE_NIVEL, "d"];
const VENDEDOR_NIVEL = [...DOCUMENTALISTA_NIVEL, "v"];

//Checa somente com o token, logo se o usuario for promovido ou rebaixado ele precisa fazer login normalmente...

function checkNivelMiddleware(nivel, req, res, next) {
  return authMiddleware(req, res, next, false)
    .then((_) => {
      if (!nivel?.includes(req?.nivelUsuario)) {
        throw new ForbiddenError("Funcao invalida para esse tipo de usuario");
      }
      return next();
    })
    .catch((err) => {
      return handleFailResponse(res, err);
    });
}

function masterMiddleware(req, res, next) {
  return checkNivelMiddleware(MASTER_NIVEL, req, res, next);
}
function socioMiddleware(req, res, next) {
  return checkNivelMiddleware(SOCIO_NIVEL, req, res, next);
}
function gerenteMiddleware(req, res, next) {
  return checkNivelMiddleware(GERENTE_NIVEL, req, res, next);
}
function documentalistaMiddleware(req, res, next) {
  return checkNivelMiddleware(DOCUMENTALISTA_NIVEL, req, res, next);
}
function vendedorMiddleware(req, res, next) {
  return checkNivelMiddleware(VENDEDOR_NIVEL, req, res, next);
}

module.exports.masterMiddleware = masterMiddleware;
module.exports.socioMiddleware = socioMiddleware;
module.exports.gerenteMiddleware = gerenteMiddleware;
module.exports.documentalistaMiddleware = documentalistaMiddleware;
module.exports.vendedorMiddleware = vendedorMiddleware;
