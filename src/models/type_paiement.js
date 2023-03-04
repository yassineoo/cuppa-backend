const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('type_paiement', {
    id_type_paiement: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nom_type: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'type_paiement',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_type_paiement" },
        ]
      },
    ]
  });
};
