import jwt from 'jsonwebtoken';
import { JWT } from '../config.js';

export const isAuth = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: 'Not authorized',
    });
  }

  jwt.verify(token, JWT, (err, decoded) => {
    if (err)
      return res.status(401).json({
        message: 'Not authorized',
      });

    req.userId = decoded.id;

    next();
  });
};
