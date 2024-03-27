const { InternalServerError } = require("../utils/errors/Errors");

function handleFailResponse(pRes, e) {
  if (e.isError) {
    console.log(`[Error]`, e.message);
    return pRes.status(e.status || 400).send(e);
  }
  console.log(e);

  return pRes.status(500).send(new InternalServerError());
}

module.exports = handleFailResponse;
