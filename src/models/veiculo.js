const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('veiculo', {
    idVeiculo: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    versaoVeiculo: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    modeloVeiculo: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    combustivelVeiculo: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    renavamVeiculo: {
      type: DataTypes.STRING(11),
      allowNull: true
    },
    tipoVeiculo: {
      type: DataTypes.STRING(1),
      allowNull: false
    },
    cambioVeiculo: {
      type: DataTypes.STRING(25),
      allowNull: true
    },
    anofabVeiculo: {
      type: DataTypes.STRING(4),
      allowNull: true
    },
    portasVeiculo: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    corVeiculo: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    marcaVeiculo: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    chassiVeiculo: {
      type: DataTypes.STRING(17),
      allowNull: true
    },
    placaVeiculo: {
      type: DataTypes.STRING(7),
      allowNull: true
    },
    valorVeiculo: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    idUsuarioVeiculo: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    idLojaVeiculo: {
      type: DataTypes.BIGINT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Veiculo',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idVeiculo" },
        ]
      },
    ]
  });
};
