const Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {
     return sequelize.define(
          'distributeur',
          {
               id_distributeur: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    primaryKey: true,
               },
               num_serie: {
                    type: DataTypes.STRING(50),
                    allowNull: true,
               },
               couleur: {
                    type: DataTypes.STRING(50),
                    allowNull: true,
               },
               Statut: {
                    type: DataTypes.STRING(50),
                    allowNull: true,
               },
               code_pin: {
                    type: DataTypes.INTEGER,
                    allowNull: true,
               },
               localisation_gps: {
                    type: DataTypes.STRING(50),
                    allowNull: true,
               },
               Date_installation: {
                    type: DataTypes.DATEONLY,
                    allowNull: true,
               },
               id_sadm: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    references: {
                         model: 'sadm',
                         key: 'id_sadm',
                    },
               },
               id_region: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    references: {
                         model: 'region',
                         key: 'id_region',
                    },
               },
               id_region_dynamique: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    references: {
                         model: 'region_dynamique',
                         key: 'id_region_dynamique',
                    },
               },
          },
          {
               sequelize,
               tableName: 'distributeur',
               timestamps: false,
               indexes: [
                    {
                         name: 'PRIMARY',
                         unique: true,
                         using: 'BTREE',
                         fields: [{ name: 'id_distributeur' }],
                    },
                    {
                         name: 'id_sadm',
                         using: 'BTREE',
                         fields: [{ name: 'id_sadm' }],
                    },
                    {
                         name: 'id_region',
                         using: 'BTREE',
                         fields: [{ name: 'id_region' }],
                    },
                    {
                         name: 'id_region_dynamique',
                         using: 'BTREE',
                         fields: [{ name: 'id_region_dynamique' }],
                    },
               ],
          }
     );
};
