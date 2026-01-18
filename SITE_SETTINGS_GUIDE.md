# Guide du Système de Réglages du Site

## Vue d'ensemble

Le système de réglages permet de gérer dynamiquement toutes les configurations du site depuis le dashboard admin, sans modifier le code.

## Accès

1. Connectez-vous au dashboard admin : `/admin/login`
2. Cliquez sur **"Settings"** dans le menu de gauche
3. Sélectionnez une catégorie pour voir les réglages

## Catégories de Réglages

### 🎨 Branding
- **Site Name** : Nom du site
- **Site Tagline** : Slogan (EN/FR)
- **Logo URL** : URL du logo principal
- **Favicon URL** : URL du favicon

### 🔍 SEO
- **Default SEO Title** : Titre SEO par défaut (EN/FR)
- **Default SEO Description** : Description SEO par défaut (EN/FR)
- **Default SEO Keywords** : Mots-clés SEO par défaut (EN/FR)
- **SEO Author** : Auteur du site
- **OG Image** : Image pour les réseaux sociaux (Open Graph)

### 🖼️ Hero Section
- **Hero Image URL** : Image de fond de la section hero
- **Hero Title** : Titre principal (EN/FR)
- **Hero Subtitle** : Sous-titre (EN/FR)
- **Hero CTA Text** : Texte du bouton CTA (EN/FR)
- **Hero CTA Link** : Lien du bouton CTA

### 📧 Contact
- **Contact Email** : Email de contact
- **Contact Phone** : Téléphone de contact
- **Contact Address** : Adresse

### 📱 Social Media
- **Facebook URL** : Lien Facebook
- **Twitter URL** : Lien Twitter
- **LinkedIn URL** : Lien LinkedIn
- **Instagram URL** : Lien Instagram

### 📊 Analytics
- **Google Analytics ID** : ID de suivi Google Analytics
- **Google Tag Manager ID** : ID Google Tag Manager

### ⬇️ Footer
- **Copyright Text** : Texte de copyright

## Utilisation

### Modifier un Réglage

1. Allez dans **Settings** > Sélectionnez une catégorie
2. Trouvez le réglage à modifier
3. Modifiez la valeur (pour les images, utilisez le bouton "Upload Image")
4. La modification est sauvegardée automatiquement quand vous quittez le champ

### Uploader une Image

1. Cliquez sur **"Upload Image"** ou **"Change Image"**
2. Sélectionnez le fichier
3. L'image sera uploadée dans le bon bucket (logos, favicons, ou media)
4. L'URL sera automatiquement mise à jour

### Réglages par Langue

Certains réglages ont des versions par langue (EN/FR) :
- Les réglages avec une langue spécifique s'affichent dans la section correspondante
- Les réglages globaux (sans langue) s'appliquent à toutes les langues

## Intégration Frontend

Les réglages sont automatiquement chargés et appliqués dans le frontend :

- **Favicon** : Mis à jour automatiquement dans le `<head>`
- **Logo** : Utilisé dans le Header
- **SEO** : Métadonnées SEO appliquées globalement
- **Hero Image** : Image du hero sur la page d'accueil
- **Hero Content** : Titre, sous-titre et CTA du hero

## Configuration Initiale

### 1. Créer la Table

Exécutez le script SQL dans Supabase :
```sql
-- Fichier: server/supabase-schema-settings.sql
```

### 2. Vérifier les Routes

Les routes sont automatiquement disponibles :
- `GET /api/settings` - Récupérer tous les réglages
- `GET /api/settings/:key` - Récupérer un réglage spécifique
- `GET /api/admin/settings` - Récupérer tous les réglages (admin)
- `PUT /api/admin/settings/key/:key` - Mettre à jour un réglage

### 3. Utiliser dans le Code

```typescript
import { useSiteSettings } from '../components/SiteSettings/SiteSettingsProvider'

function MyComponent() {
  const { getSetting } = useSiteSettings()
  const logoUrl = getSetting('logo_url') || '/logo.png'
  const siteName = getSetting('site_name') || 'Katy Murr'
  
  return <img src={logoUrl} alt={siteName} />
}
```

## Notes Importantes

- Les réglages sont mis en cache côté client
- Les modifications prennent effet immédiatement après sauvegarde
- Les images doivent être uploadées via le système d'upload (buckets Supabase)
- Les URLs peuvent être des chemins relatifs ou absolus

