const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ingredient', {
    id_ingredient: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nom_ingredient: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    quantite_restante: {
      type: DataTypes.DOUBLE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'ingredient',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_ingredient" },
        ]
      },
    ]
  });
};
