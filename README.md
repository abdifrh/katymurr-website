# Katy Murr Website

Site web moderne et professionnel pour katymurr.com - Services de coaching en anglais, interprétation et écriture.

## Stack Technique

- **Frontend**: React + TypeScript + React Router
- **Backend**: Express
- **Base de données**: Supabase
- **CMS**: Dashboard admin personnalisé

## Installation

```bash
# Installer toutes les dépendances
npm run install:all

# Configurer Supabase
# Créer un fichier .env dans le dossier server/ avec:
# SUPABASE_URL=votre_url_supabase
# SUPABASE_KEY=votre_clé_supabase
# JWT_SECRET=votre_secret_jwt

# Lancer le projet en développement
npm run dev
```

## Structure du Projet

```
├── client/          # Frontend React/TypeScript
├── server/          # Backend Express
└── README.md
```

## Fonctionnalités

- ✅ Pages principales (Home, Services, About, References, Blog, Contact)
- ✅ Système multilingue (EN/FR)
- ✅ CMS personnalisé avec dashboard admin
- ✅ Gestion SEO
- ✅ Design responsive
- ✅ Authentification Supabase

## Déploiement

1. Build du frontend: `npm run build`
2. Configurer les variables d'environnement en production
3. Déployer le backend et servir les fichiers statiques du frontend

