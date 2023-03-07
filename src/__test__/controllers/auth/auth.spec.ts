import jwt from 'jsonwebtoken';
import { Authorization } from '../../../middelware/auth';

describe('Authorization middleware', () => {

	let req: any, res: any, next: any;

	beforeEach(() => {

		req = {
			header: () => 'Bearer token',
			user: {},
		};
		res = {
			status: jasmine.createSpy('status'),
			json: jasmine.createSpy('json'),
		};
    
		next = () => {

			console.log();
		
		};
	
	});

	it('should set req.user if token is valid and user has allowed role', async () => {

		const token = jwt.sign({ id: '123', role: 'admin' }, 'secret');
		const middleware = Authorization(['admin']);
		req.header = () => `Bearer ${token}`;

		await middleware(req, res, next);
		expect(req.user).toEqual({ id: '123', role: 'admin' });
	
	});

	it('should return 401 if no token is provided', async () => {

		const middleware = Authorization(['admin']);
		req.header = () => null;
		const statusSpy = spyOn(res, 'status').and.callThrough();

		await middleware(req, res, next);

		expect(statusSpy).toHaveBeenCalledWith(401);
	
	});

	it('should return 403 if user does not have allowed role', async () => {

		const token = jwt.sign({ id: '123', role: 'user' }, 'secret');
		const middleware = Authorization(['admin']);
		req.header = () => `Bearer ${token}`;
		const statusSpy = spyOn(res, 'status').and.callThrough();

		await middleware(req, res, next);

		expect(statusSpy).toHaveBeenCalledWith(403);
	
	});

	it('should return 401 if token is invalid', async () => {

		const middleware = Authorization(['admin']);
		req.header = () => 'Bearer invalid_token';
		const statusSpy = spyOn(res, 'status').and.callThrough();

		await middleware(req, res, next);

		expect(statusSpy).toHaveBeenCalledWith(401);
	
	});

});
