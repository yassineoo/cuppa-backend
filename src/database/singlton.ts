const admModel = require('../models/adm.js');
const sadmModel = require('../models/sadm.js');
const { Sequelize } = require('sequelize');
const sequelize =require('./sequelizerr.js');

// Initialize the models
let adm = null;
let sadm = null;

function getAdm() {
  if (adm === null) {
    adm = admModel(sequelize, Sequelize);
  }
  return adm;
}

function getSadm() {
  if (sadm === null) {
    sadm = sadmModel(sequelize, Sequelize);
  }
  return sadm;
}

module.exports = { getAdm, getSadm };
