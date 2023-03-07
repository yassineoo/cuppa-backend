import express from 'express';
import { createAccount, deleteAccount, modifyAccount,getAccounts } from '../controllers/account.Controller';
import {Authorization} from '../middelware/auth';

const router = express.Router();


/**

@route POST api/getAccounts
@desc get All Accounts
@access Admin
*/
router.get('/getAccounts/:role',Authorization(['Admin']), getAccounts);

/**

@route POST api/createAccount
@desc Create a new Account
@access Admin
*/
router.post('/createAccount/:role',Authorization(['Admin']), createAccount);
/**

@route DELETE api/deleteAccount/:id
@desc Delete a Account by id
@access Admin
*/
router.delete('/deleteAccount/:role/:id',Authorization(['Admin']), deleteAccount);
/**

@route PUT api/modifyAccount/:id
@desc Modify a Account by id
@access Admin
*/
router.put('/modifyAccount/:id',Authorization(['Admin','Commercial','Maintenance','Decider']), modifyAccount);


export default router;