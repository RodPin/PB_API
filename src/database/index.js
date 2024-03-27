const { Sequelize } = require("sequelize");
const { name, user, password, host, dialect, port } =
  require("../../appConfig").database;

const sequelize = new Sequelize(name, user, password, {
  host,
  dialect,
  port,
});

sequelize.sync() // { force: true } will drop existing tables and recreate them
  .then(() => {
    console.log('Banco de dados Sincronizado com sucesso');
    auth();
  })
  .catch(err => {
    console.error('Error sincronizado banco de dados:', err);
  });
  
module.exports = sequelize;

async function auth() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    console.log("");
    console.log("        ███████  ██████ ██    ██          █████  ██████  ██ ");
    console.log("        ██      ██      ██    ██         ██   ██ ██   ██ ██ ");
    console.log("        ███████ ██      ██    ██         ███████ ██████  ██ ");
    console.log("             ██ ██       ██  ██          ██   ██ ██      ██ ");
    console.log("        ███████  ██████   ████   ███████ ██   ██ ██      ██ ");
    console.log("");
  } catch (error) {
    console.error("\x1b[31m", "Unable to connect to the database!");
  }
}

