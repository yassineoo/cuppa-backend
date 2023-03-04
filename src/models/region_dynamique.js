const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('region_dynamique', {
    id_region_dynamique: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    centre: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    diamtre: {
      type: DataTypes.DOUBLE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'region_dynamique',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_region_dynamique" },
        ]
      },
    ]
  });
};
