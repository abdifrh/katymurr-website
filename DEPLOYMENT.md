# Guide de Déploiement - Katy Murr Website

## Prérequis

1. Compte Supabase (gratuit disponible)
2. Node.js 18+ installé
3. Accès à un serveur pour le déploiement (Vercel, Netlify, ou serveur VPS)

## Configuration Supabase

1. Créer un nouveau projet sur [Supabase](https://supabase.com)
2. Exécuter le script SQL dans `server/supabase-schema.sql` dans l'éditeur SQL de Supabase
3. Noter l'URL du projet et les clés API (anon key)

## Configuration des Variables d'Environnement

### Backend (server/.env)

```env
SUPABASE_URL=votre_url_supabase
SUPABASE_KEY=votre_clé_anon_supabase
PORT=3001
CLIENT_URL=https://votre-domaine.com
BASE_URL=https://katymurr.com
JWT_SECRET=votre_secret_jwt
```

### Frontend (client/.env)

```env
VITE_API_URL=https://votre-api.com/api
VITE_SUPABASE_URL=votre_url_supabase
VITE_SUPABASE_ANON_KEY=votre_clé_anon_supabase
```

## Installation Locale

```bash
# Installer toutes les dépendances
npm run install:all

# Lancer en développement
npm run dev
```

## Déploiement

### Option 1: Vercel (Recommandé)

1. Installer Vercel CLI: `npm i -g vercel`
2. Dans le dossier `client/`: `vercel`
3. Dans le dossier `server/`: `vercel`
4. Configurer les variables d'environnement dans le dashboard Vercel

### Option 2: Netlify + Railway

1. **Frontend (Netlify)**:
   - Connecter le repo GitHub
   - Build command: `cd client && npm install && npm run build`
   - Publish directory: `client/dist`

2. **Backend (Railway)**:
   - Connecter le repo GitHub
   - Root directory: `server`
   - Configurer les variables d'environnement

### Option 3: Serveur VPS

1. Cloner le repository
2. Installer les dépendances
3. Build le frontend: `cd client && npm run build`
4. Configurer Nginx pour servir les fichiers statiques et proxy vers l'API
5. Utiliser PM2 pour gérer le processus Node.js

## Configuration Nginx (Exemple)

```nginx
server {
    listen 80;
    server_name katymurr.com;

    # Frontend
    location / {
        root /var/www/katymurr/client/dist;
        try_files $uri $uri/ /index.html;
    }

    # API
    location /api {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Sécurité

1. Activer HTTPS avec Let's Encrypt
2. Configurer les CORS correctement
3. Utiliser des secrets forts pour JWT
4. Limiter les taux de requêtes (déjà configuré)
5. Valider toutes les entrées utilisateur

## Maintenance

- Sauvegarder régulièrement la base de données Supabase
- Surveiller les logs d'erreur
- Mettre à jour les dépendances régulièrement
- Tester les fonctionnalités après chaque déploiement

