import { Request, Response } from 'express';
import AccountManagmentService from '../services/accountService/account.Mangement';



// create an Admin
const createAdmin = async (req: Request, res: Response) => {

	try {

		const sadm = req.user.id;
		// call the servise function to create the admin account
		const result = await AccountManagmentService.createAdmin(req.body, sadm);
		// send the response back to the client
		res.status(200).json({ success: true, data: result });
	
	} catch (err) {

		console.error(`Error creating the admin account: ${err.message}`);
		res.status(500).json({ success: false, error: err.message });
	
	}

};

// delete an Admin
const deleteAdmin = async (req: Request, res: Response) => {

	try {

		const sadm = req.user.id;
		const { adm } = req.params;
		// call the controller function to delete the admin account
		await AccountManagmentService.deleteAdmin(adm,sadm);
		// send the response back to the client
		res.status(200).json({ success: true });
	
	} catch (err) {

		console.error(`Error deleting the admin account: ${err.message}`);
		res.status(500).json({ success: false, error: err.message });
	
	}

};


export { createAdmin, deleteAdmin };
