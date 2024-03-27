var DataTypes = require("sequelize").DataTypes;
const sequelize = require("../database");

var _loja = require("./loja");
var _pessoa = require("./pessoa");
var _usuario = require("./usuario");
var _veiculo = require("./veiculo");
var _compra = require("./compra");

var Loja = _loja(sequelize, DataTypes);
var Pessoa = _pessoa(sequelize, DataTypes);
var Usuario = _usuario(sequelize, DataTypes);
var Veiculo = _veiculo(sequelize, DataTypes);
var Compra = _compra(sequelize, DataTypes);

Usuario.belongsTo(Loja, { foreignKey: "idLoja" });
Pessoa.belongsTo(Loja, { foreignKey: "idLojaPessoa" });
Loja.hasMany(Usuario, { foreignKey: "idLoja" });
Pessoa.hasMany(Compra, { foreignKey: 'idPessoa' }); 
Compra.belongsTo(Pessoa, { foreignKey: 'idPessoa' }); 
Veiculo.hasMany(Compra, { foreignKey: 'idVeiculo' }); 
Compra.belongsTo(Veiculo, { foreignKey: 'idVeiculo' }); 

const initModels = {
  Loja,
  Pessoa,
  Usuario,
  Veiculo,
  Compra,
};

module.exports = initModels;