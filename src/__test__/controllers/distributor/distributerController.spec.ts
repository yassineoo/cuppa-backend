import { Request, Response } from 'express';
import { assignDistributorsToClient, createDistributor, deleteDistributor, getAllDistributors, modifyDistributor } from '../../../controllers/distributor.Controller';
import Singlton from '../../../models/singlton';
// Initialize the models
const distributeur = Singlton.getDistributeur();
const client = Singlton.getClient();

const req: Partial<Request> = {};
const res: Partial<Response> = {
	status: jasmine.createSpy('status'),
	json: jasmine.createSpy('json'),
	end : jasmine.createSpy('end')
};

describe('getAllDistributors', () => {

	it('should return all distributors with status 200', async () => {

		spyOn(distributeur, 'findAll').and.returnValue(Promise.resolve(['Distributor 1', 'Distributor 2']));

		await getAllDistributors(req as Request, res as Response);

		expect(distributeur.findAll).toHaveBeenCalled();
		expect(res.status).toHaveBeenCalledWith(200);
		expect(res.json).toHaveBeenCalledWith(['Distributor 1', 'Distributor 2']);
	
	});

	it('should return an error with status 400 if an error occurs', async () => {

		spyOn(distributeur, 'findAll').and.returnValue(Promise.reject(new Error('Test Error')));

		await getAllDistributors(req as Request, res as Response);

		expect(distributeur.findAll).toHaveBeenCalled();
		expect(res.status).toHaveBeenCalledWith(400);
		expect(res.json).toHaveBeenCalledWith({ error: 'Test Error' });
	
	});

});
describe('createDistributor', () => {

	let req: Request;
	let res: Response;

	beforeEach(() => {

		req = {} as Request;
		res = {
			status: jasmine.createSpy('status'),
			json: jasmine.createSpy('json')
		} as unknown as Response;
	
	});

	it('should create a distributor and return it', async () => {

		// Arrange
		const distributorData = {
			name: 'Test Distributor',
			email: 'test@distributor.com',
			phone: '1234567890'
		};
		const createdDistributor = {
			id: 1,
			...distributorData
		};
		spyOn(distributeur, 'create').and.returnValue(createdDistributor);
		req.body = distributorData;

		// Act
		await createDistributor(req, res);

		// Assert
		expect(distributeur.create).toHaveBeenCalledWith(distributorData);
		expect(res.status).toHaveBeenCalledWith(201);
		expect(res.json).toHaveBeenCalledWith(createdDistributor);
	
	});

	it('should return a 400 error response if the request body is invalid', async () => {

		// Arrange
		const errorMessage = 'Invalid request body';
		spyOn(distributeur, 'create').and.throwError(errorMessage);
		req.body = {};

		// Act
		await createDistributor(req, res);

		// Assert
		expect(distributeur.create).toHaveBeenCalledWith(req.body);
		expect(res.status).toHaveBeenCalledWith(400);
		expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
	
	});

});



describe('deleteDistributor', () => {

	it('should delete the distributor with the given ID and return status 204', async () => {

		const mockDistributor = {
			id: 1,
			name: 'Test Distributor',
			email: 'test@distributor.com',
		};

		spyOn(distributeur, 'findByPk').and.returnValue(mockDistributor);
		spyOn(distributeur, 'destroy').and.returnValue(Promise.resolve());

		const req = { params: { id: 1 } } as unknown as Request;
		const res = {
			status: jasmine.createSpy(),
			json: jasmine.createSpy(),
			end: jasmine.createSpy(),
		} as unknown as Response;

		await deleteDistributor(req, res);

		expect(distributeur.findByPk).toHaveBeenCalledWith(1);
		expect(distributeur.destroy).toHaveBeenCalled();
		expect(res.status).toHaveBeenCalledWith(204);
		expect(res.end).toHaveBeenCalled();
	
	});

	it('should return 404 and an error message if the distributor is not found', async () => {

		spyOn(distributeur, 'findByPk').and.returnValue(null);

		const req = { params: { id: 1 } } as unknown as Request;
    
		await deleteDistributor(req as Request, res as Response);

		expect(distributeur.findByPk).toHaveBeenCalledWith(1);
		expect(res.status).toHaveBeenCalledWith(404);
		expect(res.json).toHaveBeenCalledWith({
			error: 'Distributor not found',
		});
	
	});

	it('should return 400 and the error message if an error occurs', async () => {

		const errorMessage = 'Something went wrong';
		spyOn(distributeur, 'findByPk').and.throwError(errorMessage);

		const req = { params: { id: 1 } } as unknown  as Request;
		const res = {
			status: jasmine.createSpy(),
			json: jasmine.createSpy()
		} as unknown as Response;

		await deleteDistributor(req, res);

		expect(distributeur.findByPk).toHaveBeenCalledWith(1);
		expect(res.status).toHaveBeenCalledWith(400);
		expect(res.json).toHaveBeenCalledWith({
			error: errorMessage,
		});
	
	});

});

