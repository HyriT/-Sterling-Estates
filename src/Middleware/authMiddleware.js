import jwt from 'jsonwebtoken';
import { errorHandler } from '../Utils/error.js';

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token || req.headers.authorization?.split(" ")[1];

  if (!token) return next(errorHandler(401, 'Unauthorized: Token not found'));

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(errorHandler(403, 'Forbidden: Invalid token'));

    req.user = user;
    next();
  });
};

// Middleware for logged-in users
export const verifyUser = (req, res, next) => {
  verifyToken(req, res, (err) => {
    if (err) return next(err);
    next();
  });
};

// Middleware for admins
export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, (err) => {
    if (err) return next(err);
    if (req.user.role !== "admin") {
      return next(errorHandler(403, 'Forbidden: Admins only'));
    }
    next();
  });
};

