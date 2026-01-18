-- Add service items to the Services dropdown menu
-- Run this after creating the main menu items (initialMenuData.sql)
-- This script adds individual service pages as children of the Services dropdown

-- Services menu item IDs:
-- Services (EN): 'bd0dc9d1-a1a4-451a-8995-a5472123f8f9'
-- Services (FR): 'e65f2de2-1986-4ae1-b714-789b3472a2d5'

-- English Services dropdown items
INSERT INTO menu_items (label_en, label_fr, url, type, parent_id, order_index, language, visible) VALUES
('English Coaching', 'Coaching en anglais', '/services/english-coaching', 'service', 'bd0dc9d1-a1a4-451a-8995-a5472123f8f9', 1, 'en', true),
('Conference Interpreting', 'Interprétation de conférence', '/services/conference-interpreting', 'service', 'bd0dc9d1-a1a4-451a-8995-a5472123f8f9', 2, 'en', true),
('Translation & Proofreading', 'Traduction & Correction', '/services/translation-proofreading', 'service', 'bd0dc9d1-a1a4-451a-8995-a5472123f8f9', 3, 'en', true),
('Creative Solutions & Copywriting', 'Solutions créatives & Rédaction', '/services/creative-solutions', 'service', 'bd0dc9d1-a1a4-451a-8995-a5472123f8f9', 4, 'en', true),
('Writing', 'Écriture', '/services/writing', 'service', 'bd0dc9d1-a1a4-451a-8995-a5472123f8f9', 5, 'en', true)
ON CONFLICT DO NOTHING;

-- French Services dropdown items
INSERT INTO menu_items (label_en, label_fr, url, type, parent_id, order_index, language, visible) VALUES
('English Coaching', 'Coaching en anglais', '/services/english-coaching', 'service', 'e65f2de2-1986-4ae1-b714-789b3472a2d5', 1, 'fr', true),
('Conference Interpreting', 'Interprétation de conférence', '/services/conference-interpreting', 'service', 'e65f2de2-1986-4ae1-b714-789b3472a2d5', 2, 'fr', true),
('Translation & Proofreading', 'Traduction & Correction', '/services/translation-proofreading', 'service', 'e65f2de2-1986-4ae1-b714-789b3472a2d5', 3, 'fr', true),
('Creative Solutions & Copywriting', 'Solutions créatives & Rédaction', '/services/creative-solutions', 'service', 'e65f2de2-1986-4ae1-b714-789b3472a2d5', 4, 'fr', true),
('Writing', 'Écriture', '/services/writing', 'service', 'e65f2de2-1986-4ae1-b714-789b3472a2d5', 5, 'fr', true)
ON CONFLICT DO NOTHING;

