import { Request, Response } from 'express';
//import { PrismaClient } from '@prisma/client';

//const prisma = new PrismaClient();
const prisma ={}

// Create a Decider
const createDecider = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password } = req.body;
  try {
   /* const decider = await prisma.decider.create({
      data: {
        name,
        email,
        password,
      },
    });
    */
   // res.status(201).json({ message: 'Decider created successfully', decider });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// Delete a Decider
const deleteDecider = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
   /* const decider = await prisma.decider.delete({
      where: {
        id: Number(id),
      },
    });
    
    res.status(200).json({ message: 'Decider deleted successfully', decider });
*/
} catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// Modify a Decider
const modifyDecider = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  try {
   /* const updatedDecider = await prisma.decider.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
        email,
        password,
      },
    });
    
    res.status(200).json({ message: 'Decider updated successfully', decider: updatedDecider });
*/  
} catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// Get all Deciders
const getAllDeciders = async (req: Request, res: Response): Promise<void> => {
  try {
   /* const deciders = await prisma.decider.findMany();
    res.status(200).json(deciders);
    */
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export { createDecider, deleteDecider, modifyDecider, getAllDeciders };

