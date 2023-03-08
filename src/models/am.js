const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('am', {
    id_am: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nom_am: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    prenom_am: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    sex_am: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    date_naissance_am: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    path_am: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    username_am: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    passwod_am: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    id_adm: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'adm',
        key: 'id_adm'
      }
    }
  }, {
    sequelize,
    tableName: 'am',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_am" },
        ]
      },
      {
        name: "id_adm",
        using: "BTREE",
        fields: [
          { name: "id_adm" },
        ]
      },
    ]
  });
};
