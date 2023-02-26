import express, { Request, Response } from 'express';
import { createDistributor, deleteDistributor, modifyDistributor } from '../controllers/distributerController';

const router = express.Router();

router.post('/createDistributor', async (req: Request, res: Response) => {
  try {
    await createDistributor(req, res);
    res.status(201).send('Distributor created successfully');
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error');
  }
});

router.delete('/deleteDistributor', async (req: Request, res: Response) => {
  try {
    await deleteDistributor(req, res);
    res.status(200).send('Distributor deleted successfully');
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error');
  }
});

router.put('/modifyDistributor', async (req: Request, res: Response) => {
  try {
    await modifyDistributor(req, res);
    res.status(200).send('Distributor modified successfully');
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error');
  }
});

export default router;
