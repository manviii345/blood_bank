import { supabase } from '../config/supabase.js';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-demo-key';

export const register = async (req, res) => {
  const { email, password, first_name, last_name, role } = req.body;
  try {
    // Basic check if user exists
    const { data: existingUser } = await supabase
      .from('profiles')
      .select('id')
      .eq('email', email)
      .single();

    if (existingUser) {
      return res.status(400).json({ status: 'error', message: 'Email already exists' });
    }

    // Insert into profiles
    const { data, error } = await supabase
      .from('profiles')
      .insert([{ 
        email, 
        password, // Storing plain text password for demo simplicity
        first_name, 
        last_name, 
        role: role || 'donor' 
      }])
      .select()
      .single();

    if (error) {
      return res.status(400).json({ status: 'error', message: error.message });
    }

    // Generate JWT
    const token = jwt.sign({ id: data.id, email: data.email, role: data.role }, JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      status: 'success',
      data: { 
        user: data, 
        session: { access_token: token } 
      }
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    // Find user in profiles
    const { data: user, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('email', email)
      .eq('password', password) // Checking plain text password for demo
      .single();
    
    if (error || !user) {
      return res.status(401).json({ status: 'error', message: 'Invalid email or password' });
    }

    // Generate JWT
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '7d' });

    res.status(200).json({
      status: 'success',
      data: {
        user: user,
        session: { access_token: token },
        role: user.role
      }
    });

  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const getMe = async (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      user: req.user,
      role: req.user.role || 'donor'
    }
  });
};

