import express, { Request, Response } from 'express';
import { createDecider, deleteDecider, modifyDecider } from '../controllers/deciderController';
import { createCommercial, deleteCommercial, modifyCommercial } from '../controllers/commercialController';
import { createMaintenance, deleteMaintenance, modifyMaintenance } from '../controllers/maintenanceController';

const router = express.Router();
/**

@route POST api/createDecider
@desc Create a new Decider
@access Admin
*/
router.post('/createDecider', createDecider);
/**

@route DELETE api/deleteDecider/:id
@desc Delete a Decider by id
@access Admin
*/
router.delete('/deleteDecider/:id', deleteDecider);
/**

@route PUT api/modifyDecider/:id
@desc Modify a Decider by id
@access Admin
*/
router.put('/modifyDecider/:id', modifyDecider);
/**

@route POST api/createCommercial
@desc Create a new Commercial
@access Admin
*/
router.post('/createCommercial', createCommercial);
/**

@route DELETE api/deleteCommercial/:id
@desc Delete a Commercial by id
@access Admin
*/
router.delete('/deleteCommercial/:id', deleteCommercial);
/**

@route PUT api/modifyCommercial/:id
@desc Modify a Commercial by id
@access Admin
*/
router.put('/modifyCommercial/:id', modifyCommercial);
/**

@route POST api/createMaintenance
@desc Create a new Maintenance
@access Admin
*/
router.post('/createMaintenance', createMaintenance);
/**

@route DELETE api/deleteMaintenance/:id
@desc Delete a Maintenance by id
@access Admin
*/
router.delete('/deleteMaintenance/:id', deleteMaintenance);
/**

@route PUT api/modifyMaintenance/:id
@desc Modify a Maintenance by id
@access Admin
*/
router.put('/modifyMaintenance/:id', modifyMaintenance);
export default router;