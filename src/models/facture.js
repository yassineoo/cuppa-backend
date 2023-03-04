const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('facture', {
    id_facture: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    prix_facture: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    date_facture: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    heure_facture: {
      type: DataTypes.TIME,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'facture',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_facture" },
        ]
      },
    ]
  });
};
