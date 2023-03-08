import Singlton from '../../models/singlton';
import  AccountManagmentService  from '../../services/accountService/account.Mangement';

// Initialize the models
const am = Singlton.getAm();
const ac = Singlton.getAc();
const decideur = Singlton.getDecideur();


const body =  {
	firstName: 'Test',
	lastName: 'User',
	email: 'testuser@example.com',
	password: 'testpassword',
};


describe('createAccount', () => {

	it('should create a maintenance account if the role is Maintenance', async () => {
	
		const adm = 'testadm';
		const role = 'Maintenance';
		spyOn(am, 'create').and.returnValue(Promise.resolve());
	
		await AccountManagmentService.createAccount(body, role, adm);

		expect(am.create).toHaveBeenCalledWith({...body, id_adm: adm});
	
	});

	it('should create a commercial account if the role is Commercial', async () => {
	
		const adm = 'testadm';
		const role = 'Commercial';
		spyOn(ac, 'create').and.returnValue(Promise.resolve());
	
		await AccountManagmentService.createAccount(body, role, adm);

		expect(ac.create).toHaveBeenCalledWith({...body, id_adm: adm});
	
	});

	it('should create a Decider account if the role is Decider', async () => {
	
		const adm = 'testadm';
		const role = 'Decider';
		spyOn(decideur, 'create').and.returnValue(Promise.resolve());
	
		await AccountManagmentService.createAccount(body, role, adm);

		expect(decideur.create).toHaveBeenCalledWith({...body, id_adm: adm});
	
	});

	it('should throw an error if the role is invalid', async () => {

		const adm = 'testadm';
		const role = 'InvalidRole';
	
		try {

			await AccountManagmentService.createAccount(body, role, adm);
		
		} catch (error) {

			expect(error.message).toBe(`Error creating account: Invalid role: ${role}`);
		
		}
	
	});

});