import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export function verifyToken(req) {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('No token provided');
  }

  const token = authHeader.substring(7); // Remove 'Bearer ' prefix
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    throw new Error('Invalid token');
  }
}

export function authenticateUser(handler) {
  return async (req, res) => {
    try {
      const user = verifyToken(req);
      req.user = user; // Add user info to request object
      return handler(req, res);
    } catch (error) {
      return res.status(401).json({ error: 'Authentication required' });
    }
  };
}