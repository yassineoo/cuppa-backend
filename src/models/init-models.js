var DataTypes = require("sequelize").DataTypes;
var _ac = require("./ac");
var _accepter_suppliment = require("./accepter_suppliment");
var _acheter_distributeur = require("./acheter_distributeur");
var _adm = require("./adm");
var _afficher_dans_region = require("./afficher_dans_region");
var _ajouter_supplement = require("./ajouter_supplement");
var _am = require("./am");
var _am_avoir_tache = require("./am_avoir_tache");
var _annoce = require("./annoce");
var _annoceur = require("./annoceur");
var _avoir_model = require("./avoir_model");
var _boissons = require("./boissons");
var _client = require("./client");
var _commande = require("./commande");
var _commune = require("./commune");
var _consommateur = require("./consommateur");
var _decideur = require("./decideur");
var _detection_vol = require("./detection_vol");
var _distributeur = require("./distributeur");
var _donner_prix = require("./donner_prix");
var _facture = require("./facture");
var _faire_commande = require("./faire_commande");
var _ingredient = require("./ingredient");
var _model_distributeur = require("./model_distributeur");
var _paiement = require("./paiement");
var _panne = require("./panne");
var _pays = require("./pays");
var _preperer_avec = require("./preperer_avec");
var _reclamation = require("./reclamation");
var _region = require("./region");
var _region_dynamique = require("./region_dynamique");
var _sadm = require("./sadm");
var _supplement = require("./supplement");
var _tache = require("./tache");
var _type_paiement = require("./type_paiement");
var _willaya = require("./willaya");

