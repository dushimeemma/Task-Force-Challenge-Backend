import { config } from 'dotenv';
import jwt from 'jsonwebtoken';

import { User } from '../database/models';

config();

class Token {
  async checkUser(req, res, next) {
    const { 'x-auth-token': token } = req.headers;

    if (!token)
      return res.status(401).json({
        status: 'failed',
        message: 'No Token Authorization Denied',
      });

    try {
      const checkUser = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findOne({ where: { email: checkUser.email } });

      if (!user)
        return res.status(400).json({
          status: 'failed',
          message: 'User Not found',
        });

      req.user = user;

      next();
    } catch (error) {
      return res.status(400).json({
        status: 'failed',
        error: error.message,
      });
    }
  }
}

export default Token;
