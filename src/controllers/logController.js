const express = require("express");
const { masterMiddleware } = require("../middlewares/nivelMiddlewares");
const homePath = require("os").homedir();
const router = express.Router();
const readLastLines = require("read-last-lines");
const endpointResponse = require("../middlewares/endpointResponse");

//Get Logs
router.get(
  "/",
  masterMiddleware,
  endpointResponse(async (req, res, next) => {
    const logsPath = `${homePath}/.pm2/logs/scv-api-out.log`;
    const lastLogs = await readLastLines.read(logsPath, 50);
    return lastLogs;
  })
);

module.exports = (app) => app.use("/log", router);
