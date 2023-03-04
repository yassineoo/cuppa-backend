const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('annoces', {
    id_annonces: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Durre_affichage: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    sex: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    ageMin: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    AgeMax: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    prix_annonce: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    id_anonceur: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'annoceur',
        key: 'id_anonceur'
      }
    }
  }, {
    sequelize,
    tableName: 'annoces',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_annonces" },
        ]
      },
      {
        name: "id_anonceur",
        using: "BTREE",
        fields: [
          { name: "id_anonceur" },
        ]
      },
    ]
  });
};
