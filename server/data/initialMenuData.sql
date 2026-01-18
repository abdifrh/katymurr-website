-- Initial menu data for Katy Murr website
-- Run this after creating the menu_items table

-- Main menu items with explicit IDs
INSERT INTO menu_items (id, label_en, label_fr, url, type, order_index, language, visible) VALUES
('624a53b7-88be-4a30-ac60-64f120b38481', 'Home', 'Accueil', '/', 'link', 1, 'en', true),
('bcb8154e-ceb5-467a-8c1e-b87e105bc024', 'Home', 'Accueil', '/', 'link', 1, 'fr', true),
('bd0dc9d1-a1a4-451a-8995-a5472123f8f9', 'Services', 'Services', '/services', 'dropdown', 2, 'en', true),
('e65f2de2-1986-4ae1-b714-789b3472a2d5', 'Services', 'Services', '/services', 'dropdown', 2, 'fr', true),
('ceb4c635-e866-46dc-85e7-bfed600d381d', 'About', 'À propos', '/about', 'link', 3, 'en', true),
('8c28c014-4e26-4837-8876-103018935497', 'À propos', 'À propos', '/about', 'link', 3, 'fr', true),
('7e7e2221-b766-48d0-8693-f8424263012e', 'References', 'Références', '/references', 'link', 4, 'en', true),
('31c0af76-fd72-4c14-839a-7451f2366215', 'Références', 'Références', '/references', 'link', 4, 'fr', true),
('6d54ffc7-6572-4088-bc36-414cc8271be5', 'Blog', 'Blog', '/blog', 'link', 5, 'en', true),
('649308d8-f9a3-45cb-96e3-fec297eb4510', 'Blog', 'Blog', '/blog', 'link', 5, 'fr', true),
('d2a167e8-01cd-43f6-8c9d-c88b61b0b615', 'Contact', 'Contact', '/contact', 'link', 6, 'en', true),
('9264c75f-1ba4-4662-b62c-380827b024aa', 'Contact', 'Contact', '/contact', 'link', 6, 'fr', true)
ON CONFLICT (id) DO UPDATE SET
  label_en = EXCLUDED.label_en,
  label_fr = EXCLUDED.label_fr,
  url = EXCLUDED.url,
  type = EXCLUDED.type,
  order_index = EXCLUDED.order_index,
  language = EXCLUDED.language,
  visible = EXCLUDED.visible,
  updated_at = NOW();

-- Service items for English Services dropdown
INSERT INTO menu_items (label_en, label_fr, url, type, parent_id, order_index, language, visible) VALUES
('English Coaching', 'Coaching en anglais', '/services/english-coaching', 'service', 'bd0dc9d1-a1a4-451a-8995-a5472123f8f9', 1, 'en', true),
('Conference Interpreting', 'Interprétation de conférence', '/services/conference-interpreting', 'service', 'bd0dc9d1-a1a4-451a-8995-a5472123f8f9', 2, 'en', true),
('Translation & Proofreading', 'Traduction & Correction', '/services/translation-proofreading', 'service', 'bd0dc9d1-a1a4-451a-8995-a5472123f8f9', 3, 'en', true),
('Creative Solutions & Copywriting', 'Solutions créatives & Rédaction', '/services/creative-solutions', 'service', 'bd0dc9d1-a1a4-451a-8995-a5472123f8f9', 4, 'en', true),
('Writing', 'Écriture', '/services/writing', 'service', 'bd0dc9d1-a1a4-451a-8995-a5472123f8f9', 5, 'en', true)
ON CONFLICT DO NOTHING;

-- Service items for French Services dropdown
INSERT INTO menu_items (label_en, label_fr, url, type, parent_id, order_index, language, visible) VALUES
('English Coaching', 'Coaching en anglais', '/services/english-coaching', 'service', 'e65f2de2-1986-4ae1-b714-789b3472a2d5', 1, 'fr', true),
('Conference Interpreting', 'Interprétation de conférence', '/services/conference-interpreting', 'service', 'e65f2de2-1986-4ae1-b714-789b3472a2d5', 2, 'fr', true),
('Translation & Proofreading', 'Traduction & Correction', '/services/translation-proofreading', 'service', 'e65f2de2-1986-4ae1-b714-789b3472a2d5', 3, 'fr', true),
('Creative Solutions & Copywriting', 'Solutions créatives & Rédaction', '/services/creative-solutions', 'service', 'e65f2de2-1986-4ae1-b714-789b3472a2d5', 4, 'fr', true),
('Writing', 'Écriture', '/services/writing', 'service', 'e65f2de2-1986-4ae1-b714-789b3472a2d5', 5, 'fr', true)
ON CONFLICT DO NOTHING;

