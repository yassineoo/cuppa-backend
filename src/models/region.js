const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('region', {
    id_region: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nom_region: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    num_commune: {
      type: DataTypes.STRING(50),
      allowNull: false,
      references: {
        model: 'commune',
        key: 'num_commune'
      }
    }
  }, {
    sequelize,
    tableName: 'region',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_region" },
        ]
      },
      {
        name: "num_commune",
        using: "BTREE",
        fields: [
          { name: "num_commune" },
        ]
      },
    ]
  });
};
