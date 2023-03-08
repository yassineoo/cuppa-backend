const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('afficher_dans_region', {
    id_region_dynamique: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'region_dynamique',
        key: 'id_region_dynamique'
      }
    },
    id_annonce: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'annoce',
        key: 'id_annonce'
      }
    }
  }, {
    sequelize,
    tableName: 'afficher_dans_region',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_region_dynamique" },
          { name: "id_annonce" },
        ]
      },
      {
        name: "id_annonce",
        using: "BTREE",
        fields: [
          { name: "id_annonce" },
        ]
      },
    ]
  });
};
