const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('consommateur', {
    id_consommateur: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    prenom_consommateur: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    nom_consommateur: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    mail_consommateur: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'consommateur',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_consommateur" },
        ]
      },
    ]
  });
};
