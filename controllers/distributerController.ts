import { Request, Response } from 'express';
//import distributor from '../prisma/distributor'; // import your distributor model here

//delete this after importing the real object
const distributor={}

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

export { createDistributor, deleteDistributor, modifyDistributor };