function initModels(sequelize) {
  var ac = _ac(sequelize, DataTypes);
  var accepter_suppliment = _accepter_suppliment(sequelize, DataTypes);
  var acheter_distributeur = _acheter_distributeur(sequelize, DataTypes);
  var adm = _adm(sequelize, DataTypes);
  var afficher_dans_region = _afficher_dans_region(sequelize, DataTypes);
  var ajouter_supplement = _ajouter_supplement(sequelize, DataTypes);
  var am = _am(sequelize, DataTypes);
  var am_avoir_tache = _am_avoir_tache(sequelize, DataTypes);
  var annoce = _annoce(sequelize, DataTypes);
  var annoceur = _annoceur(sequelize, DataTypes);
  var avoir_model = _avoir_model(sequelize, DataTypes);
  var boissons = _boissons(sequelize, DataTypes);
  var client = _client(sequelize, DataTypes);
  var commande = _commande(sequelize, DataTypes);
  var commune = _commune(sequelize, DataTypes);
  var consommateur = _consommateur(sequelize, DataTypes);
  var decideur = _decideur(sequelize, DataTypes);
  var detection_vol = _detection_vol(sequelize, DataTypes);
  var distributeur = _distributeur(sequelize, DataTypes);
  var donner_prix = _donner_prix(sequelize, DataTypes);
  var facture = _facture(sequelize, DataTypes);
  var faire_commande = _faire_commande(sequelize, DataTypes);
  var ingredient = _ingredient(sequelize, DataTypes);
  var model_distributeur = _model_distributeur(sequelize, DataTypes);
  var paiement = _paiement(sequelize, DataTypes);
  var panne = _panne(sequelize, DataTypes);
  var pays = _pays(sequelize, DataTypes);
  var preperer_avec = _preperer_avec(sequelize, DataTypes);
  var reclamation = _reclamation(sequelize, DataTypes);
  var region = _region(sequelize, DataTypes);
  var region_dynamique = _region_dynamique(sequelize, DataTypes);
  var sadm = _sadm(sequelize, DataTypes);
  var supplement = _supplement(sequelize, DataTypes);
  var tache = _tache(sequelize, DataTypes);
  var type_paiement = _type_paiement(sequelize, DataTypes);
  var willaya = _willaya(sequelize, DataTypes);

  am.belongsToMany(tache, { as: 'id_tache_taches', through: am_avoir_tache, foreignKey: "id_am", otherKey: "id_tache" });
  annoce.belongsToMany(region_dynamique, { as: 'id_region_dynamique_region_dynamiques', through: afficher_dans_region, foreignKey: "id_annonce", otherKey: "id_region_dynamique" });
  boissons.belongsToMany(ingredient, { as: 'id_ingredient_ingredients', through: preperer_avec, foreignKey: "id_boissons", otherKey: "id_ingredient" });
  boissons.belongsToMany(supplement, { as: 'id_supplement_supplements', through: accepter_suppliment, foreignKey: "id_boissons", otherKey: "id_supplement" });
  commande.belongsToMany(supplement, { as: 'id_supplement_supplement_ajouter_supplements', through: ajouter_supplement, foreignKey: "id_commande", otherKey: "id_supplement" });
  distributeur.belongsToMany(model_distributeur, { as: 'id_type_model_distributeurs', through: avoir_model, foreignKey: "id_distributeur", otherKey: "id_type" });
  ingredient.belongsToMany(boissons, { as: 'id_boissons_boissons_preperer_avecs', through: preperer_avec, foreignKey: "id_ingredient", otherKey: "id_boissons" });
  model_distributeur.belongsToMany(distributeur, { as: 'id_distributeur_distributeurs', through: avoir_model, foreignKey: "id_type", otherKey: "id_distributeur" });
  region_dynamique.belongsToMany(annoce, { as: 'id_annonce_annoces', through: afficher_dans_region, foreignKey: "id_region_dynamique", otherKey: "id_annonce" });
  supplement.belongsToMany(boissons, { as: 'id_boissons_boissons', through: accepter_suppliment, foreignKey: "id_supplement", otherKey: "id_boissons" });
  supplement.belongsToMany(commande, { as: 'id_commande_commandes', through: ajouter_supplement, foreignKey: "id_supplement", otherKey: "id_commande" });
  tache.belongsToMany(am, { as: 'id_am_ams', through: am_avoir_tache, foreignKey: "id_tache", otherKey: "id_am" });
  annoceur.belongsTo(ac, { as: "id_ac_ac", foreignKey: "id_ac"});
  ac.hasMany(annoceur, { as: "annoceurs", foreignKey: "id_ac"});
  donner_prix.belongsTo(ac, { as: "id_ac_ac", foreignKey: "id_ac"});
  ac.hasMany(donner_prix, { as: "donner_prixes", foreignKey: "id_ac"});
  ac.belongsTo(adm, { as: "id_adm_adm", foreignKey: "id_adm"});
  adm.hasMany(ac, { as: "acs", foreignKey: "id_adm"});
  am.belongsTo(adm, { as: "id_adm_adm", foreignKey: "id_adm"});
  adm.hasMany(am, { as: "ams", foreignKey: "id_adm"});
  decideur.belongsTo(adm, { as: "id_adm_adm", foreignKey: "id_adm"});
  adm.hasMany(decideur, { as: "decideurs", foreignKey: "id_adm"});
  am_avoir_tache.belongsTo(am, { as: "id_am_am", foreignKey: "id_am"});
  am.hasMany(am_avoir_tache, { as: "am_avoir_taches", foreignKey: "id_am"});
  panne.belongsTo(am, { as: "id_am_am", foreignKey: "id_am"});
  am.hasMany(panne, { as: "pannes", foreignKey: "id_am"});
  afficher_dans_region.belongsTo(annoce, { as: "id_annonce_annoce", foreignKey: "id_annonce"});
  annoce.hasMany(afficher_dans_region, { as: "afficher_dans_regions", foreignKey: "id_annonce"});
  annoce.belongsTo(annoceur, { as: "id_anonceur_annoceur", foreignKey: "id_anonceur"});
  annoceur.hasMany(annoce, { as: "annoces", foreignKey: "id_anonceur"});
  accepter_suppliment.belongsTo(boissons, { as: "id_boissons_boisson", foreignKey: "id_boissons"});
  boissons.hasMany(accepter_suppliment, { as: "accepter_suppliments", foreignKey: "id_boissons"});
  commande.belongsTo(boissons, { as: "id_boissons_boisson", foreignKey: "id_boissons"});
  boissons.hasMany(commande, { as: "commandes", foreignKey: "id_boissons"});
  donner_prix.belongsTo(boissons, { as: "id_boissons_boisson", foreignKey: "id_boissons"});
  boissons.hasMany(donner_prix, { as: "donner_prixes", foreignKey: "id_boissons"});
  preperer_avec.belongsTo(boissons, { as: "id_boissons_boisson", foreignKey: "id_boissons"});
  boissons.hasMany(preperer_avec, { as: "preperer_avecs", foreignKey: "id_boissons"});
  acheter_distributeur.belongsTo(client, { as: "id_client_client", foreignKey: "id_client"});
  client.hasMany(acheter_distributeur, { as: "acheter_distributeurs", foreignKey: "id_client"});
  adm.belongsTo(client, { as: "id_client_client", foreignKey: "id_client"});
  client.hasMany(adm, { as: "adms", foreignKey: "id_client"});
  ajouter_supplement.belongsTo(commande, { as: "id_commande_commande", foreignKey: "id_commande"});
  commande.hasMany(ajouter_supplement, { as: "ajouter_supplements", foreignKey: "id_commande"});
  faire_commande.belongsTo(commande, { as: "id_commande_commande", foreignKey: "id_commande"});
  commande.hasMany(faire_commande, { as: "faire_commandes", foreignKey: "id_commande"});
  paiement.belongsTo(commande, { as: "id_commande_commande", foreignKey: "id_commande"});
  commande.hasOne(paiement, { as: "paiement", foreignKey: "id_commande"});
  reclamation.belongsTo(commande, { as: "id_commande_commande", foreignKey: "id_commande"});
  commande.hasOne(reclamation, { as: "reclamation", foreignKey: "id_commande"});
  region.belongsTo(commune, { as: "num_commune_commune", foreignKey: "num_commune"});
  commune.hasMany(region, { as: "regions", foreignKey: "num_commune"});
  faire_commande.belongsTo(consommateur, { as: "id_consommateur_consommateur", foreignKey: "id_consommateur"});
  consommateur.hasMany(faire_commande, { as: "faire_commandes", foreignKey: "id_consommateur"});
  acheter_distributeur.belongsTo(distributeur, { as: "id_distributeur_distributeur", foreignKey: "id_distributeur"});
  distributeur.hasOne(acheter_distributeur, { as: "acheter_distributeur", foreignKey: "id_distributeur"});
  avoir_model.belongsTo(distributeur, { as: "id_distributeur_distributeur", foreignKey: "id_distributeur"});
  distributeur.hasMany(avoir_model, { as: "avoir_models", foreignKey: "id_distributeur"});
  detection_vol.belongsTo(distributeur, { as: "id_distributeur_distributeur", foreignKey: "id_distributeur"});
  distributeur.hasMany(detection_vol, { as: "detection_vols", foreignKey: "id_distributeur"});
  donner_prix.belongsTo(distributeur, { as: "id_distributeur_distributeur", foreignKey: "id_distributeur"});
  distributeur.hasMany(donner_prix, { as: "donner_prixes", foreignKey: "id_distributeur"});
  faire_commande.belongsTo(distributeur, { as: "id_distributeur_distributeur", foreignKey: "id_distributeur"});
  distributeur.hasMany(faire_commande, { as: "faire_commandes", foreignKey: "id_distributeur"});
  panne.belongsTo(distributeur, { as: "id_distributeur_distributeur", foreignKey: "id_distributeur"});
  distributeur.hasMany(panne, { as: "pannes", foreignKey: "id_distributeur"});
  paiement.belongsTo(facture, { as: "id_facture_facture", foreignKey: "id_facture"});
  facture.hasOne(paiement, { as: "paiement", foreignKey: "id_facture"});
  preperer_avec.belongsTo(ingredient, { as: "id_ingredient_ingredient", foreignKey: "id_ingredient"});
  ingredient.hasMany(preperer_avec, { as: "preperer_avecs", foreignKey: "id_ingredient"});
  avoir_model.belongsTo(model_distributeur, { as: "id_type_model_distributeur", foreignKey: "id_type"});
  model_distributeur.hasMany(avoir_model, { as: "avoir_models", foreignKey: "id_type"});
  willaya.belongsTo(pays, { as: "nom_pays_pay", foreignKey: "nom_pays"});
  pays.hasMany(willaya, { as: "willayas", foreignKey: "nom_pays"});
  distributeur.belongsTo(region, { as: "id_region_region", foreignKey: "id_region"});
  region.hasMany(distributeur, { as: "distributeurs", foreignKey: "id_region"});
  afficher_dans_region.belongsTo(region_dynamique, { as: "id_region_dynamique_region_dynamique", foreignKey: "id_region_dynamique"});
  region_dynamique.hasMany(afficher_dans_region, { as: "afficher_dans_regions", foreignKey: "id_region_dynamique"});
  distributeur.belongsTo(region_dynamique, { as: "id_region_dynamique_region_dynamique", foreignKey: "id_region_dynamique"});
  region_dynamique.hasMany(distributeur, { as: "distributeurs", foreignKey: "id_region_dynamique"});
  adm.belongsTo(sadm, { as: "id_sadm_sadm", foreignKey: "id_sadm"});
  sadm.hasMany(adm, { as: "adms", foreignKey: "id_sadm"});
  client.belongsTo(sadm, { as: "id_sadm_sadm", foreignKey: "id_sadm"});
  sadm.hasMany(client, { as: "clients", foreignKey: "id_sadm"});
  distributeur.belongsTo(sadm, { as: "id_sadm_sadm", foreignKey: "id_sadm"});
  sadm.hasMany(distributeur, { as: "distributeurs", foreignKey: "id_sadm"});
  accepter_suppliment.belongsTo(supplement, { as: "id_supplement_supplement", foreignKey: "id_supplement"});
  supplement.hasMany(accepter_suppliment, { as: "accepter_suppliments", foreignKey: "id_supplement"});
  ajouter_supplement.belongsTo(supplement, { as: "id_supplement_supplement", foreignKey: "id_supplement"});
  supplement.hasMany(ajouter_supplement, { as: "ajouter_supplements", foreignKey: "id_supplement"});
  am_avoir_tache.belongsTo(tache, { as: "id_tache_tache", foreignKey: "id_tache"});
  tache.hasMany(am_avoir_tache, { as: "am_avoir_taches", foreignKey: "id_tache"});
  paiement.belongsTo(type_paiement, { as: "id_type_paiement_type_paiement", foreignKey: "id_type_paiement"});
  type_paiement.hasMany(paiement, { as: "paiements", foreignKey: "id_type_paiement"});
  commune.belongsTo(willaya, { as: "num_willaya_willaya", foreignKey: "num_willaya"});
  willaya.hasMany(commune, { as: "communes", foreignKey: "num_willaya"});

  return {
    ac,
    accepter_suppliment,
    acheter_distributeur,
    adm,
    afficher_dans_region,
    ajouter_supplement,
    am,
    am_avoir_tache,
    annoce,
    annoceur,
    avoir_model,
    boissons,
    client,
    commande,
    commune,
    consommateur,
    decideur,
    detection_vol,
    distributeur,
    donner_prix,
    facture,
    faire_commande,
    ingredient,
    model_distributeur,
    paiement,
    panne,
    pays,
    preperer_avec,
    reclamation,
    region,
    region_dynamique,
    sadm,
    supplement,
    tache,
    type_paiement,
    willaya,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
