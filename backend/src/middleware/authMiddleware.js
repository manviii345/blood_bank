import { supabase } from '../config/supabase.js';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-demo-key';

export const requireAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ status: 'error', message: 'Missing or invalid authorization header' });
    }

    const token = authHeader.split(' ')[1];
    
    // Verify custom JWT token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    if (!decoded || !decoded.id) {
      return res.status(401).json({ status: 'error', message: 'Unauthorized: Invalid token' });
    }

    // Attach user to request object
    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role
    };

    next();
  } catch (error) {
    res.status(401).json({ status: 'error', message: 'Authentication failed: Invalid or expired token' });
  }
};
