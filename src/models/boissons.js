const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('boissons', {
    id_boissons: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nom_boisson: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'boissons',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_boissons" },
        ]
      },
    ]
  });
};
