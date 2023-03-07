import express from 'express';
import { getAllDistributors,createDistributor, deleteDistributor, modifyDistributor } from '../controllers/distributor.Controller';
import {login ,Authorization } from '../middelware/auth';
const router = express.Router();






/**
 * @route   GET api/getAllDistributors
 * @desc    Get all Distributors
 * @access  SuperAdmin
 */
router.get('/getAllDistributors',Authorization(['SuperAdmin']),getAllDistributors);

/**
 * @route   GET api/getAllDistributors
 * @desc    Get all Distributors
 * @access  SuperAdmin,Admin,Decider,Commercial,Maintenance
 */
router.get('/getMyDistributors/:id',Authorization(['SuperAdmin,Admin,Decider,Commercial,Maintenance']),getAllDistributors);


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

router.post('/login',login );

export default router;
