const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('decideur', {
    id_decideur: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    date_naissance__ecideur: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      primaryKey: true
    },
    sex_decideur: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    path_decideur: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    first_name__decideur: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    last_name__decideur: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    usename__decideur: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    password__decideur: {
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
    tableName: 'decideur',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_decideur" },
          { name: "date_naissance__ecideur" },
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
