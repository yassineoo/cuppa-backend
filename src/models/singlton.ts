import sequelize from '../config/sequelizer';
import { Sequelize } from 'sequelize';
import admModel from './adm.js';
import sadmModel from './sadm.js';
import decideurModel from './decideur.js';
import acModel from './ac.js';
import amModel from './am.js';
import clientModel from './client.js';
import distributeurModel from './distributeur';
import supplementModel from './supplement.js';
import typePaiementModel from './type_paiement.js';
import commandeModel from './commande.js';
import paiementModel from './paiement.js';
import paysModel from './pays.js';
import regionModel from './region.js';
import communeModel from './commune.js';
import willayaModel from './willaya.js';
import ingredientModel from './ingredient.js';
import boissonsModel from './boissons.js';
import factureModel from './facture.js';
import panneModel from './panne.js';
import detectionVolModel from './detection_vol.js';
import annonceurModel from './annoceur.js';
import annonceModel from './annoces.js';
import reclamationModel from './reclamation.js';
import avoirModelModel from './avoir_model.js';
import preparerAvecModel from './preperer_avec.js';
import tacheModel from './tache.js';
import am_avoir_tacheModel from './am_avoir_tache.js';

class Models {
private adm: any = null;
private sadm: any = null;
private ac: any = null;
private am: any = null;
private decideur: any = null;
private distributeur: any = null;
private client: any = null;
private supplement: any = null;
private typePaiement: any = null;
private commande: any = null;
private paiement: any = null;
private pays: any = null;
private region: any = null;
private commune: any = null;
private willaya: any = null;
private ingredient: any = null;
private boissons: any = null;
private facture: any = null;
private panne: any = null;
private detectionVol: any = null;
private annonceur: any = null;
private annonce: any = null;
private reclamation: any = null;
private avoirModel: any = null;
private preparerAvec: any = null;
private tache: any = null;
private am_avoir_tache: any = null;

	constructor() {

	this.am_avoir_tache = am_avoir_tacheModel(sequelize, Sequelize);
	this.adm = admModel(sequelize, Sequelize);
	this.sadm = sadmModel(sequelize, Sequelize);
	this.adm = admModel(sequelize, Sequelize);
	this.decideur = decideurModel(sequelize, Sequelize);
	this.ac = acModel(sequelize, Sequelize);
	this.am = amModel(sequelize, Sequelize);
	this.distributeur = distributeurModel(sequelize, Sequelize);
	this.client = clientModel(sequelize, Sequelize);
	this.supplement = supplementModel(sequelize, Sequelize);
	this.typePaiement = typePaiementModel(sequelize, Sequelize);
	this.commande = commandeModel(sequelize, Sequelize);
	this.paiement = paiementModel(sequelize, Sequelize);
	this.pays = paysModel(sequelize, Sequelize);
	this.region = regionModel(sequelize, Sequelize);
	this.commune = communeModel(sequelize, Sequelize);
	this.willaya = willayaModel(sequelize, Sequelize);
	this.ingredient = ingredientModel(sequelize, Sequelize);
	this.boissons = boissonsModel(sequelize, Sequelize);
	this.facture = factureModel(sequelize, Sequelize);
	this.panne = panneModel(sequelize, Sequelize);
	this.detectionVol = detectionVolModel(sequelize, Sequelize);
	this.annonceur = annonceurModel(sequelize, Sequelize);
	this.annonce = annonceModel(sequelize, Sequelize);
    this.reclamation=reclamationModel(sequelize, Sequelize);
	this.avoirModel=avoirModelModel(sequelize, Sequelize);
	this.preparerAvec=preparerAvecModel(sequelize, Sequelize);
	this.tache=tacheModel(sequelize, Sequelize);
	}

	getAm_avoir_tache() {
     return this.am_avoir_tache;
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

	getSupplement() {
	
		return this.supplement;

    }

getTypePaiement() {

	return this.typePaiement;

}

getCommande() {

	return this.commande;

}

getPaiement() {

	return this.paiement;

}

getPays() {

	return this.pays;

}

getRegion() {

	return this.region;

}

getCommune() {

	return this.commune;

}

getWillaya() {

	return this.willaya;

}

getIngredient() {

	return this.ingredient;

}

getBoissons() {

	return this.boissons;

}

getFacture() {

	return this.facture;

}

getPanne() {

	return this.panne;

}

getDetectionVol() {

	return this.detectionVol;

}

getAnnonceur() {

	return this.annonceur;

}

getAnnonce() {

	return this.annonce;

}

getReclamation(){

	return this.reclamation;
}

getAvoirModel(){

	return this.avoirModel;
}

getPreparerAvec(){

	return this.preparerAvec;
}

getTache() {

	return this.tache;

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
