"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllDistributors = exports.modifyDistributor = exports.deleteDistributor = exports.createDistributor = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// get all the distributors
const getAllDistributors = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let distributors = yield prisma.distributeur.findMany();
        res.status(200).json(distributors);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error', error });
    }
});
exports.getAllDistributors = getAllDistributors;
// Get a distributor by ID
const getDistributor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const distributor = [];
        /* const distributor = await prisma.distributor.findUnique({
           where: {
             id: Number(id),
           },
         });
         */
        if (distributor) {
            res.status(200).json(distributor);
        }
        else {
            res.status(404).send('Distributor not found');
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});
// create the Distributor
const createDistributor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const form = req.body;
    try {
        // search if the distributor already exists
        //delete this after ...
        const existingdistributor = false;
        // const existingdistributor = await distributor.findOne({ email: form.email });
        if (existingdistributor) {
            console.log('email exists');
            // return error
        }
        else {
            // create the distributor
            // ...
            res.status(201).send('Distributor created successfully');
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});
exports.createDistributor = createDistributor;
// delete the Distributor
const deleteDistributor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const form = req.body;
    try {
        // search if the distributor already exists
        //delete this after ...
        const existingdistributor = false;
        // const existingdistributor = await distributor.findOne({ email: form.email });
        if (existingdistributor) {
            console.log('email exists');
            // return error
        }
        else {
            // create the distributor
            // ...
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});
exports.deleteDistributor = deleteDistributor;
// modify the Distributor
const modifyDistributor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const form = req.body;
    try {
        // search for the distributor by email
        //delete this after ...
        const existingdistributor = false;
        // const existingdistributor = await distributor.findOne({ email: form.email });
        if (existingdistributor) {
            // update the distributor
            // ...
        }
        else {
            console.log('email does not exist');
            // return error
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});
exports.modifyDistributor = modifyDistributor;
// assign one or more distributors to a client
const assignDistributorsToClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { clientId, distributorIds } = req.body;
    try {
        // get the client from the database
        const client = {};
        /*  const client = await prisma.client.findUnique({
             where: {
               id: clientId,
             },
           });
           */
        if (!client) {
            res.status(404).json({ message: `Client with ID ${clientId} not found` });
            return;
        }
        // get the distributors from the database
        const distributors = [];
        /*
        const distributors = await prisma.distributor.findMany({
          where: {
            id: {
              in: distributorIds,
            },
          },
        });
        */
        if (distributors.length !== distributorIds.length) {
            res.status(400).json({ message: 'One or more distributor IDs are invalid' });
            return;
        }
        // assign the distributors to the client
        /*await prisma.client.update({
          where: {
            id: clientId,
          },
          data: {
            distributors: {
              connect: distributors.map((distributor) => ({ id: distributor.id })),
            },
          },
        });
    */
        res.status(200).json({ message: `Assigned distributors to client with ID ${clientId} successfully` });
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});
//# sourceMappingURL=distributerController.js.map