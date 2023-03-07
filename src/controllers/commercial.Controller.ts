import { Request, Response } from 'express';
import sequelize from '../config/sequelizer';
import { Sequelize } from 'sequelize';
import  acModel  from '../models/ac';


// Initialize the models
const ac = acModel(sequelize, Sequelize);

// get all the Commercials
const getAllCommercials = async (req: Request, res: Response): Promise<void> => {

	try {

		const Commercials = await ac.findAll();
		res.status(200).json(Commercials);
	
	} catch (error) {

		console.log(error);
		res.status(500).json({ message: 'Internal server error', error });
	
	}

};

// Get an Commercial by ID
const getCommercial = async (req: Request, res: Response): Promise<void> => {

	const { id } = req.params;
	try {

		const Commercial = await ac.findByPk(id);
		if (Commercial) {

			res.status(200).json(Commercial);
		
		} else {

			res.status(404).send('Commercial not found');
		
		}
	
	} catch (error) {

		console.log(error);
		res.status(500).json(error);
	
	}

};

// create an Commercial
const createCommercial = async (req: Request, res: Response): Promise<void> => {

	const { idAc, idSac } = req.body;
	try {

		await ac.create({
			idAc,
			idSac,
		});
		res.status(201).send('Commercial created successfully');
	
	} catch (error) {

		console.log(error);
		res.status(500).json(error);
	
	}

};

// delete an Commercial
const deleteCommercial = async (req: Request, res: Response): Promise<void> => {

	const { id } = req.params;
	try {

		const Commercial = await ac.destroy({ where: { id_ac: id } });
		if (Commercial) {

			res.status(200).json({ message: 'Commercial deleted successfully', payload: Commercial });
		
		} else {

			res.status(404).json({ message: `No Commercial found with ID ${id}`, payload: {} });
		
		}
	
	} catch (error) {

		console.log(error);
		res.status(500).json({ message: `Error deleting Commercial with ID ${id}: ${error.message}`, payload: {} });
	
	}

};

// modify an Commercial
const modifyCommercial = async (req: Request, res: Response): Promise<void> => {

	const { id } = req.params;
	const updates = req.body;
	try {

		const [updatedRowsCount, updatedRows] = await ac.update(updates, { where: { id_ac: id } });
		if (updatedRowsCount > 0) {

			res.status(200).json({ message: 'Commercial modified successfully', payload: updatedRows });
		
		} else {

			res.status(404).json({ message: `No Commercial found with ID ${id}`, payload: {} });
		
		}
	
	} catch (error) {

		console.log(error);
		res.status(500).json({ message: `Error modifying Commercial with ID ${id}: ${error.message}`, payload: {} });
	
	}

};

export { createCommercial, deleteCommercial, modifyCommercial, getAllCommercials, getCommercial };
