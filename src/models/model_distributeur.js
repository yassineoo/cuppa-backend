const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('model_distributeur', {
    id_type: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    path_distributeur: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Hauteur: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    largeur: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    profondeur: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    Poids_total_: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    Materiau: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'model_distributeur',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_type" },
        ]
      },
    ]
  });
};
