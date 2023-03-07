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

				return res.status(401).send({ error: 'Access denied. No token provided.' });
			
			}
   

			const decoded = jwt.verify(token,'secret') as User;
      
			req.user = {id:decoded.id,role:decoded.role};

			if (!allowedRoles.includes(decoded.role)) {

				return res.status(403).send({ error: 'Access denied. You are not authorized to access this resource.' });
			
			}

			next();
		
		} catch (error) {

			return res.status(401).send({ error: 'Access denied. Invalid token.' });
		
		}
	
	};

};

const login = async (req: Request, res: Response) => {

	const { username, password, role } = req.body;

	// Find user by username
	let user;

	if (role === 'SuperAdmin') {

		user = await sadm.findByPk( username );

		if (user) user.id = user.id_adm;
	
	} else if (role === 'Admin') {

		user = await adm.findByPk( username );
		if (user) user.id = user.id_adm;

	} else if (role === 'Commercial') {

		user = await ac.findByPk(username );
		if (user) user.id = user.id_ac;
	
	} else if (role === 'Maintenance') {

		user = await am.findByPk(username );
		if (user) user.id = user.id_am;

	} else if (role === 'Decider') {

		user = await decideur.findByPk( username );
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