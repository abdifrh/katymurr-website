import express from 'express';
import { supabase } from '../index.js';

const router = express.Router();

// Get menu items for a language
router.get('/:lang', async (req, res) => {
  try {
    const { lang } = req.params;

    const { data, error } = await supabase
      .from('menu_items')
      .select('*')
      .eq('language', lang)
      .eq('visible', true)
      .order('order_index', { ascending: true });

    if (error) throw error;

    res.json(data || []);
  } catch (error) {
    console.error('Error fetching menu:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;

