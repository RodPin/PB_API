const fs = require("fs");
const path = require("path");

//require all files in controllers folder
module.exports = (app) => {
  fs.readdirSync(__dirname)
    .filter((file) => file.indexOf(".") !== 0 && file !== "index.js")
    .forEach((file) => {
      console.log("file",file)
      console.log("require(path.resolve(__dirname, file))",require(path.resolve(__dirname, file)))
      return require(path.resolve(__dirname, file))(app)
    });
};
