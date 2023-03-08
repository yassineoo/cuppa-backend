/* eslint-disable @typescript-eslint/no-namespace */
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import singlton from '../models/singlton';
import bcrypt from 'bcryptjs';
interface User {
  id: string;
  role: string;
}


declare global {
  namespace Express {
    interface Request {
      user: User;
    }
  }
}

const sadm = singlton.getSadm();
const adm = singlton.getAdm();
const ac = singlton.getAc();
const am = singlton.getAm();
const decideur = singlton.getDecideur();


const Authorization = (allowedRoles: string[]) => {

	return async (req: Request, res: Response, next: NextFunction) => {

		try {
     
			const token = req.header('Authorization')?.replace('Bearer ', '');


			
			if (!token) {

				res.status(401);
				return res.json({ error: 'Access denied. No token provided.' });
			
			}
   

			const decoded = jwt.verify(token,'secret') as User;
      
			req.user = {id:decoded.id,role:decoded.role};

			if (!allowedRoles.includes(decoded.role)) {

				res.status(403);
				return res.json({ error: 'Access denied. You are not authorized to access this resource.' });
			
			}

			next();
		
		} catch (error) {

			res.status(500);
			return res.json({ error: 'Access denied. Invalid token.' });
		
		}
	
	};

};

const login = async (req: Request, res: Response) => {

	const { username, password, role } = req.body;

	// Find user by username
	let user;

	if (role === 'SuperAdmin') {

		user = await sadm.findOne({ where: { username } });

		if (user) user.id = user.id_adm;
	
	} else if (role === 'Admin') {

		user = await adm.findOne({ where: { username } });
		if (user) user.id = user.id_adm;

	} else if (role === 'Commercial') {

		user = await ac.findOne({ where: { username } });
		if (user) user.id = user.id_ac;
	
	} else if (role === 'Maintenance') {

		user = await am.findOne({ where: { username } });
		if (user) user.id = user.id_am;

	} else if (role === 'Decider') {

		user = await decideur.findOne({ where: { username } });
		if (user) user.id = user.id_decideur;
	
	}

	if (!user) {

		res.status(400);
    
		return res.json({ error: 'Invalid credentials' });
	
	}

	// Check password
	const passwordMatch = await bcrypt.compare(password, user.password);
	if (!passwordMatch) {

		res.status(401);

		return res.json({ error: 'Invalid credentials' });
	
	}

	// Create JWT
	const jwtSecret = process.env.JWT_SECRET as string || 'secret';
	const token = jwt.sign({ id: user.id, role: req.body.role }, jwtSecret, { expiresIn: '1d' });
	res.status(200);
	return res.json({ token });

};
export {login ,Authorization};