import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

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

export const Authorization = (allowedRoles: string[]) => {
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
