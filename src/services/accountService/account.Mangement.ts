
import Singlton from '../../models/singlton';

// Initialize the models
const decideur = Singlton.getDecideur();
const am = Singlton.getAm();
const ac = Singlton.getAc();


class AccountManagmentService {

	/**
      * @description Delete an account from the database of the corresponding role.
      * @param id {string} A string representing the id of the account to be deleted.
      * @param role {string} A string representing the role of the account being deleted.
      * @param adm {string} A string representing the id of the administrator who is authorized to delete the account.
      * @returns {object} An object with a message indicating that the account was deleted successfully.
      * @throws {Error} Throws an error if the account does not exist or if the administrator is not authorized to delete the account.
      */

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
   * @returns {object} An object with only the whitelisted keys.
   * @throws {Error} Throws an error if the role is invalid.
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

			throw new Error('Account not found');
		
		}
          
		if (modifierRole !== 'Admin' && account.id_adm !== modifierId) {

			throw new Error('Unauthorized to modify Account');
		
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
      
		
	

}


  
export default AccountManagmentService;