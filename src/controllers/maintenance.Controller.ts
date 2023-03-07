import { Request, Response } from 'express';
import sequelize from '../config/sequelizer';
import { Sequelize } from 'sequelize';
import  amModel  from '../models/am';


// Initialize the models
const am = amModel(sequelize, Sequelize);

// get all the Maintenances
const getAllMaintenances = async (req: Request, res: Response): Promise<void> => {

	try {

		const Maintenances = await am.findAll();
		res.status(200).json(Maintenances);
	
	} catch (error) {

		console.log(error);
		res.status(500).json({ message: 'Internal server error', error });
	
	}

};

// Get an Maintenance by ID
const getMaintenance = async (req: Request, res: Response): Promise<void> => {

	const { id } = req.params;
	try {

		const Maintenance = await am.findByPk(id);
		if (Maintenance) {

			res.status(200).json(Maintenance);
		
		} else {

			res.status(404).send('Maintenance not found');
		
		}
	
	} catch (error) {

		console.log(error);
		res.status(500).json(error);
	
	}

};

// create an Maintenance
const createMaintenance = async (req: Request, res: Response): Promise<void> => {

	const { id_am, id_sam } = req.body;
	try {

		const Maintenance = await am.create({
			id_am,
			id_sam,
		});
		res.status(201).send('Maintenance created successfully');
	
	} catch (error) {

		console.log(error);
		res.status(500).json(error);
	
	}

};

// delete an Maintenance
const deleteMaintenance = async (req: Request, res: Response): Promise<void> => {

	const { id } = req.params;
	try {

		const Maintenance = await am.destroy({ where: { id_am: id } });
		if (Maintenance) {

			res.status(200).json({ message: 'Maintenance deleted successfully', payload: Maintenance });
		
		} else {

			res.status(404).json({ message: `No Maintenance found with ID ${id}`, payload: {} });
		
		}
	
	} catch (error) {

		console.log(error);
		res.status(500).json({ message: `Error deleting Maintenance with ID ${id}: ${error.message}`, payload: {} });
	
	}

};

// modify an Maintenance
const modifyMaintenance = async (req: Request, res: Response): Promise<void> => {

	const { id } = req.params;
	const updates = req.body;
	try {

		const [updatedRowsCount, updatedRows] = await am.update(updates, { where: { id_am: id } });
		if (updatedRowsCount > 0) {

			res.status(200).json({ message: 'Maintenance modified successfully', payload: updatedRows });
		
		} else {

			res.status(404).json({ message: `No Maintenance found with ID ${id}`, payload: {} });
		
		}
	
	} catch (error) {

		console.log(error);
		res.status(500).json({ message: `Error modifying Maintenance with ID ${id}: ${error.message}`, payload: {} });
	
	}

};

export { createMaintenance, deleteMaintenance, modifyMaintenance, getAllMaintenances, getMaintenance };
