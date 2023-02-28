"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const distributerController_1 = require("../controllers/distributerController");
const router = express_1.default.Router();
/**
 * @route   GET api/getAllDistributors
 * @desc    Get all Distributors
 * @access  SuperAdmin
 */
router.get('/', (req, res) => {
    console.log('hi');
});
router.get('/getAllDistributors', distributerController_1.getAllDistributors);
/**
 * @route   GET api/createDistributor
 * @desc    Create a new Distributor
 * @access  SuperAdmin
 */
router.post('/createDistributor', distributerController_1.createDistributor);
/**
 * @route   GET api/deleteDistributor
 * @desc    Delete a Distributor
 * @access  SuperAdmin
 */
router.delete('/deleteDistributor/:id', distributerController_1.deleteDistributor);
/**
 * @route   GET api/modifyDistributor
 * @desc    modify a  Distributor
 * @access  SuperAdmin
 */
router.put('/modifyDistributor/:id', distributerController_1.modifyDistributor);
exports.default = router;
//# sourceMappingURL=ditributor.js.map