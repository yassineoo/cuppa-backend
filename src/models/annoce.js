const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('annoce', {
    id_annonce: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    dure_affichage: {
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
    ageMax: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    path_video: {
      type: DataTypes.STRING(50),
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
    tableName: 'annoce',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_annonce" },
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
