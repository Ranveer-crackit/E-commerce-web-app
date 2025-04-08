import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed });
    // const newUser = new User({ name, email, password: hashed });
    // await newUser.save(); create = new + save in database

    res.status(201).json(user);
  } catch {
    res.status(400).json({ message: 'User already exists' });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET
  );//like in middlewares we send payload with the secret key on server so we are developing the signature here
  res.json({ token });
  //therefore when the user do login then again jwt secret key is send
};
