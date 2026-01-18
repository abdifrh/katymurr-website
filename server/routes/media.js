import express from 'express';
import { supabase } from '../index.js';

const router = express.Router();

// Get all media
router.get('/', async (req, res) => {
  try {
    const { limit = 50, offset = 0 } = req.query;

    const { data, error } = await supabase
      .from('media')
      .select('*')
      .order('created_at', { ascending: false })
      .range(parseInt(offset), parseInt(offset) + parseInt(limit) - 1);

    if (error) throw error;

    res.json(data || []);
  } catch (error) {
    console.error('Error fetching media:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get single media item
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('media')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;

    if (!data) {
      return res.status(404).json({ error: 'Media not found' });
    }

    res.json(data);
  } catch (error) {
    console.error('Error fetching media:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;

