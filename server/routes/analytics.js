import express from 'express';
import { supabase } from '../index.js';

const router = express.Router();

// Track page visit (public)
router.post('/visit', async (req, res) => {
  try {
    const {
      page_path,
      page_title,
      referrer,
      user_agent,
      ip_address,
      country,
      language,
      session_id,
      duration_seconds
    } = req.body;

    const { data, error } = await supabase
      .from('page_visits')
      .insert({
        page_path,
        page_title,
        referrer,
        user_agent,
        ip_address,
        country,
        language,
        session_id,
        duration_seconds
      })
      .select()
      .single();

    if (error) throw error;

    res.json({ success: true, id: data.id });
  } catch (error) {
    console.error('Error tracking visit:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get analytics stats (admin only - will be protected by admin middleware)
router.get('/stats', async (req, res) => {
  try {
    const { start_date, end_date } = req.query;

    let query = supabase
      .from('page_visits')
      .select('*', { count: 'exact' });

    if (start_date) {
      query = query.gte('visit_date', start_date);
    }
    if (end_date) {
      query = query.lte('visit_date', end_date);
    }

    const { data, error, count } = await query.order('visit_date', { ascending: false });

    if (error) throw error;

    // Calculate stats
    const stats = {
      total_visits: count || 0,
      unique_pages: new Set(data?.map(v => v.page_path) || []).size,
      top_pages: getTopPages(data || []),
      visits_by_date: getVisitsByDate(data || []),
      visits_by_country: getVisitsByCountry(data || []),
      average_duration: getAverageDuration(data || [])
    };

    res.json(stats);
  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({ error: error.message });
  }
});

function getTopPages(visits) {
  const pageCounts = {};
  visits.forEach(visit => {
    pageCounts[visit.page_path] = (pageCounts[visit.page_path] || 0) + 1;
  });
  return Object.entries(pageCounts)
    .map(([path, count]) => ({ path, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);
}

function getVisitsByDate(visits) {
  const dateCounts = {};
  visits.forEach(visit => {
    const date = new Date(visit.visit_date).toISOString().split('T')[0];
    dateCounts[date] = (dateCounts[date] || 0) + 1;
  });
  return Object.entries(dateCounts)
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => a.date.localeCompare(b.date));
}

function getVisitsByCountry(visits) {
  const countryCounts = {};
  visits.forEach(visit => {
    const country = visit.country || 'Unknown';
    countryCounts[country] = (countryCounts[country] || 0) + 1;
  });
  return Object.entries(countryCounts)
    .map(([country, count]) => ({ country, count }))
    .sort((a, b) => b.count - a.count);
}

function getAverageDuration(visits) {
  const durations = visits
    .filter(v => v.duration_seconds)
    .map(v => v.duration_seconds);
  if (durations.length === 0) return 0;
  return Math.round(durations.reduce((a, b) => a + b, 0) / durations.length);
}

export default router;

