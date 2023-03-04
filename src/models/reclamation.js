const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('reclamation', {
    id_reclamation: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    description: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    date_reclamation: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    heure_reclamtion: {
      type: DataTypes.TIME,
      allowNull: true
    },
    id_commande: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'commande',
        key: 'id_commande'
      },
      unique: "reclamation_ibfk_1"
    }
  }, {
    sequelize,
    tableName: 'reclamation',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_reclamation" },
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
    ]
  });
};
