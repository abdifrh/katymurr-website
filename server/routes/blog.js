import express from 'express';
import { supabase } from '../index.js';

const router = express.Router();

// Get all blog posts
router.get('/:lang', async (req, res) => {
  try {
    const { lang } = req.params;
    const { category, limit = 10, offset = 0 } = req.query;

    let query = supabase
      .from('blog_posts')
      .select('*')
      .eq('language', lang)
      .eq('published', true)
      .order('created_at', { ascending: false })
      .range(parseInt(offset), parseInt(offset) + parseInt(limit) - 1);

    if (category) {
      query = query.eq('category', category);
    }

    const { data, error } = await query;

    if (error) throw error;

    res.json(data || []);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get single blog post
router.get('/:lang/:slug', async (req, res) => {
  try {
    const { slug, lang } = req.params;

    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('language', lang)
      .eq('published', true)
      .single();

    if (error) throw error;

    if (!data) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json(data);
  } catch (error) {
    console.error('Error fetching blog post:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get categories
router.get('/:lang/categories/list', async (req, res) => {
  try {
    const { lang } = req.params;

    const { data, error } = await supabase
      .from('blog_categories')
      .select('*')
      .eq('language', lang);

    if (error) throw error;

    res.json(data || []);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;

