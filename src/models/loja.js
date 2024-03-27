const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('loja', {
    idLoja: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    DTYPE: {
      type: DataTypes.STRING(31),
      allowNull: true
    },
    isEstadualLoja: {
      type: DataTypes.STRING(14),
      allowNull: false
    },
    cnpjLoja: {
      type: DataTypes.STRING(14),
      allowNull: false
    },
    emailLoja: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    enderecoLoja: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    dddTelefone1Loja: {
      type: DataTypes.STRING(3),
      allowNull: true
    },
    idUltEnvelopeLoja: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    complementoNumeroEnderecoLoja: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    numeroEnderecoLoja: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    nomeLoja: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    siteLoja: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    dddTelefone2Loja: {
      type: DataTypes.STRING(3),
      allowNull: true
    },
    cidadeEnderecoLoja: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    Telefone1Loja: {
      type: DataTypes.STRING(9),
      allowNull: true
    },
    estadoEnderecoLoja: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    bairroEnderecoLoja: {
      type: DataTypes.STRING(25),
      allowNull: true
    },
    dtIniAssinaturaLoja: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    cepEnderecoLoja: {
      type: DataTypes.STRING(8),
      allowNull: true
    },
  }, {
    sequelize,
    tableName: 'Loja',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idLoja" },
        ]
      },
      {
        name: "LOJA",
        using: "BTREE",
        fields: [
          { name: "cnpjLoja" },
        ]
      },
    ]
  });
};
