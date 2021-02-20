import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

import { User } from '../database/models';

config();

class Auth {
  async signup(req, res) {
    let { name, email, password } = req.body;
    const checkEmail = await User.findOne({ where: { email } });

    if (checkEmail)
      return res.status(400).json({
        error: 'Email Already in use by another account',
      });

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    password = hash;

    const newUser = {
      name,
      email,
      password,
    };

    const user = await User.create(newUser);

    const token = jwt.sign(newUser, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.status(200).json({
      message: 'User Registered Successfully',
      token,
      user,
    });
  }

  async login(req, res) {
    const { email, password } = req.body;
    const checkUser = await User.findOne({ where: { email } });
    if (!checkUser)
      return res.status(400).json({
        error: 'User Does not Exists',
      });

    const checkPasword = bcrypt.compareSync(password, checkUser.password);

    if (!checkPasword)
      return res.status(400).json({
        error: 'Invalid Credentials',
      });

    const newUser = {
      name: checkUser.name,
      email: checkUser.email,
    };

    const token = jwt.sign(newUser, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.status(200).json({
      message: 'Logged In Successfully',
      token,
      user: newUser,
    });
  }
}

export default Auth;
