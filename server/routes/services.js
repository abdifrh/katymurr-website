import express from 'express';
import { supabase } from '../index.js';

const router = express.Router();

// Get all services
router.get('/:lang', async (req, res) => {
  try {
    const { lang } = req.params;
    const { published } = req.query;

    let query = supabase
      .from('services')
      .select('*')
      .eq('language', lang)
      .order('order_index', { ascending: true });

    if (published === 'true') {
      query = query.eq('published', true);
    }

    const { data, error } = await query;

    if (error) throw error;

    res.json(data || []);
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get a single service by slug
router.get('/:lang/:slug', async (req, res) => {
  try {
    const { lang, slug } = req.params;

    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('slug', slug)
      .eq('language', lang)
      .eq('published', true)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({ error: 'Service not found' });
      }
      throw error;
    }

    res.json(data);
  } catch (error) {
    console.error('Error fetching service:', error);
    res.status(500).json({ error: error.message });
  }
});

// Create a new service (admin only - add auth middleware later)
router.post('/', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('services')
      .insert([req.body])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json(data);
  } catch (error) {
    console.error('Error creating service:', error);
    res.status(500).json({ error: error.message });
  }
});

// Update a service (admin only)
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('services')
      .update(req.body)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    res.json(data);
  } catch (error) {
    console.error('Error updating service:', error);
    res.status(500).json({ error: error.message });
  }
});

// Delete a service (admin only)
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = await supabase
      .from('services')
      .delete()
      .eq('id', id);

    if (error) throw error;

    res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    console.error('Error deleting service:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;

