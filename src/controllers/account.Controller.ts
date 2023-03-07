/* eslint-disable @typescript-eslint/no-namespace */
import { Request, Response } from 'express';
import AccountManagmentService from '../services/accountService/account.Mangement';
interface User {
    id: string;
    role: string;
  }
  
declare global {
    namespace Express {
      interface Request {
        user: User;
      }
    }
  }
const createAccount = async (req: Request, res: Response) => {

	try {

		const { role } = req.params;
		const adm = req.user.id;
		// call the servise function to create the account
		const result = await AccountManagmentService.createAccount(req.body, role,adm);
		// send the response back to the client
		res.status(200).json({ success: true, data: result });
	
	} catch (err) {

		console.error(`Error creating account: ${err.message}`);
		res.status(500).json({ success: false, error: err.message });
	
	}

};

const deleteAccount = async (req: Request, res: Response) => {

	try {

		const adm = req.user.id;
		const { id,role } = req.params;
		// call the controller function to delete the account
		await AccountManagmentService.deleteAccount(id,role,adm);
		// send the response back to the client
		res.status(200).json({ success: true });
	
	} catch (err) {

		console.error(`Error deleting account: ${err.message}`);
		res.status(500).json({ success: false, error: err.message });
	
	}

};

const modifyAccount = async (req: Request, res: Response) => {

	try {

		const modifierId = req.user.id;
		const modifierRole = req.user.role;

		const { id,role } = req.params;
		// call the controller function to modify the commercial account
		const result = await AccountManagmentService.modifyAccount(id, req.body,role,modifierId,modifierRole);
		// send the response back to the client
		res.status(200).json({ success: true, data: result });
	
	} catch (err) {

		console.error(`Error modifying commercial account: ${err.message}`);
		res.status(500).json({ success: false, error: err.message });
	
	}

};


const getAccounts = async (req: Request, res: Response) => {

	try {

		const { role } = req.params;
		const admId = req.user.id;

		const accounts = await AccountManagmentService.getAccounts(role,admId);
		res.status(200).json({ success: true, data: accounts });
	
	} catch (err) {

		console.error(`Error getting accounts: ${err.message}`);
		res.status(500).json({ success: false, error: err.message });
	
	}

};
  
export {
	createAccount,
	deleteAccount,
	modifyAccount,
	getAccounts,
};
