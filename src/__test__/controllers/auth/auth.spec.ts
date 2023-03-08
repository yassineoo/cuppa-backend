import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Authorization } from '../../../middelware/auth'  ;

describe('Authorization function', () => {

	let mockRequest: Partial<Request>;
	let mockResponse: Partial<Response>;
	let mockNext: jasmine.Spy;
	const mockUser = {
		id: '123',
		role: 'Admin',
	};
	const mockToken = jwt.sign(mockUser, 'secret');

	beforeEach(() => {

		mockRequest = {};
		mockResponse = {
			status: jasmine.createSpy('status'),
			json: jasmine.createSpy('json'),
		};
		mockNext = jasmine.createSpy('next');
		
	
	});

	it('should call next if the token is valid and the user has the allowed role', async () => {

		spyOn(jwt, 'verify').and.returnValue(mockUser);
		mockRequest.header = jasmine.createSpy('header').and.returnValue(`Bearer ${mockToken}`);
		const allowedRoles = ['Admin'];

		const middleware = Authorization(allowedRoles);
		await middleware(mockRequest as Request, mockResponse as Response, mockNext as NextFunction);

		expect(mockRequest.user).toEqual(mockUser);
		expect(mockNext).toHaveBeenCalled();
	
	});

	it('should return an error if the token is missing', async () => {

		mockRequest.header = jasmine.createSpy('header').and.returnValue(null);
		const allowedRoles = ['Admin'];

		const middleware = Authorization(allowedRoles);
		await middleware(mockRequest as Request, mockResponse as Response, mockNext as NextFunction);

		expect(mockResponse.status).toHaveBeenCalledWith(401);
		expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Access denied. No token provided.' });
	
	});

	it('should return an error if the token is invalid', async () => {

		mockRequest.header = jasmine.createSpy('header').and.returnValue('Bearer invalid-token');
		const allowedRoles = ['Admin'];

		const middleware = Authorization(allowedRoles);
		await middleware(mockRequest as Request, mockResponse as Response, mockNext as NextFunction);

		expect(mockResponse.status).toHaveBeenCalledWith(500);
		expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Access denied. Invalid token.' });
	
	});

	it('should return an error if the user does not have the allowed role', async () => {

		mockRequest.header = jasmine.createSpy('header').and.returnValue(`Bearer ${mockToken}`);
		const allowedRoles = ['SuperAdmin'];

		const middleware = Authorization(allowedRoles);
		await middleware(mockRequest as Request, mockResponse as Response, mockNext as NextFunction);

		expect(mockResponse.status).toHaveBeenCalledWith(403);
		expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Access denied. You are not authorized to access this resource.' });
	
	});

});
