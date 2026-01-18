import express from 'express';
import { supabase } from '../index.js';

const router = express.Router();

// Get all settings
router.get('/', async (req, res) => {
  try {
    const { category, language } = req.query;
    
    let query = supabase.from('site_settings').select('*');
    
    if (category) {
      query = query.eq('category', category);
    }
    
    if (language !== undefined) {
      query = query.or(`language.eq.${language},language.is.null`);
    }
    
    const { data, error } = await query.order('category', { ascending: true });
    
    if (error) throw error;
    
    // Transform array to object for easier access
    const settings = {};
    (data || []).forEach(setting => {
      settings[setting.key] = setting;
    });
    
    res.json(settings);
  } catch (error) {
    console.error('Error fetching settings:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get single setting by key
router.get('/:key', async (req, res) => {
  try {
    const { key } = req.params;
    const { language } = req.query;
    
    let query = supabase
      .from('site_settings')
      .select('*')
      .eq('key', key);
    
    if (language) {
      query = query.or(`language.eq.${language},language.is.null`);
    }
    
    const { data, error } = await query.order('language', { ascending: false }).limit(1);
    
    if (error) throw error;
    
    if (!data || data.length === 0) {
      return res.status(404).json({ error: 'Setting not found' });
    }
    
    res.json(data[0]);
  } catch (error) {
    console.error('Error fetching setting:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get settings by category
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const { language } = req.query;
    
    let query = supabase
      .from('site_settings')
      .select('*')
      .eq('category', category);
    
    if (language) {
      query = query.or(`language.eq.${language},language.is.null`);
    }
    
    const { data, error } = await query.order('key', { ascending: true });
    
    if (error) throw error;
    
    res.json(data || []);
  } catch (error) {
    console.error('Error fetching settings by category:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;

