import express from 'express';
import { createAdmin, deleteAdmin, modifyAdmin, getAllAdmins } from '../controllers/admin.Controller';
import {Authorization} from '../middelware/auth';

const router = express.Router();


/**
 * @route   POST api/createAdmin
 * @desc    Create a new Admin
 * @access  SuperAdmin
 */

router.post('/createAdmin',Authorization(['SuperAdmin']), createAdmin);

/**
 * @route   DELETE api/deleteAdmin/:id
 * @desc    Delete an Admin
 * @access  SuperAdmin
 */

router.delete('/deleteAdmin/:id',Authorization(['SuperAdmin']),deleteAdmin);

/**
 * @route   PUT api/modifyAdmin/:id
 * @desc    Modify an Admin
 * @access  SuperAdmin
 */

router.put('/modifyAdmin/:id',Authorization(['SuperAdmin']),modifyAdmin);

/**
 * @route   GET api/getAllAdmins
 * @desc    Get all Admins
 * @access  SuperAdmin
 */

router.get('/getAllAdmins',Authorization(['SuperAdmin']), getAllAdmins);

export default router;
