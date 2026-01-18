# Configuration du Système de Réglages

## Installation

### 1. Créer la Table dans Supabase

Exécutez le script SQL dans Supabase SQL Editor :
```sql
-- Fichier: server/supabase-schema-settings.sql
```

Ce script crée :
- La table `site_settings`
- Les index pour les performances
- Les réglages par défaut
- Le trigger pour `updated_at`

### 2. Vérifier les Routes

Les routes sont automatiquement disponibles :
- `GET /api/settings` - Récupérer tous les réglages
- `GET /api/settings/:key` - Récupérer un réglage spécifique
- `GET /api/settings/category/:category` - Récupérer par catégorie
- `GET /api/admin/settings` - Récupérer tous les réglages (admin)
- `PUT /api/admin/settings/key/:key` - Mettre à jour un réglage

### 3. Accéder à l'Interface Admin

1. Connectez-vous au dashboard : `/admin/login`
2. Cliquez sur **"Settings"** dans le menu de gauche
3. Sélectionnez une catégorie pour voir les réglages

## Catégories Disponibles

### 🎨 Branding
- Site Name
- Site Tagline (EN/FR)
- Logo URL
- Favicon URL

### 🔍 SEO
- Default SEO Title (EN/FR)
- Default SEO Description (EN/FR)
- Default SEO Keywords (EN/FR)
- SEO Author
- OG Image (pour réseaux sociaux)

### 🖼️ Hero Section
- Hero Image URL
- Hero Title (EN/FR)
- Hero Subtitle (EN/FR)
- Hero CTA Text (EN/FR)
- Hero CTA Link

### 📧 Contact
- Contact Email
- Contact Phone
- Contact Address

### 📱 Social Media
- Facebook URL
- Twitter URL
- LinkedIn URL
- Instagram URL

### 📊 Analytics
- Google Analytics ID
- Google Tag Manager ID

### ⬇️ Footer
- Copyright Text

## Utilisation

### Modifier un Réglage

1. Allez dans **Settings** > Sélectionnez une catégorie
2. Trouvez le réglage à modifier
3. Modifiez la valeur
4. La modification est sauvegardée automatiquement quand vous quittez le champ (onBlur)

### Uploader une Image

1. Cliquez sur **"Upload Image"** ou **"Change Image"**
2. Sélectionnez le fichier
3. L'image sera uploadée dans le bon bucket (logos, favicons, ou media)
4. L'URL sera automatiquement mise à jour

### Réglages par Langue

- Les réglages avec une langue spécifique (EN/FR) s'affichent dans la section correspondante
- Les réglages globaux (sans langue) s'appliquent à toutes les langues

## Intégration Frontend

Les réglages sont automatiquement chargés et appliqués :

- **Favicon** : Mis à jour dans le `<head>` via `SiteSettingsProvider`
- **Logo** : Utilisé dans le Header (tous les états)
- **SEO** : Métadonnées SEO appliquées globalement
- **Hero Image** : Image du hero sur la page d'accueil
- **Hero Content** : Titre, sous-titre et CTA du hero
- **Contact Info** : Email et téléphone dans le Footer
- **Copyright** : Texte de copyright dans le Footer

## Utilisation dans le Code

```typescript
import { useSiteSettings } from '../components/SiteSettings/SiteSettingsProvider'

function MyComponent() {
  const { getSetting } = useSiteSettings()
  
  // Réglage global
  const logoUrl = getSetting('logo_url') || '/logo.png'
  
  // Réglage par langue
  const heroTitle = getSetting('hero_title', 'en') || 'Default Title'
  
  return <img src={logoUrl} alt="Logo" />
}
```

## Notes

- Les réglages sont mis en cache côté client
- Les modifications prennent effet immédiatement après sauvegarde
- Les images doivent être uploadées via le système d'upload (buckets Supabase)
- Les URLs peuvent être des chemins relatifs ou absolus

