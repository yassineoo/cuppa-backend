const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('panne', {
    id_panne: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    },
    date_heure_panne: {
      type: DataTypes.DATE,
      allowNull: true
    },
    description_panne: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    id_am: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'am',
        key: 'id_am'
      }
    },
    id_distributeur: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'distributeur',
        key: 'id_distributeur'
      }
    }
  }, {
    sequelize,
    tableName: 'panne',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_panne" },
        ]
      },
      {
        name: "id_am",
        using: "BTREE",
        fields: [
          { name: "id_am" },
        ]
      },
      {
        name: "id_distributeur",
        using: "BTREE",
        fields: [
          { name: "id_distributeur" },
        ]
      },
    ]
  });
};
