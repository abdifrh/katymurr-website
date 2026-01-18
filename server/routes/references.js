import express from 'express';
import { supabase } from '../index.js';

const router = express.Router();

// Get all references
router.get('/:lang', async (req, res) => {
  try {
    const { lang } = req.params;
    const { featured } = req.query;

    let query = supabase
      .from('references')
      .select('*')
      .eq('language', lang)
      .order('created_at', { ascending: false });

    if (featured === 'true') {
      query = query.eq('featured', true);
    }

    const { data, error } = await query;

    if (error) throw error;

    res.json(data || []);
  } catch (error) {
    console.error('Error fetching references:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;

