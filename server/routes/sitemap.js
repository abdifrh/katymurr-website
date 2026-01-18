import express from 'express';
import { supabase } from '../index.js';

const router = express.Router();

// Generate sitemap.xml
router.get('/sitemap.xml', async (req, res) => {
  try {
    const baseUrl = process.env.BASE_URL || 'https://katymurr.com';
    
    // Fetch all pages and published blog posts
    const [pagesData, blogData] = await Promise.all([
      supabase.from('pages').select('slug, language, updated_at'),
      supabase.from('blog_posts').select('slug, language, updated_at').eq('published', true)
    ]);

    const pages = pagesData.data || [];
    const posts = blogData.data || [];

    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    // Fetch published services
    const servicesData = await supabase
      .from('services')
      .select('slug, language, updated_at')
      .eq('published', true);
    
    const services = servicesData.data || [];

    // Add static pages
    const staticPages = [
      { path: '', priority: '1.0' },
      { path: 'services', priority: '0.9' },
      { path: 'about', priority: '0.8' },
      { path: 'references', priority: '0.8' },
      { path: 'blog', priority: '0.8' },
      { path: 'contact', priority: '0.7' },
      { path: 'privacy-policy', priority: '0.5' },
      { path: 'terms-of-service', priority: '0.5' },
      { path: 'legal-notice', priority: '0.5' },
      { path: 'cookie-policy', priority: '0.5' }
    ];
    
    staticPages.forEach(page => {
      sitemap += `
  <url>
    <loc>${baseUrl}/${page.path}</loc>
    <changefreq>weekly</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
    });

    // Add dynamic pages
    pages.forEach(page => {
      sitemap += `
  <url>
    <loc>${baseUrl}/${page.slug}?lang=${page.language}</loc>
    <lastmod>${new Date(page.updated_at).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
    });

    // Add services
    services.forEach(service => {
      sitemap += `
  <url>
    <loc>${baseUrl}/services/${service.slug}?lang=${service.language}</loc>
    <lastmod>${new Date(service.updated_at).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
    });

    // Add blog posts
    posts.forEach(post => {
      sitemap += `
  <url>
    <loc>${baseUrl}/blog/${post.slug}?lang=${post.language}</loc>
    <lastmod>${new Date(post.updated_at).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;
    });

    sitemap += `
</urlset>`;

    res.set('Content-Type', 'text/xml');
    res.send(sitemap);
  } catch (error) {
    console.error('Error generating sitemap:', error);
    res.status(500).send('Error generating sitemap');
  }
});

export default router;

