import jwt from 'jsonwebtoken';
import createError from 'http-errors';

const secret = process.env.JWT_SECRET || 'defaultsecret';

export default function auth(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return next(createError(401, 'Authentication token missing'));
  }
  const token = authHeader.split(' ')[1];
  if (!token) {
    return next(createError(401, 'Authentication token missing'));
  }
  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    return next();
  } catch (err) {
    return next(createError(401, 'Invalid authentication token'));
  }
}
