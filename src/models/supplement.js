const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('supplement', {
    id_supplement: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nom_supplement: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    prix_supplement: {
      type: DataTypes.DOUBLE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'supplement',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_supplement" },
        ]
      },
    ]
  });
};
