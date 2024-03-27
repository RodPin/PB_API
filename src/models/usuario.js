const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('usuario', {
    idUsuario: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    DTYPE: {
      type: DataTypes.STRING(31),
      allowNull: true
    },
    emailUsuario: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    senhaUsuario: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    nivelUsuario: {
      type: DataTypes.STRING(1),
      allowNull: false
    },
    statusUsuario: {
      type: DataTypes.STRING(1),
      allowNull: false
    },
    loginUsuario: {
      type: DataTypes.STRING(40),
      allowNull: false,
      unique: "loginUsuario"
    },
    nomeUsuario: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: "nomeUsuario"
    },
    idLoja: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'Loja',
        key: 'idLoja'
      }
    },
    dtUltAcesso: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'USUARIO',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idUsuario" },
        ]
      },
      {
        name: "loginUsuario",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "loginUsuario" },
        ]
      },
      {
        name: "nomeUsuario",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "nomeUsuario" },
        ]
      },
      {
        name: "FK_USUARIO_idLoja",
        using: "BTREE",
        fields: [
          { name: "idLoja" },
        ]
      },
    ]
  });
};
