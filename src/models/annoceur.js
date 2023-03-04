const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('annoceur', {
    id_anonceur: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    first_name_annonceur: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    last_name_annonceur: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    path_annonceur: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    sex_annonceur: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    id_ac: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'ac',
        key: 'id_ac'
      }
    }
  }, {
    sequelize,
    tableName: 'annoceur',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_anonceur" },
        ]
      },
      {
        name: "id_ac",
        using: "BTREE",
        fields: [
          { name: "id_ac" },
        ]
      },
    ]
  });
};
