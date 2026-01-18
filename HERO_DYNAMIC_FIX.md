# Correction du Hero Dynamique

## Problème

Le contenu texte du hero n'était pas dynamique car le code utilisait `homePage?.content` (contenu HTML de la page "home" dans Supabase) au lieu des settings dynamiques.

## Solution Appliquée

### 1. Suppression de `getHeroContent()`

La fonction `getHeroContent()` qui cherchait le contenu dans `homePage?.content` a été supprimée. Le hero utilise maintenant **toujours** les settings dynamiques.

### 2. Hero 100% Dynamique (`client/src/pages/Home.tsx`)

Le hero utilise maintenant directement les settings récupérés via `getSetting()` :

```typescript
const heroImageUrl = getSetting('hero_image_url') || '/images/hero-image.jpg'
const heroTitle = getSetting('hero_title', language) || '...'
const heroSubtitle = getSetting('hero_subtitle', language) || '...'
const heroCtaText = getSetting('hero_cta_text', language) || '...'
const heroCtaLink = getSetting('hero_cta_link') || '/contact'
```

### 3. Structure HTML Simplifiée

Le hero affiche maintenant directement :
- `<h1 className="hero-title">{heroTitle}</h1>`
- `<h2 className="hero-tagline">{heroSubtitle}</h2>`
- Bouton CTA avec `{heroCtaText}` et `{heroCtaLink}`

## Clés de Settings Requises

Assurez-vous que ces settings existent dans Supabase (`site_settings` table) :

| Clé | Type | Langue | Description |
|-----|------|--------|-------------|
| `hero_image_url` | `image` | `NULL` | URL de l'image de fond du hero |
| `hero_title_en` | `text` | `en` | Titre du hero en anglais |
| `hero_title_fr` | `text` | `fr` | Titre du hero en français |
| `hero_subtitle_en` | `text` | `en` | Sous-titre du hero en anglais |
| `hero_subtitle_fr` | `text` | `fr` | Sous-titre du hero en français |
| `hero_cta_text_en` | `text` | `en` | Texte du bouton CTA en anglais |
| `hero_cta_text_fr` | `text` | `fr` | Texte du bouton CTA en français |
| `hero_cta_link` | `text` | `NULL` | Lien du bouton CTA (ex: `/contact`) |

## Vérification

1. **Dans le Dashboard Admin** :
   - Allez dans "Settings" → "Hero"
   - Vérifiez que les champs sont remplis

2. **Dans Supabase** :
   ```sql
   SELECT key, value, language 
   FROM site_settings 
   WHERE key LIKE 'hero_%'
   ORDER BY key, language;
   ```

3. **Dans le Frontend** :
   - Rafraîchissez la page
   - Le hero devrait afficher les valeurs des settings
   - Changez la langue (EN/FR) → le contenu devrait changer

## Notes

- Les settings sont chargés de manière asynchrone via `SiteSettingsProvider`
- Si les settings ne sont pas encore chargés, les valeurs par défaut sont utilisées
- Une fois les settings chargés, le composant se re-rend automatiquement avec les nouvelles valeurs
- Le hero ne dépend plus du contenu de la page "home" dans Supabase

