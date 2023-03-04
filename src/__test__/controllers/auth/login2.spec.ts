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
    spyOn(sadm, 'findByPk').and.returnValue({ id_adm: 'testuser', password: 'testpassword' });
    spyOn(bcrypt, 'compare').and.returnValue(Promise.resolve(true));
    spyOn(jwtLogin, 'sign').and.returnValue('testtoken');
  });

  it('should return a JWT token if credentials are valid', async () => {
    await login(req, res);

    expect(bcrypt.compare).toHaveBeenCalledWith('testpassword', 'testpassword');
    expect(sadm.findByPk).toHaveBeenCalledWith('testuser');
    expect(jwtLogin.sign).toHaveBeenCalledWith({ id: 'testuser', role: 'Admin' }, 'secret', { expiresIn: '1d' });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ token: 'testtoken' });
  });

  it('should return an error if credentials are invalid', async () => {
    spyOn(bcrypt, 'compare').and.returnValue(Promise.resolve(false));

    await login(req, res);

    expect(bcrypt.compare).toHaveBeenCalledWith('testpassword', 'testpassword');
    expect(sadm.findByPk).toHaveBeenCalledWith('testuser');
    expect(jwtLogin.sign).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid credentials' });
  });
});
