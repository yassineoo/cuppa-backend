const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('avoir_model', {
    id_distributeur: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'distributeur',
        key: 'id_distributeur'
      }
    },
    id_type: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'model_distributeur',
        key: 'id_type'
      }
    }
  }, {
    sequelize,
    tableName: 'avoir_model',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_distributeur" },
          { name: "id_type" },
        ]
      },
      {
        name: "id_type",
        using: "BTREE",
        fields: [
          { name: "id_type" },
        ]
      },
    ]
  });
};
