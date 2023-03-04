const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('commune', {
    num_commune: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    },
    nom_commune: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    num_willaya: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'willaya',
        key: 'num_willaya'
      }
    }
  }, {
    sequelize,
    tableName: 'commune',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "num_commune" },
        ]
      },
      {
        name: "num_willaya",
        using: "BTREE",
        fields: [
          { name: "num_willaya" },
        ]
      },
    ]
  });
};
