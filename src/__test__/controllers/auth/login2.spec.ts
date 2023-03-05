

import { Request, Response } from 'express';
const { login } = require('../../../controllers/cummon');
const jwtLogin = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const sequelizeTestHelpers = require('sequelize-test-helpers');

const admModel = require('../../../models/adm.js');
const sadmModel = require('../../../models/sadm.js');
const decideurModel = require('../../../models/decideur.js');
const acModel = require('../../../models/ac.js');
const amModel = require('../../../models/am.js');
const sequelize =require('../../../database/sequelizerr.js');

const { Sequelize } = require('sequelize');
console.log(sequelize.define);

// Initialize the models
const adm = admModel(sequelize, Sequelize);
const sadm = sadmModel(sequelize, Sequelize);
const decideur = decideurModel(sequelize, Sequelize);
const ac = acModel(sequelize, Sequelize);
const am = amModel(sequelize, Sequelize);

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
  beforeEach(() => {

  });


  it('should return a JWT token if credentials are valid', async () => {
    spyOn(sadm, 'findByPk').and.returnValue({ id_adm: 'testuser', password: 'testpassword' });
    spyOn(bcrypt, 'compare').and.returnValue(Promise.resolve(true));
    spyOn(jwtLogin, 'sign').and.returnValue('testtoken');
    let user = await sadm.findByPk( 'testuser' );
    console.log('-------------++++++++-----llll ',user );
    await login(req as Request, res as Response);

    expect(bcrypt.compare).toHaveBeenCalledWith('testpassword', 'testpassword');
    expect(sadm.findByPk).toHaveBeenCalledWith('testuser');
    expect(jwtLogin.sign).toHaveBeenCalledWith({ id: 'testuser', role: 'SuperAdmin' }, 'secret', { expiresIn: '1d' });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ token: 'testtoken' });
  });

 /* it('should return an error if credentials are invalid', async () => {
    spyOn(bcrypt, 'compare').and.returnValue(Promise.resolve(false));

    await login(req, res);

    expect(bcrypt.compare).toHaveBeenCalledWith('testpassword', 'testpassword');
    expect(sadm.findByPk).toHaveBeenCalledWith('testuser');
    expect(jwtLogin.sign).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid credentials' });
  });
  */
});












const login2 = async (req: Request, res: Response) => {
  console.log('-------------++++++++-----1');

  const { username, password, role } = req.body;

  // Find user by username
  let user;

  if (role === 'SuperAdmin') {
    user = await sadm.findByPk( username );
  console.log('-------------++++++++-----2 ',user ,username);

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
    res.status(400);

    return res.json({ error: 'Invalid credentials' });
  }

  // Create JWT
  const jwtSecret = process.env.JWT_SECRET as string || 'secret';
  const token = jwtLogin.sign({ id: user.id, role: req.body.role }, jwtSecret, { expiresIn: '1d' });
  res.status(200);
  return res.json({ token });
};