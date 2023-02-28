import express, { Request, Response } from 'express';
import { createAdmin, deleteAdmin, modifyAdmin, getAllAdmins } from '../controllers/adminController';

const router = express.Router();


/**
 * @route   POST api/createAdmin
 * @desc    Create a new Admin
 * @access  SuperAdmin
 */

router.post('/createAdmin', createAdmin);

/**
 * @route   DELETE api/deleteAdmin/:id
 * @desc    Delete an Admin
 * @access  SuperAdmin
 */

router.delete('/deleteAdmin/:id',deleteAdmin);

/**
 * @route   PUT api/modifyAdmin/:id
 * @desc    Modify an Admin
 * @access  SuperAdmin
 */

router.put('/modifyAdmin/:id',modifyAdmin);

/**
 * @route   GET api/getAllAdmins
 * @desc    Get all Admins
 * @access  SuperAdmin
 */

router.get('/getAllAdmins', getAllAdmins);

export default router;
