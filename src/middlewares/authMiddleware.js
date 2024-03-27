const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../../appConfig");
const { UnauthorizedTokenError } = require("../utils/errors/Errors");

function authMiddleware(req, res, next, shouldCallNext = true) {
  const authHeader = req.headers.authorization;

  return pvCheckToken(authHeader).then((rObj) => {
    pvBuildRef(req, rObj);

    if (shouldCallNext) {
      return next();
    }
    return rObj;
  });
  // .catch((err) => {
  //   return res.status(401).send(err);
  // });
}

function pvCheckToken(pToken) {
  return new Promise((res, rej) => {
    if (!pToken) {
      throw new UnauthorizedTokenError("No token");
    }

    const parts = pToken.split(" ");
    if (parts.length !== 2) {
      throw new UnauthorizedTokenError("Token error");
    }

    const [scheme, token] = parts;
    if (!/^Bearer$/i.test(scheme)) {
      throw new UnauthorizedTokenError("Token malformated");
    }

    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) {
        throw new UnauthorizedTokenError("Token invalido");
      }

      return res(decoded);
    });
  });
}

const pvBuildRef = (req, rObj) => {
  req.nivelUsuario = rObj.nivelUsuario;
  req.idUsuario = rObj.idUsuario;
  req.emailUsuario = rObj.emailUsuario;
  console.log(req.method, `${req.baseUrl}${req.url}`, req.emailUsuario);
};

module.exports = authMiddleware;
