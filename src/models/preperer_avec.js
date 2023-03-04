const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('preperer_avec', {
    id_boissons: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'boissons',
        key: 'id_boissons'
      }
    },
    id_ingredient: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'ingredient',
        key: 'id_ingredient'
      }
    },
    quantite_preparation: {
      type: DataTypes.DOUBLE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'preperer_avec',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_boissons" },
          { name: "id_ingredient" },
        ]
      },
      {
        name: "id_ingredient",
        using: "BTREE",
        fields: [
          { name: "id_ingredient" },
        ]
      },
    ]
  });
};
