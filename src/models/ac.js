const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ac', {
    id_ac: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    path_ac: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    date_naissance_ac: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    sex_ac: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    first_name_ac: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    last_name_ac: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    username_ac: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    password_ac: {
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
    tableName: 'ac',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_ac" },
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
