const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('am_avoir_tache', {
    id_am: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'am',
        key: 'id_am'
      }
    },
    id_tache: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'tache',
        key: 'id_tache'
      }
    }
  }, {
    sequelize,
    tableName: 'am_avoir_tache',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_am" },
          { name: "id_tache" },
        ]
      },
      {
        name: "id_tache",
        using: "BTREE",
        fields: [
          { name: "id_tache" },
        ]
      },
    ]
  });
};
