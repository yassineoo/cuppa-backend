import { Request, Response } from 'express';

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// get all the distributors
const getAllDistributors = async (req: Request, res: Response): Promise<void> => {
  try {
    let distributors = await prisma.distributeur.findMany();
    
    res.status(200).json(distributors);
  } catch (error) {
    console.log(error);
    res.status(500).json({message:'Internal server error',error});

  }
}


// Get a distributor by ID
const getDistributor = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const distributor=[];
   /* const distributor = await prisma.distributor.findUnique({
      where: {
        id: Number(id),
      },
    });
    */
    if (distributor) {
      res.status(200).json(distributor);
    } else {
      res.status(404).send('Distributor not found');
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};



// create the Distributor
const createDistributor = async (req: Request, res: Response): Promise<void> => {
  const form = req.body;
  try {
    // search if the distributor already exists
    //delete this after ...
    const existingdistributor = false
   // const existingdistributor = await distributor.findOne({ email: form.email });
    if (existingdistributor) {
      console.log('email exists');
      // return error
    } else {
      // create the distributor
      // ...
    res.status(201).send('Distributor created successfully');

    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// delete the Distributor
const deleteDistributor = async (req: Request, res: Response): Promise<void> => {
  const form = req.body;
  try {
    // search if the distributor already exists
  //delete this after ...
  const existingdistributor = false
  // const existingdistributor = await distributor.findOne({ email: form.email });
    if (existingdistributor) {
      console.log('email exists');
      // return error
    } else {
      // create the distributor
      // ...
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// modify the Distributor
const modifyDistributor = async (req: Request, res: Response): Promise<void> => {
  const form = req.body;
  try {
    // search for the distributor by email
 //delete this after ...
 const existingdistributor = false
 // const existingdistributor = await distributor.findOne({ email: form.email });
    if (existingdistributor) {
      // update the distributor
      // ...
    } else {
      console.log('email does not exist');
      // return error
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};



// assign one or more distributors to a client
const assignDistributorsToClient = async (req: Request, res: Response): Promise<void> => {
  const { clientId, distributorIds } = req.body;

  try {
    // get the client from the database
   const  client={};
 /*  const client = await prisma.client.findUnique({
      where: {
        id: clientId,
      },
    });
    */

    if (!client) {
      res.status(404).json({ message: `Client with ID ${clientId} not found` });
      return;
    }

    // get the distributors from the database
    const distributors=[]
    /*
    const distributors = await prisma.distributor.findMany({
      where: {
        id: {
          in: distributorIds,
        },
      },
    });
    */

    if (distributors.length !== distributorIds.length) {
      res.status(400).json({ message: 'One or more distributor IDs are invalid' });
      return;
    }

    // assign the distributors to the client
    /*await prisma.client.update({
      where: {
        id: clientId,
      },
      data: {
        distributors: {
          connect: distributors.map((distributor) => ({ id: distributor.id })),
        },
      },
    });
*/
    res.status(200).json({ message: `Assigned distributors to client with ID ${clientId} successfully` });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};


export { createDistributor, deleteDistributor, modifyDistributor ,getAllDistributors };
