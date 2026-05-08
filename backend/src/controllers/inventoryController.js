import { supabase } from '../config/supabase.js';

export const getInventory = async (req, res) => {
  try {
    const { data, error } = await supabase.from('blood_inventory').select('*');
    
    if (error) {
      return res.status(400).json({ status: 'error', message: error.message });
    }

    res.status(200).json({
      status: 'success',
      data: data || []
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

