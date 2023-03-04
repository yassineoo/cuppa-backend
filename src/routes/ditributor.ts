import express, { Request, Response } from 'express';
import { getAllDistributors,createDistributor, deleteDistributor, modifyDistributor } from '../controllers/distributerController';
import {login} from '../controllers/cummon'
import {Authorization} from '../middelware/auth'
const router = express.Router();






/**
 * @route   GET api/getAllDistributors
 * @desc    Get all Distributors
 * @access  SuperAdmin
 */
router.get('/getAllDistributors',getAllDistributors);


/**
 * @route   GET api/createDistributor
 * @desc    Create a new Distributor
 * @access  SuperAdmin
 */


router.post('/createDistributor',Authorization(['SuperAdmin']), createDistributor);

/**
 * @route   GET api/deleteDistributor
 * @desc    Delete a Distributor
 * @access  SuperAdmin
 */

router.delete('/deleteDistributor/:id',Authorization(['SuperAdmin']), deleteDistributor);

/**
 * @route   GET api/modifyDistributor
 * @desc    modify a  Distributor
 * @access  SuperAdmin
 */


router.put('/modifyDistributor/:id',Authorization(['SuperAdmin']), modifyDistributor);


/**
 * @route   POST api/login
 * @desc    Login a user and return a JWT token
 * @access  Public
*/

router.get('/kkk',(req:Request,res:Response)=> {console.log('hiiiiiiiiii');
res.status(200).json({hi:'jjj'});}
)
router.post('/login',login );

export default router;
