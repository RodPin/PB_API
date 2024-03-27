const handleFailResponse = require("../utils/handleFailResponse");

const endpointResponse = (cb) => {
  return async (req, res, next) => {
    try {
      const data = await cb(req, res, next);
      return res.send(data);
    } catch (e) {
      return handleFailResponse(res, e);
    }
  };
};

module.exports = endpointResponse;
