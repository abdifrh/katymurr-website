-- Insert or update hero section content in site_settings table
-- This SQL will update the hero content for both English and French

-- English Hero Content
UPDATE site_settings 
SET value = 'Elevate your communication. Master your message.'
WHERE key = 'hero_title_en';

UPDATE site_settings 
SET value = 'Professional English coaching, conference interpreting, and writing services tailored to help you communicate with confidence and clarity in international settings.'
WHERE key = 'hero_subtitle_en';

UPDATE site_settings 
SET value = 'Get Started'
WHERE key = 'hero_cta_text_en';

-- French Hero Content
UPDATE site_settings 
SET value = 'Élevez votre communication. Maîtrisez votre message.'
WHERE key = 'hero_title_fr';

UPDATE site_settings 
SET value = 'Services professionnels de coaching en anglais, interprétation de conférence et écriture sur mesure pour vous aider à communiquer avec confiance et clarté dans des contextes internationaux.'
WHERE key = 'hero_subtitle_fr';

UPDATE site_settings 
SET value = 'Commencer'
WHERE key = 'hero_cta_text_fr';

-- Hero CTA Link (global, not language-specific)
UPDATE site_settings 
SET value = '/contact'
WHERE key = 'hero_cta_link';

-- If the settings don't exist yet, insert them
INSERT INTO site_settings (key, value, type, category, language, description)
VALUES
  ('hero_title_en', 'Elevate your communication. Master your message.', 'text', 'hero', 'en', 'Hero section title in English'),
  ('hero_subtitle_en', 'Professional English coaching, conference interpreting, and writing services tailored to help you communicate with confidence and clarity in international settings.', 'text', 'hero', 'en', 'Hero section subtitle in English'),
  ('hero_cta_text_en', 'Get Started', 'text', 'hero', 'en', 'Hero CTA button text in English'),
  ('hero_title_fr', 'Élevez votre communication. Maîtrisez votre message.', 'text', 'hero', 'fr', 'Hero section title in French'),
  ('hero_subtitle_fr', 'Services professionnels de coaching en anglais, interprétation de conférence et écriture sur mesure pour vous aider à communiquer avec confiance et clarté dans des contextes internationaux.', 'text', 'hero', 'fr', 'Hero section subtitle in French'),
  ('hero_cta_text_fr', 'Commencer', 'text', 'hero', 'fr', 'Hero CTA button text in French'),
  ('hero_cta_link', '/contact', 'text', 'hero', NULL, 'Hero CTA button link')
ON CONFLICT (key) DO UPDATE SET
  value = EXCLUDED.value,
  updated_at = NOW();

