const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('paiement', {
    id_paiement: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    date_paiement: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    heure_paiement: {
      type: DataTypes.TIME,
      allowNull: true
    },
    id_type_paiement: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'type_paiement',
        key: 'id_type_paiement'
      }
    },
    id_facture: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'facture',
        key: 'id_facture'
      },
      unique: "paiement_ibfk_2"
    },
    id_commande: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'commande',
        key: 'id_commande'
      },
      unique: "paiement_ibfk_3"
    }
  }, {
    sequelize,
    tableName: 'paiement',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_paiement" },
        ]
      },
      {
        name: "id_facture",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_facture" },
        ]
      },
      {
        name: "id_commande",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_commande" },
        ]
      },
      {
        name: "id_type_paiement",
        using: "BTREE",
        fields: [
          { name: "id_type_paiement" },
        ]
      },
    ]
  });
};
