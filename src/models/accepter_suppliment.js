const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('accepter_suppliment', {
    id_boissons: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'boissons',
        key: 'id_boissons'
      }
    },
    id_supplement: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'supplement',
        key: 'id_supplement'
      }
    }
  }, {
    sequelize,
    tableName: 'accepter_suppliment',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_boissons" },
          { name: "id_supplement" },
        ]
      },
      {
        name: "id_supplement",
        using: "BTREE",
        fields: [
          { name: "id_supplement" },
        ]
      },
    ]
  });
};
