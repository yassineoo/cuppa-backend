import express, { Request, Response } from 'express';
import { getAllDistributors,createDistributor, deleteDistributor, modifyDistributor } from '../controllers/distributerController';

const router = express.Router();






/**
 * @route   GET api/getAllDistributors
 * @desc    Get all Distributors
 * @access  SuperAdmin
 */
router.get('/',(req:Request,res:Response)=>{console.log('hi');
});
router.get('/getAllDistributors',getAllDistributors);


/**
 * @route   GET api/createDistributor
 * @desc    Create a new Distributor
 * @access  SuperAdmin
 */


router.post('/createDistributor', createDistributor);

/**
 * @route   GET api/deleteDistributor
 * @desc    Delete a Distributor
 * @access  SuperAdmin
 */

router.delete('/deleteDistributor/:id', deleteDistributor);

/**
 * @route   GET api/modifyDistributor
 * @desc    modify a  Distributor
 * @access  SuperAdmin
 */


router.put('/modifyDistributor/:id', modifyDistributor);

export default router;
