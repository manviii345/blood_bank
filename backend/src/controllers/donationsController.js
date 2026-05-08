import { supabase } from '../config/supabase.js';

export const createDonation = async (req, res) => {
  try {
    const { date } = req.body;
    
    // Ensure donor exists in donors table to satisfy foreign key constraint
    await supabase.from('donors').upsert([{ 
      id: req.user.id, 
      blood_group: 'Unknown', 
      date_of_birth: '2000-01-01' 
    }]);

    const { data, error } = await supabase
      .from('donations')
      .insert([{ 
        donor_id: req.user.id, 
        date,
        status: 'scheduled'
      }])
      .select();
      
    if (error) throw error;
    
    res.status(201).json({ status: 'success', data: data[0] });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const getDonations = async (req, res) => {
  try {
    let query = supabase.from('donations').select('*');
    
    // If donor, fetch only theirs. If admin/staff, fetch all.
    if (req.user.role === 'donor') {
      query = query.eq('donor_id', req.user.id);
    }
    
    const { data, error } = await query;
    if (error) throw error;
    
    res.status(200).json({ status: 'success', data });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const updateDonationStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    // Ensure staff member exists in staff table to satisfy foreign key constraint
    await supabase.from('staff').upsert([{ 
      id: req.user.id, 
      employee_code: 'EMP-' + req.user.id.substring(0, 6)
    }]);

    const { data: donation, error: updateError } = await supabase
      .from('donations')
      .update({ status, handled_by: req.user.id })
      .eq('id', id)
      .select()
      .single();

    if (updateError) throw updateError;

    // Minimal logic: if completed, add new inventory
    if (status === 'completed') {
      await supabase
        .from('blood_inventory')
        .insert([{
          blood_group: 'O+', // Hardcoded for demo simplicity
          quantity_ml: 450,
          donation_date: new Date().toISOString(),
          expiry_date: new Date(Date.now() + 35 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'available'
        }]);
    }

    res.status(200).json({ status: 'success', data: donation });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};
