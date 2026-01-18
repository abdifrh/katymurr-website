import express from 'express';
import { supabase } from '../index.js';

const router = express.Router();

// Get page by slug and language
router.get('/:slug/:lang', async (req, res) => {
  try {
    const { slug, lang } = req.params;

    const { data, error } = await supabase
      .from('pages')
      .select('*')
      .eq('slug', slug)
      .eq('language', lang)
      .single();

    if (error) throw error;

    if (!data) {
      return res.status(404).json({ error: 'Page not found' });
    }

    res.json(data);
  } catch (error) {
    console.error('Error fetching page:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get all pages for a language
router.get('/:lang', async (req, res) => {
  try {
    const { lang } = req.params;

    const { data, error } = await supabase
      .from('pages')
      .select('*')
      .eq('language', lang)
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json(data || []);
  } catch (error) {
    console.error('Error fetching pages:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;

