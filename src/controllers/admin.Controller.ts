import { Request, Response } from 'express';
import sequelize from '../config/sequelizer';
import { Sequelize } from 'sequelize';
import  admModel  from '../models/adm.js';


// Initialize the models
const adm = admModel(sequelize, Sequelize);

// get all the Admins
const getAllAdmins = async (req: Request, res: Response): Promise<void> => {

	try {

		const admins = await adm.findAll();
		res.status(200).json(admins);
	
	} catch (error) {

		console.log(error);
		res.status(500).json({ message: 'Internal server error', error });
	
	}

};

// Get an Admin by ID
const getAdmin = async (req: Request, res: Response): Promise<void> => {

	const { id } = req.params;
	try {

		const admin = await adm.findByPk(id);
		if (admin) {

			res.status(200).json(admin);
		
		} else {

			res.status(404).send('Admin not found');
		
		}
	
	} catch (error) {

		console.log(error);
		res.status(500).json(error);
	
	}

};

// create an Admin
const createAdmin = async (req: Request, res: Response): Promise<void> => {

	const { idAdm, idSadm } = req.body;
	try {

		await adm.create({
			idAdm,
			idSadm,
		});
		res.status(201).send('Admin created successfully');
	
	} catch (error) {

		console.log(error);
		res.status(500).json(error);
	
	}

};

// delete an Admin
const deleteAdmin = async (req: Request, res: Response): Promise<void> => {

	const { id } = req.params;
	try {

		const admin = await adm.destroy({ where: { id_adm: id } });
		if (admin) {

			res.status(200).json({ message: 'Admin deleted successfully', payload: admin });
		
		} else {

			res.status(404).json({ message: `No admin found with ID ${id}`, payload: {} });
		
		}
	
	} catch (error) {

		console.log(error);
		res.status(500).json({ message: `Error deleting admin with ID ${id}: ${error.message}`, payload: {} });
	
	}

};

// modify an Admin
const modifyAdmin = async (req: Request, res: Response): Promise<void> => {

	const { id } = req.params;
	const updates = req.body;
	try {

		const [updatedRowsCount, updatedRows] = await adm.update(updates, { where: { id_adm: id } });
		if (updatedRowsCount > 0) {

			res.status(200).json({ message: 'Admin modified successfully', payload: updatedRows });
		
		} else {

			res.status(404).json({ message: `No admin found with ID ${id}`, payload: {} });
		
		}
	
	} catch (error) {

		console.log(error);
		res.status(500).json({ message: `Error modifying admin with ID ${id}: ${error.message}`, payload: {} });
	
	}

};

export { createAdmin, deleteAdmin, modifyAdmin, getAllAdmins, getAdmin };
