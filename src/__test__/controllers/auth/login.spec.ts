

import { Request, Response } from 'express';
import { login } from '../../../middelware/auth';
import jwtLogin from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import Singlton from '../../../models/singlton';
// Initialize the models
const sadm = Singlton.getSadm();



const req: Partial<Request> = {
	body: {
		username: 'testuser',
		password: 'testpassword',
		role: 'SuperAdmin',
	},
};

const res: Partial<Response> = {
	status: jasmine.createSpy('status'),
	json: jasmine.createSpy('json'),
};

describe('login', () => {



	it('should return a JWT token if credentials are valid', async () => {

		spyOn(sadm, 'findByPk').and.returnValue({ id_adm: 'testuser', password: 'testpassword' });
		spyOn(bcrypt, 'compare').and.returnValue(Promise.resolve(true));
		spyOn(jwtLogin, 'sign').and.returnValue('testtoken');
		await login(req as Request, res as Response);

		expect(bcrypt.compare).toHaveBeenCalledWith('testpassword', 'testpassword');
		expect(sadm.findByPk).toHaveBeenCalledWith('testuser');
		expect(jwtLogin.sign).toHaveBeenCalledWith({ id: 'testuser', role: 'SuperAdmin' }, 'secret', { expiresIn: '1d' });
		expect(res.status).toHaveBeenCalledWith(200);
		expect(res.json).toHaveBeenCalledWith({ token: 'testtoken' });
	
	});

	it('should return an error if credentials are invalid', async () => {

		spyOn(sadm, 'findByPk').and.returnValue(null);

		await login(req as Request, res as Response);

		expect(res.status).toHaveBeenCalledWith(400);
		expect(res.json).toHaveBeenCalledWith({ error: 'Invalid credentials' });
	
	});
	it('should return an error if credentials are invalid (password is wrong)', async () => {

		spyOn(sadm, 'findByPk').and.returnValue({ id_adm: 'testuser', password: 'theTruePassword' });
		spyOn(bcrypt, 'compare').and.returnValue(Promise.resolve(false));

		await login(req as Request, res as Response);

		expect(bcrypt.compare).toHaveBeenCalledWith('testpassword', 'theTruePassword');
		expect(sadm.findByPk).toHaveBeenCalledWith('testuser');
		expect(res.status).toHaveBeenCalledWith(401);
		expect(res.json).toHaveBeenCalledWith({ error: 'Invalid credentials' });
	
	});

});












