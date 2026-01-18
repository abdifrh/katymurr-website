import express from 'express';
import { supabase } from '../index.js';

const router = express.Router();

// Subscribe to newsletter (public)
router.post('/subscribe', async (req, res) => {
  try {
    const { email, name, language, source } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Check if already subscribed
    const { data: existing } = await supabase
      .from('newsletter_subscribers')
      .select('*')
      .eq('email', email)
      .single();

    if (existing) {
      if (existing.subscribed) {
        return res.json({ success: true, message: 'Already subscribed' });
      } else {
        // Re-subscribe
        const { data, error } = await supabase
          .from('newsletter_subscribers')
          .update({
            subscribed: true,
            subscribed_at: new Date().toISOString(),
            unsubscribed_at: null,
            name: name || existing.name,
            language: language || existing.language || 'en',
            source: source || existing.source
          })
          .eq('id', existing.id)
          .select()
          .single();

        if (error) throw error;
        return res.json({ success: true, message: 'Re-subscribed successfully' });
      }
    }

    // New subscription
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .insert({
        email,
        name,
        language: language || 'en',
        subscribed: true,
        source: source || 'footer'
      })
      .select()
      .single();

    if (error) throw error;

    res.json({ success: true, message: 'Subscribed successfully' });
  } catch (error) {
    console.error('Error subscribing:', error);
    res.status(500).json({ error: error.message });
  }
});

// Unsubscribe (public)
router.post('/unsubscribe', async (req, res) => {
  try {
    const { email } = req.body;

    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .update({
        subscribed: false,
        unsubscribed_at: new Date().toISOString()
      })
      .eq('email', email)
      .select()
      .single();

    if (error) throw error;

    res.json({ success: true, message: 'Unsubscribed successfully' });
  } catch (error) {
    console.error('Error unsubscribing:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;

