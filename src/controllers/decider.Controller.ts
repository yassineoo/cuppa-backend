import { Request, Response } from 'express';
import sequelize from '../config/sequelizer';
import { Sequelize } from 'sequelize';
import  decideurModel  from '../models/decideur';


// Initialize the models
const decideur = decideurModel(sequelize, Sequelize);

// get all the Deciders
const getAllDeciders = async (req: Request, res: Response): Promise<void> => {

	try {

		const deciders = await decideur.findAll();
		res.status(200).json(deciders);
	
	} catch (error) {

		console.log(error);
		res.status(500).json({ message: 'Internal server error', error });
	
	}

};

// Get an Decider by ID
const getDecider = async (req: Request, res: Response): Promise<void> => {

	const { id } = req.params;
	try {

		const decider = await decideur.findByPk(id);
		if (decider) {

			res.status(200).json(decider);
		
		} else {

			res.status(404).send('Decider not found');
		
		}
	
	} catch (error) {

		console.log(error);
		res.status(500).json(error);
	
	}

};

// create an Decider
const createDecider = async (req: Request, res: Response): Promise<void> => {

	const { id_decideur, id_sdecideur } = req.body;
	try {

		const decider = await decideur.create({
			id_decideur,
			id_sdecideur,
		});
		res.status(201).send('Decider created successfully');
	
	} catch (error) {

		console.log(error);
		res.status(500).json(error);
	
	}

};

// delete an Decider
const deleteDecider = async (req: Request, res: Response): Promise<void> => {

	const { id } = req.params;
	try {

		const Decider = await decideur.destroy({ where: { id_decideur: id } });
		if (Decider) {

			res.status(200).json({ message: 'Decider deleted successfully', payload: Decider });
		
		} else {

			res.status(404).json({ message: `No Decider found with ID ${id}`, payload: {} });
		
		}
	
	} catch (error) {

		console.log(error);
		res.status(500).json({ message: `Error deleting Decider with ID ${id}: ${error.message}`, payload: {} });
	
	}

};

// modify an Decider
const modifyDecider = async (req: Request, res: Response): Promise<void> => {

	const { id } = req.params;
	const updates = req.body;
	try {

		const [updatedRowsCount, updatedRows] = await decideur.update(updates, { where: { id_decideur: id } });
		if (updatedRowsCount > 0) {

			res.status(200).json({ message: 'Decider modified successfully', payload: updatedRows });
		
		} else {

			res.status(404).json({ message: `No Decider found with ID ${id}`, payload: {} });
		
		}
	
	} catch (error) {

		console.log(error);
		res.status(500).json({ message: `Error modifying Decider with ID ${id}: ${error.message}`, payload: {} });
	
	}

};

export { createDecider, deleteDecider, modifyDecider, getAllDeciders, getDecider };
