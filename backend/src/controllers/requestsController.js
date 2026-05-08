import { supabase } from '../config/supabase.js';

export const createRequest = async (req, res) => {
  const { blood_group, urgency, quantity_units } = req.body;
  
  if (!blood_group || !quantity_units) {
    return res.status(400).json({ status: 'error', message: 'Missing required fields' });
  }

  try {
    const { data, error } = await supabase
      .from('blood_requests')
      .insert([{ 
        hospital_id: req.user.id, 
        blood_group, 
        urgency: urgency || 'normal', 
        quantity_units 
      }])
      .select();
      
    if (error) throw error;
    
    res.status(201).json({ status: 'success', data: data[0] });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const getRequests = async (req, res) => {
  try {
    let query = supabase.from('blood_requests').select('*');
    
    // If hospital, fetch only theirs. If admin/staff, fetch all.
    if (req.user.role === 'hospital') {
      query = query.eq('hospital_id', req.user.id);
    }
    
    const { data, error } = await query;
    if (error) throw error;
    
    res.status(200).json({ status: 'success', data });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const updateRequestStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    // Ensure staff member exists in staff table to satisfy foreign key constraint
    await supabase.from('staff').upsert([{ 
      id: req.user.id, 
      employee_code: 'EMP-' + req.user.id.substring(0, 6)
    }]);

    const { data: request, error: updateError } = await supabase
      .from('blood_requests')
      .update({ status, handled_by: req.user.id })
      .eq('id', id)
      .select()
      .single();

    if (updateError) throw updateError;

    // Minimal logic: if approved, we assume inventory is updated. 
    // For demo simplicity, we just reduce the first available inventory row of this blood group.
    if (status === 'approved') {
      const { data: inv } = await supabase
        .from('blood_inventory')
        .select('*')
        .eq('blood_group', request.blood_group)
        .eq('status', 'available')
        .limit(1)
        .single();
        
      if (inv) {
        await supabase
          .from('blood_inventory')
          .update({ quantity_ml: Math.max(0, inv.quantity_ml - (request.quantity_units * 450)) })
          .eq('id', inv.id);
      }
    }

    res.status(200).json({ status: 'success', data: request });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};
