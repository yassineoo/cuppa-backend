const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ajouter_supplement', {
    id_commande: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'commande',
        key: 'id_commande'
      }
    },
    id_supplement: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'supplement',
        key: 'id_supplement'
      }
    },
    quantite_supplement: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'ajouter_supplement',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_commande" },
          { name: "id_supplement" },
        ]
      },
      {
        name: "id_supplement",
        using: "BTREE",
        fields: [
          { name: "id_supplement" },
        ]
      },
    ]
  });
};
