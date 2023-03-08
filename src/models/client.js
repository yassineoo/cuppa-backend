const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('client', {
    id_client: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nom_client: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    prenom_client: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    sex_client: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    type_client: {
      type: DataTypes.STRING(50),
      allowNull: true
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
    tableName: 'client',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
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
