
import Singlton from '../../models/singlton';

// Initialize the models
const decideur = Singlton.getDecideur();
const am = Singlton.getAm();
const ac = Singlton.getAc();
const adm = Singlton.getAdm();
const sadm = Singlton.getSadm();


class AccountManagmentService {


	static deleteAccount = async (id: string, role: string, adm: string) => {

		let accountModel;
      
		switch (role) {

			case 'Maintenance':
				accountModel = am;
				break;
			case 'Commercial':
				accountModel = ac;
				break;
			case 'Decider':
				accountModel = decideur;
				break;
			default:
				throw new Error(`Invalid account role: ${role}`);
		
		}
      
		const account = await accountModel.findOne({ where: { id } });
      
		if (!account) {

			throw new Error(`Account with id ${id} not found`);
		
		}
      
		if (account.id_adm !== adm) {

			throw new Error(`Admin with id ${adm} is not authorized to delete this account`);
		
		}
      
		await account.destroy();
      
		return { message: `Account with id ${id} deleted successfully` };
	
	};


	/**
   * @description create an account in the database of the corresponding role
   * @param body {object} contain all the necessary information for creation of the Account
   * @param role {string} role is the type of the account created
   * @param adm {string} id of the administrator who created the account
   * @returns {object} Return object with only the whitelisted keys
   */

	static  createAccount = async(body:any ,role:string,adm:string) => {
          
		try {

			switch (role) {

				case 'Maintenance':
					await am.create({...body,id_adm:adm});
					break;
				case 'Commercial':
					await ac.create({...body,id_adm:adm});
					break;
				case 'Decider':
					await decideur.create({...body,id_adm:adm});
					break;
			
			}
		
		} catch (err) {

			console.error(`Error creating account: ${err.message}`);
			throw new Error(`Error creating account: ${err.message}`);
		
		}
	
	};
      
           
	static async modifyAccount(id: string, body: any, role: string, modifierId: string, modifierRole: string) {

		let account;
          
		switch (role) {

			case 'Maintenance':
				account = await am.findOne({ where: { id } });
				break;
			case 'Commercial':
				account = await ac.findOne({ where: { id } });
				break;
			case 'Decider':
				account = await decideur.findOne({ where: { id } });
				break;
			default:
				throw new Error(`Invalid role: ${role}`);
		
		}
          
		if (!account) {

			throw new Error(`${role} not found`);
		
		}
          
		if (modifierRole !== 'Admin' && account.id_adm !== modifierId) {

			throw new Error(`Unauthorized to modify ${role}`);
		
		}
          
		// Update account properties
		account = { ...account, ...body };
		// Save changes to database
		await account.save();
          
		return account.toJSON();
	
	}   

	static getAccounts = async (role: string, admId: string) => {

		let accounts;
		switch (role) {

			case 'Maintenance':
				accounts = await am.findAll({ where: { id_adm: admId } });
				break;
			case 'Commercial':
				accounts = await ac.findAll({ where: { id_adm: admId } });
				break;
			case 'Decider':
				accounts = await decideur.findAll({ where: { id_adm: admId } });
				break;
			default:
				throw new Error(`Invalid role: ${role}`);
		
		}
		return accounts;
	
	};
      
	
	/**
   * @description create an account in the database of the corresponding admin
   * @param body {object} contain all the necessary information for creation of the Account
   * @param sadm {string} id of the super administrator who created the account
   * @returns {object} Return object with only the whitelisted keys
   */
		
	static createAdmin = async (body: any, sadm_id: string) => {
		// Vérifiez que l'utilisateur appelant cette méthode est un super administrateur
		const isSadm = await sadm.findOne({ where: { sadm_id } });
		if (!isSadm) {
		  throw new Error(`l'utilisateur ${sadm_id} n'est pas autorisé à créer un compte administrateur`);
		}
	
		// Création
		try {

			await adm.create({...body,id_sadm: sadm_id});
		
		} catch (err) {

			console.error(`Error creating account: ${err.message}`);
			throw new Error(`Error creating account: ${err.message}`);
		
		}

	};



	/**
   * @description delete an account in the database of the corresponding admin
   * @param sadm_id {string} id of the super administrator who deleted the account
   * @param adm_id {string} id of the administrator whose account is going to be deleted
   * @returns {object} Return object with only the whitelisted keys
   */

	static deleteAdmin = async (adm_id: string, sadm_id: string) => {
		// Vérifiez que l'utilisateur appelant cette méthode est un super administrateur
		const isSadm = await sadm.findOne({ where: { sadm_id } });
		if (!isSadm) {
		  throw new Error(`l'utilisateur ${sadm_id} n'est pas autorisé à créer un compte administrateur`);
		}
	
		// Rechercher le compte admin à supprimer
		const adminAccount = await adm.findOne({ where: { adm_id } });
		if (!adminAccount) {
		  throw new Error(`Admin account with id ${adm_id} does not exist`);
		}
	
		// Suppression
		await adminAccount.destroy();
	
		return { message: `Admin account with id ${adm_id} deleted successfully` };
	};
	
	

}


  
export default AccountManagmentService;
