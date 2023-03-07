import { Request,Response } from 'express';
import Singlton from '../models/singlton';

// Initialize the models
const distributeur = Singlton.getDistributeur();
const client = Singlton.getClient();


// get all the distributors
const getAllDistributors = async (req: Request, res: Response) => {

	try {

		const distributors = await distributeur.findAll();
		res.status(200);
		return res.json(distributors);
	
	} catch (error) {

		res.status(400);
		return res.json({ error: error.message });
	
	}

};

// Get a distributor by ID
const getDistributor = async (req: Request, res: Response) => {

	try {

		const distributor = await distributeur.findByPk(req.params.id);
		if (!distributor) {

			return res.status(404).json({ error: 'Distributor not found' });
		
		}
		res.status(200).json(distributor);
	
	} catch (error) {

		res.status(400).json({ error: error.message });
	
	}

};




// create the Distributor
const createDistributor = async (req: Request, res: Response) => {

	try {

		const distributor = await distributeur.create(req.body);
		res.status(201);
		return res.json(distributor);
	
	} catch (error) {

		res.status(400);
		return res.json({ error: error.message });
	
	}

};
// delete the Distributor
const deleteDistributor = async (req: Request, res: Response) => {

	try {
    
		const distributor = await distributeur.findByPk(req.params.id);
		if (!distributor) {

			res.status(404);
			return res.json({ error: 'Distributor not found' });
		
		}
		await distributeur.destroy();
		res.status(204);
		return res.end();
	
	} catch (error) {

		res.status(400);
		return res.json({ error: error.message });
	
	}

};

// modify the Distributor
const modifyDistributor = async (req: Request, res: Response) => {

	try {

		let distributor = await distributeur.findByPk(req.params.id);
		if (!distributor) {

			res.status(404);
			return res.json({ error: 'Distributor not found' });
		
		}
		distributor = await distributeur.update(req.body);
		res.status(200);
		return res.json(distributor);
	
	} catch (error) {

		res.status(400);
		return res.json({ error: error.message });
	
	}

};



// assign one or more distributors to a client
const assignDistributorsToClient = async (req: Request, res: Response) => {

	const { clientId, distributorIds } = req.body;

	try {

		// get the client from the database
		const clientInstance = await client.findByPk(clientId);

		if (!clientInstance) {

			res.status(404);
			return res.json({ message: `Client with ID ${clientId} not found`, payload: {} });
		
		}

		// get the distributors from the database
		const distributorInstances = await distributeur.findAll({
			where: {
				id_distributeur: distributorIds,
			},
		});

		if (distributorInstances.length !== distributorIds.length) {

			res.status(400);
			return res.json({ message: 'One or more distributor IDs are invalid' });
		
		}

		// assign the distributors to the client
		await distributeur.update(
			{ id_client: clientId },
			{
				where: {
					id_distributeur: distributorIds,
				},
			},
		);

		res.status(200);
		return  res.json({ message: `Assigned distributors to client with ID ${clientId} successfully` });
	
	} catch (error) {

		console.log(error);
		res.status(500);
		return res.json({ message: error, payload: {} });
	
	}

};

export { createDistributor, deleteDistributor, modifyDistributor ,getAllDistributors ,getDistributor , assignDistributorsToClient };
