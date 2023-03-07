// models.js
import sequelize from '../config/sequelizer';
import { Sequelize } from 'sequelize';
import admModel from './adm.js';
import sadmModel from './sadm.js';
import decideurModel from './decideur.js';
import acModel from './ac.js';
import amModel from './am.js';
import clientModel from './client.js';
import distributeurModel from './distributeur';
class Models {

	private adm: any = null;
	private sadm: any = null;
	private ac: any = null;
	private am: any = null;
	private decideur: any = null;
	private distributeur :any = null;
	private client : any = null;

	constructor() {

		this.adm = admModel(sequelize, Sequelize);
		this.sadm = sadmModel(sequelize, Sequelize);
		this.adm = admModel(sequelize, Sequelize);
		this.decideur = decideurModel(sequelize, Sequelize);
		this.ac = acModel(sequelize, Sequelize);
		this.am = amModel(sequelize, Sequelize);
		this.distributeur = distributeurModel(sequelize, Sequelize);
		this.client = clientModel(sequelize,Sequelize);

	}

	getAdm() {

		return this.adm;
	
	}

	getSadm() {

		return this.sadm;
	
	}
	getAm() {

		return this.am;
	
	}
	getAc() {

		return this.ac;
	
	}  
	getDecideur() {

		return this.decideur;
	
	}
  
	getDistributeur () {

		return this.distributeur;
	
	}
	getClient () {

		return this.client;
	
	}

}

let models: Models | null = null;

function getModels(): Models {

	if (models === null) {

		models = new Models();
	
	}
	return models;

}

export default getModels();
