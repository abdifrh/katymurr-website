-- Add featured_image column to pages table
-- Run this in your Supabase SQL editor

ALTER TABLE pages 
ADD COLUMN IF NOT EXISTS featured_image VARCHAR(500);

-- Add index for better performance
CREATE INDEX IF NOT EXISTS idx_pages_featured_image ON pages(featured_image) WHERE featured_image IS NOT NULL;

-- Optional: Add a JSONB column for multiple images (for future use)
-- ALTER TABLE pages 
-- ADD COLUMN IF NOT EXISTS images JSONB DEFAULT '[]'::jsonb;

