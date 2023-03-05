import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import sequelize from '../database/sequelizer';
import { Sequelize } from 'sequelize';
import admModel from '../models/adm.js';
import sadmModel from '../models/sadm.js';
import decideurModel from '../models/decideur.js';
import acModel from '../models/ac.js';
import amModel from '../models/am.js';

// Initialize the models
const adm = admModel(sequelize, Sequelize);
const sadm = sadmModel(sequelize, Sequelize);
const decideur = decideurModel(sequelize, Sequelize);
const ac = acModel(sequelize, Sequelize);
const am = amModel(sequelize, Sequelize);

/* @modify the where later --------------------*/

const login = async (req: Request, res: Response) => {
  console.log('-------------++++++++-----1');

  const { username, password, role } = req.body;

  // Find user by username
  let user;

  if (role === 'SuperAdmin') {
    user = await sadm.findByPk( username );
  console.log('-------------++++++++-----2 ',user);

    if (user) user.id = user.id_adm;
  } else if (role === 'Admin') {
    user = await adm.findByPk( username );
    if (user) user.id = user.id_adm;
  console.log('-------------++++++++-----2 ',user);

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
  console.log('-------------++++++++-----3 ' ,user);

  if (!user) {
    res.status(400);
  console.log('-------------++++++++-----4 ');
    
    return res.json({ error: 'Invalid credentials' });
  }
  console.log('-------------++++++++-----5 ');

  // Check password
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    res.status(400);

    return res.json({ error: 'Invalid credentials' });
  }

  // Create JWT
  const jwtSecret = process.env.JWT_SECRET as string;
  const token = jwt.sign({ id: user.id, role: req.body.role }, jwtSecret, { expiresIn: '1d' });
  res.status(200);
  return res.json({ token });
};

export { login };
