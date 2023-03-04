const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('adm', {
    id_adm: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    first_name_adm: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    last_name_adm: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    sex_adm: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    date_naissance_adm: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    path_adm: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    id_client: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'client',
        key: 'id_client'
      }
    },
    id_sadm: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'sadm',
        key: 'id_sadm'
      }
    }
  }, {
    sequelize,
    tableName: 'adm',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_adm" },
        ]
      },
      {
        name: "id_client",
        using: "BTREE",
        fields: [
          { name: "id_client" },
        ]
      },
      {
        name: "id_sadm",
        using: "BTREE",
        fields: [
          { name: "id_sadm" },
        ]
      },
    ]
  });
};
