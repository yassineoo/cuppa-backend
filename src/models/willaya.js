const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('willaya', {
    num_willaya: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nom_willaya: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    nom_pays: {
      type: DataTypes.STRING(50),
      allowNull: false,
      references: {
        model: 'pays',
        key: 'nom_pays'
      }
    }
  }, {
    sequelize,
    tableName: 'willaya',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "num_willaya" },
        ]
      },
      {
        name: "nom_pays",
        using: "BTREE",
        fields: [
          { name: "nom_pays" },
        ]
      },
    ]
  });
};
