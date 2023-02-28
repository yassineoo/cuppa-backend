import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client'

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

//delete this after importing the real object


// get all the Admins
const getAllAdmins = async (req: Request, res: Response): Promise<void> => {
    try {
      // find all the admins
      // delete this after ...
      const allAdmins = await prisma.admin.findMany()
      res.status(200).json(allAdmins);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  };




// create the Admin
const createAdmin = async (req: Request, res: Response): Promise<void> => {
const form = req.body;
try {
// search if the admin already exists
const existingAdmin = await prisma.admin.findOne({ email: form.email });
if (existingAdmin) {
console.log('email exists');
// return error
} else {
// create the admin
// ...
}
} catch (error) {
console.log(error);
res.status(500).json(error);
}
};

// delete the Admin
const deleteAdmin = async (req: Request, res: Response): Promise<void> => {
const form = req.body;
try {
// search if the admin exists
const existingAdmin = await prisma.admin.findOne({ email: form.email });
if (existingAdmin) {
console.log('email exists');
// return error
} else {
// delete the admin
// ...
}
} catch (error) {
console.log(error);
res.status(500).json(error);
}
};

// modify the Admin
const modifyAdmin = async (req: Request, res: Response): Promise<void> => {
const form = req.body;
try {
// search for the admin by email
const existingAdmin = await prisma.findOne({ email: form.email });
if (existingAdmin) {
// update the admin
// ...
} else {
console.log('email does not exist');
// return error
}
} catch (error) {
console.log(error);
res.status(500).json(error);
}
};









/**
 * @route   POST api/login
 * @desc    Login a user and return a JWT token
 * @access  Public
 */

const login =  async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true, email: true, password: true, role: true },
    });

    if (!user) {
      return res.status(401).send('Invalid email or password');
    }

    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).send('Invalid email or password');
    }

    // Create a JWT token with the user ID and role
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET!, {
      expiresIn: '1h', // Set the token to expire in 1 hour
    });

    res.status(200).json({ token });

  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error');
  }
};








export { createAdmin, deleteAdmin, modifyAdmin ,getAllAdmins};