describe('modifyDistributor', () => {

	it('should modify an existing distributor', async () => {

		const mockDistributor = {
			id: 1,
			name: 'Distributor 1',
			location: 'Location 1'
		};

		const mockUpdatedDistributor = {
			id: 1,
			name: 'Updated Distributor',
			location: 'Updated Location'
		};

		// Mock the findByPk and update methods
		spyOn(distributeur, 'findByPk').and.returnValue(mockDistributor);
		spyOn(distributeur, 'update').and.returnValue(mockUpdatedDistributor);

		const req = {
			params: { id: 1 },
			body: mockUpdatedDistributor
		};

		const res = {
			status: jasmine.createSpy(),
			json: jasmine.createSpy()
		};

		await modifyDistributor(req as unknown as Request, res as unknown as Response);

		// Expectations
		expect(distributeur.findByPk).toHaveBeenCalledWith(1);
		expect(distributeur.update).toHaveBeenCalledWith(mockUpdatedDistributor);
		expect(res.status).toHaveBeenCalledWith(200);
		expect(res.json).toHaveBeenCalledWith(mockUpdatedDistributor);
	
	});

	it('should return 404 error for non-existing distributor', async () => {

		spyOn(distributeur, 'findByPk').and.returnValue(null);

		const req = {
			params: { id: 1 },
			body: {}
		};

		const res = {
			status: jasmine.createSpy(),json: jasmine.createSpy()
		};

		await modifyDistributor(req as unknown as Request, res as unknown as Response);

		// Expectations
		expect(distributeur.findByPk).toHaveBeenCalledWith(1);
		expect(res.status).toHaveBeenCalledWith(404);
		expect(res.json).toHaveBeenCalledWith({ error: 'Distributor not found' });
	
	});

	it('should return 400 error for invalid input', async () => {

		const mockDistributor = {
			id: 1,
			name: 'Distributor 1',
			location: 'Location 1'
		};

		spyOn(distributeur, 'findByPk').and.returnValue(mockDistributor);
		spyOn(distributeur, 'update').and.throwError('Invalid input');

		const req = {
			params: { id: 1 },
			body: {}
		};

		const res = {
			status: jasmine.createSpy(),
			json: jasmine.createSpy()
		};

		await modifyDistributor(req as unknown as Request, res as unknown as Response);

		// Expectations
		expect(distributeur.findByPk).toHaveBeenCalledWith(1);
		expect(distributeur.update).toThrowError('Invalid input');
		expect(res.status).toHaveBeenCalledWith(400);
		expect(res.json).toHaveBeenCalledWith({ error: 'Invalid input' });
	
	});

});


describe('assignDistributorsToClient', () => {

	it('should assign distributors to an existing client', async () => {

		const mockClient = {
			id: 1,
			name: 'Client 1'
		};

		const mockDistributors = [      {        id: 1,        name: 'Distributor 1'      },      {        id: 2,        name: 'Distributor 2'      }    ];

		const mockRequestBody = {
			clientId: 1,
			distributorIds: [1, 2]
		};

		// Mock the findByPk, findAll and update methods
		spyOn(client, 'findByPk').and.returnValue(mockClient);
		spyOn(distributeur, 'findAll').and.returnValue(mockDistributors);
		spyOn(distributeur, 'update');

		const req = {
			body: mockRequestBody
		};

		const res = {
			status: jasmine.createSpy(),
			json: jasmine.createSpy()
		};

		await assignDistributorsToClient(req as unknown as Request, res as unknown as Response);

		// Expectations
		expect(client.findByPk).toHaveBeenCalledWith(1);
		expect(distributeur.findAll).toHaveBeenCalledWith({
			where: {
				id_distributeur: [1, 2]
			}
		});
		expect(distributeur.update).toHaveBeenCalledWith(
			{ id_client: 1 },
			{
				where: {
					id_distributeur: [1, 2]
				},
			},
		);
    
		expect(res.status).toHaveBeenCalledWith(200);
		expect(res.json).toHaveBeenCalledWith({ message: 'Assigned distributors to client with ID 1 successfully' });
	
	});

	it('should return 404 error for non-existing client', async () => {

		spyOn(client, 'findByPk').and.returnValue(null);

		const req = {
			body: {
				clientId: 1,
				distributorIds: [1, 2]
			}
		};

		const res = {
			status: jasmine.createSpy(),
			json: jasmine.createSpy()
		};

		await assignDistributorsToClient(req as unknown as Request, res as unknown as Response);

		// Expectations
		expect(client.findByPk).toHaveBeenCalledWith(1);
		expect(res.status).toHaveBeenCalledWith(404);
		expect(res.json).toHaveBeenCalledWith({ message: 'Client with ID 1 not found', payload: {} });
	
	});

	it('should return 400 error for invalid distributor IDs', async () => {

		const mockClient = {
			id: 1,
			name: 'Client 1'
		};

		const mockDistributors = [ {   id: 1,        name: 'Distributor 1'      }    ];

		const mockRequestBody = {
			clientId: 1,
			distributorIds: [1, 2]
		};

		spyOn(client, 'findByPk').and.returnValue(mockClient);
		spyOn(distributeur, 'findAll').and.returnValue(mockDistributors);

		const req = {
			body: mockRequestBody
		};

		const res = {
			status: jasmine.createSpy(),
			json: jasmine.createSpy()
		};

		await assignDistributorsToClient(req as unknown as Request, res as unknown as Response);

		// Expectations
		expect(client.findByPk).toHaveBeenCalledWith(1);
		expect(distributeur.findAll).toHaveBeenCalledWith({
			where: {
				id_distributeur: [1, 2]
			}
		});
		expect(res.status).toHaveBeenCalledWith(400);
		expect(res.json).toHaveBeenCalledWith({ message: 'One or more distributor IDs are invalid' });
	
	});

});

