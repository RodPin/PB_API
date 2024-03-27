const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('pessoa', {
    idPessoa: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    orgaoEmissorIdentidadePessoa: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    nomePessoa: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    emailPessoa: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    cepEnderecoPessoa: {
      type: DataTypes.STRING(8),
      allowNull: true
    },
    cpfCnpjPessoa: {
      type: DataTypes.STRING(14),
      allowNull: false
    },
    numeroEnderecoPessoa: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    dddTelefone1Pessoa: {
      type: DataTypes.STRING(3),
      allowNull: true
    },
    dddFaxPessoa: {
      type: DataTypes.STRING(3),
      allowNull: true
    },
    estadoEnderecoPessoa: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    enderecoPessoa: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Telefone2Pessoa: {
      type: DataTypes.STRING(9),
      allowNull: true
    },
    dtNascimentoPessoa: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    Telefone3Pessoa: {
      type: DataTypes.STRING(9),
      allowNull: true
    },
    identidadePessoa: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    dddTelefone2Pessoa: {
      type: DataTypes.STRING(3),
      allowNull: true
    },
    complementoNumeroEnderecoPessoa: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    cidadeEnderecoPessoa: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    dddTelefone3Pessoa: {
      type: DataTypes.STRING(3),
      allowNull: true
    },
    Telefone1Pessoa: {
      type: DataTypes.STRING(9),
      allowNull: true
    },
    tipoPessoa: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    bairroEnderecoPessoa: {
      type: DataTypes.STRING(25),
      allowNull: true
    },
    FaxPessoa: {
      type: DataTypes.STRING(9),
      allowNull: true
    },
    idUsuarioPessoa: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    idLojaPessoa: {
      type: DataTypes.BIGINT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Pessoa',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idPessoa" },
        ]
      },
    ]
  });
};
