import { Request,Response } from 'express';
//const sequelize =require('../database/sequelizer.js');
import sequelize  from '../database/sequelizer';

import { Sequelize } from 'sequelize';
import  DistributeurModel  from '../models/distributeur.js';
import  ClientModel  from '../models/client.js';


// Initialize the models
const distributeur = DistributeurModel(sequelize, Sequelize);
const client = ClientModel(sequelize, Sequelize);


// get all the distributors
const getAllDistributors = async (req: Request, res: Response) => {
  try {
    const distributors = await distributeur.findAll();
    res.status(200).json(distributors);
  } catch (error) {
    res.status(400).json({ error: error.message });
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
    res.status(201).json(distributor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
// delete the Distributor
const deleteDistributor =async (req: Request, res: Response) => {
  try {
    const distributor = await distributeur.findByPk(req.params.id);
    if (!distributor) {
      return res.status(404).json({ error: 'Distributor not found' });
    }
    await distributeur.destroy();
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// modify the Distributor
const modifyDistributor = async (req: Request, res: Response) => {
  try {
    const distributor = await distributeur.findByPk(req.params.id);
    if (!distributor) {
      return res.status(404).json({ error: 'Distributor not found' });
    }
    await distributeur.update(req.body);
    res.status(200).json(distributor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}



// assign one or more distributors to a client
const assignDistributorsToClient = async (req: Request, res: Response): Promise<void> => {
  const { clientId, distributorIds } = req.body;

  try {
    // get the client from the database
    const clientInstance = await client.findByPk(clientId);

    if (!clientInstance) {
      res.status(404).json({ message: `Client with ID ${clientId} not found`, payload: {} });
      return;
    }

    // get the distributors from the database
    const distributorInstances = await distributeur.findAll({
      where: {
        id_distributeur: distributorIds,
      },
    });

    if (distributorInstances.length !== distributorIds.length) {
      res.status(400).json({ message: 'One or more distributor IDs are invalid' });
      return;
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

    res.status(200).json({ message: `Assigned distributors to client with ID ${clientId} successfully` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error, payload: {} });
  }
};

export { createDistributor, deleteDistributor, modifyDistributor ,getAllDistributors ,getDistributor , assignDistributorsToClient };
