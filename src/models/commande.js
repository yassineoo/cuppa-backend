const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('commande', {
    id_commande: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    date_cmd: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    heure_cmd: {
      type: DataTypes.TIME,
      allowNull: true
    },
    prix_cmd: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    id_boissons: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'boissons',
        key: 'id_boissons'
      }
    }
  }, {
    sequelize,
    tableName: 'commande',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_commande" },
        ]
      },
      {
        name: "id_boissons",
        using: "BTREE",
        fields: [
          { name: "id_boissons" },
        ]
      },
    ]
  });
};
