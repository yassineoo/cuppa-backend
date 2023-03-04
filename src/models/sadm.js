const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('sadm', {
    id_sadm: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    first_name_sadm: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    last_name_sadm: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    username_sadm: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    password_sadm: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    sex_SADM: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    path_sdam: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Date_naissance: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'sadm',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_sadm" },
        ]
      },
    ]
  });
};
