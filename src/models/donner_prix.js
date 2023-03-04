const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('donner_prix', {
    id_ac: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'ac',
        key: 'id_ac'
      }
    },
    id_distributeur: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'distributeur',
        key: 'id_distributeur'
      }
    },
    id_boissons: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'boissons',
        key: 'id_boissons'
      }
    },
    prix: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    date_prix: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'donner_prix',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_ac" },
          { name: "id_distributeur" },
          { name: "id_boissons" },
        ]
      },
      {
        name: "id_distributeur",
        using: "BTREE",
        fields: [
          { name: "id_distributeur" },
        ]
      },
      {
        name: "id_boissons",
        using: "BTREE",
        fields: [
          { name: "id_boissons" },
        ]
      },
    ]
  });
};
