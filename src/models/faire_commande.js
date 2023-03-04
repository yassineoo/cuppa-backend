const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('faire_commande', {
    id_consommateur: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'consommateur',
        key: 'id_consommateur'
      }
    },
    id_distributeur: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'distributeur',
        key: 'id_distributeur'
      }
    },
    id_commande: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'commande',
        key: 'id_commande'
      }
    }
  }, {
    sequelize,
    tableName: 'faire_commande',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_consommateur" },
          { name: "id_distributeur" },
          { name: "id_commande" },
        ]
      },
      {
        name: "id_distributeur",
        using: "BTREE",
        fields: [
          { name: "id_distributeur" },
        ]
      },
      {
        name: "id_commande",
        using: "BTREE",
        fields: [
          { name: "id_commande" },
        ]
      },
    ]
  });
};
