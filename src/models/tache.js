const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tache', {
    id_tache: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    description_tache: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'tache',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_tache" },
        ]
      },
    ]
  });
};
