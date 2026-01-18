import express from 'express';
import { supabase } from '../index.js';
import { verifyAdmin } from '../middleware/auth.js';

const router = express.Router();

// Submit contact form
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message, service_type } = req.body;

    // Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ 
        error: 'Missing required fields: name, email, subject, and message are required' 
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    // Insert into database
    const { data, error } = await supabase
      .from('contact_messages')
      .insert({
        name: name.trim(),
        email: email.trim(),
        subject: subject.trim(),
        message: message.trim(),
        service_type: service_type || null,
        status: 'new'
      })
      .select()
      .single();

    if (error) throw error;

    // TODO: Send email notification (requires email service setup)
    // You can integrate with SendGrid, Mailgun, or similar service here

    res.status(201).json({ 
      success: true, 
      message: 'Contact message submitted successfully',
      id: data.id 
    });
  } catch (error) {
    console.error('Error submitting contact form:', error);
    res.status(500).json({ 
      error: 'Failed to submit contact form',
      details: error.message 
    });
  }
});

// Get contact messages (admin only)
router.get('/', verifyAdmin, async (req, res) => {
  try {
    const { status, limit = 50, offset = 0 } = req.query;

    let query = supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false })
      .range(parseInt(offset), parseInt(offset) + parseInt(limit) - 1);

    if (status) {
      query = query.eq('status', status);
    }

    const { data, error } = await query;

    if (error) throw error;

    res.json(data || []);
  } catch (error) {
    console.error('Error fetching contact messages:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get single contact message (admin only)
router.get('/:id', verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    if (!data) {
      return res.status(404).json({ error: 'Contact message not found' });
    }

    res.json(data);
  } catch (error) {
    console.error('Error fetching contact message:', error);
    res.status(500).json({ error: error.message });
  }
});

// Update contact message status (admin only)
router.put('/:id', verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { status, read_at, replied_at } = req.body;

    const updateData = {};
    if (status) updateData.status = status;
    if (read_at !== undefined) updateData.read_at = read_at;
    if (replied_at !== undefined) updateData.replied_at = replied_at;

    const { data, error } = await supabase
      .from('contact_messages')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    res.json(data);
  } catch (error) {
    console.error('Error updating contact message:', error);
    res.status(500).json({ error: error.message });
  }
});

// Delete contact message (admin only)
router.delete('/:id', verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from('contact_messages')
      .delete()
      .eq('id', id);

    if (error) throw error;

    res.json({ success: true, message: 'Contact message deleted successfully' });
  } catch (error) {
    console.error('Error deleting contact message:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;

