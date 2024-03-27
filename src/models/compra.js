module.exports = function(sequelize, DataTypes) {
  return sequelize.define('compra', {
    idCompra: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    idPessoa: {
        type: DataTypes.BIGINT,
        allowNull: false
      },
    idVeiculo: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    valor : {
        type: DataTypes.FLOAT,
        allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Compra',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idCompra" },
        ]
      },
    ]
  });
};
