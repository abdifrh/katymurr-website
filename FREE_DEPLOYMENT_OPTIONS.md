# 🚀 Options de Déploiement Gratuit pour Preview

## ❌ Limitation de ngrok

**ngrok nécessite que votre ordinateur soit allumé** - ce n'est pas une solution permanente.

## ✅ Solutions Gratuites Recommandées

### 1. **Vercel** (⭐ Recommandé pour React)

**Avantages** :
- ✅ Gratuit et généreux
- ✅ Déploiement automatique depuis Git
- ✅ URL permanente (ex: `votre-projet.vercel.app`)
- ✅ SSL/HTTPS automatique
- ✅ Excellent pour React/Vite
- ✅ Preview pour chaque commit
- ✅ Support des variables d'environnement

**Limites gratuites** :
- 100 Go de bande passante/mois
- Fonctions serverless limitées

**Déploiement** :
```bash
# Option 1 : Via CLI (le plus simple)
npm install -g vercel
vercel

# Option 2 : Via GitHub (automatique)
# Connectez votre repo GitHub à Vercel
```

**Configuration** :
- Frontend : Déployez le dossier `client/`
- Backend : Déployez le dossier `server/` comme fonction serverless ou utilisez un service séparé

**URL** : https://vercel.com

---

### 2. **Netlify**

**Avantages** :
- ✅ Gratuit
- ✅ Déploiement automatique depuis Git
- ✅ URL permanente
- ✅ SSL/HTTPS automatique
- ✅ Excellent pour les sites statiques
- ✅ Functions serverless incluses

**Limites gratuites** :
- 100 Go de bande passante/mois
- 300 minutes de build/mois

**Déploiement** :
```bash
# Via CLI
npm install -g netlify-cli
netlify deploy --prod

# Ou via drag & drop sur netlify.com
```

**URL** : https://netlify.com

---

### 3. **Render** (⭐ Bon pour Full-Stack)

**Avantages** :
- ✅ Gratuit (avec limitations)
- ✅ Support frontend + backend
- ✅ URL permanente
- ✅ SSL automatique
- ✅ Base de données PostgreSQL gratuite (optionnel)
- ✅ Auto-deploy depuis Git

**Limites gratuites** :
- Services "spin down" après 15 min d'inactivité
- Premier démarrage peut être lent (~30-60s)

**Déploiement** :
1. Connectez votre repo GitHub
2. Créez un "Web Service" pour le backend
3. Créez un "Static Site" pour le frontend

**URL** : https://render.com

---

### 4. **Railway**

**Avantages** :
- ✅ Gratuit ($5 de crédit/mois)
- ✅ Support frontend + backend
- ✅ URL permanente
- ✅ SSL automatique
- ✅ Déploiement depuis Git
- ✅ Base de données PostgreSQL gratuite

**Limites gratuites** :
- $5 de crédit/mois (généralement suffisant pour un petit projet)
- Services peuvent s'arrêter si crédit épuisé

**URL** : https://railway.app

---

### 5. **Fly.io**

**Avantages** :
- ✅ Gratuit (généreux)
- ✅ Support frontend + backend
- ✅ URL permanente
- ✅ SSL automatique
- ✅ Déploiement depuis Git
- ✅ Global edge network

**Limites gratuites** :
- 3 VMs gratuites
- 160 Go de bande passante/mois

**URL** : https://fly.io

---

## 🎯 Recommandation pour Votre Projet

### Option A : Vercel (Frontend) + Render (Backend)

**Pourquoi** :
- Vercel est excellent pour React/Vite (frontend)
- Render peut héberger votre backend Express
- Les deux sont gratuits
- URLs permanentes

**Structure** :
```
Frontend (Vercel) → https://katymurr.vercel.app
Backend (Render)  → https://katymurr-api.onrender.com
```

### Option B : Render (Full-Stack)

**Pourquoi** :
- Tout en un seul endroit
- Plus simple à gérer
- Gratuit

**Structure** :
```
Frontend (Render Static) → https://katymurr.onrender.com
Backend (Render Web)     → https://katymurr-api.onrender.com
```

---

## 📋 Guide de Déploiement Vercel (Recommandé)

### Étape 1 : Préparer le Projet

Créez un fichier `vercel.json` à la racine :

```json
{
  "version": 2,
  "builds": [
    {
      "src": "client/package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/server/index.js"
    },
    {
      "src": "/(.*)",
      "dest": "/client/dist/$1"
    }
  ]
}
```

### Étape 2 : Installer Vercel CLI

```powershell
npm install -g vercel
```

### Étape 3 : Déployer

```powershell
# Se connecter
vercel login

# Déployer
vercel

# Pour la production
vercel --prod
```

### Étape 4 : Configurer les Variables d'Environnement

Sur le dashboard Vercel :
1. Allez dans Settings → Environment Variables
2. Ajoutez vos variables :
   - `VITE_API_URL` (URL de votre backend)
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

---

## 📋 Guide de Déploiement Render (Backend)

### Étape 1 : Préparer le Backend

Créez un fichier `render.yaml` à la racine :

```yaml
services:
  - type: web
    name: katymurr-api
    env: node
    buildCommand: cd server && npm install
    startCommand: cd server && npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: SUPABASE_URL
        sync: false
      - key: SUPABASE_KEY
        sync: false
      - key: PORT
        value: 3001
      - key: CLIENT_URL
        value: https://votre-frontend.vercel.app
```

### Étape 2 : Déployer sur Render

1. Créez un compte sur https://render.com
2. Connectez votre repo GitHub
3. Créez un nouveau "Web Service"
4. Sélectionnez votre repo
5. Configurez :
   - **Build Command** : `cd server && npm install`
   - **Start Command** : `cd server && npm start`
   - **Environment** : Node
6. Ajoutez vos variables d'environnement
7. Déployez !

---

## 🔄 Workflow Recommandé

### Développement Local
```powershell
npm run dev
# Utilisez ngrok pour tester rapidement
```

### Preview Permanent
```powershell
# Déployez sur Vercel/Render
# Obtenez une URL permanente
# Partagez avec vos clients
```

### Production
```powershell
# Déployez sur votre serveur VPS final
```

---

## 💡 Comparaison Rapide

| Service | Frontend | Backend | Gratuit | URL Permanente | Facile |
|---------|----------|---------|---------|----------------|--------|
| **Vercel** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ✅ | ✅ | ⭐⭐⭐⭐⭐ |
| **Netlify** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ✅ | ✅ | ⭐⭐⭐⭐⭐ |
| **Render** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ✅ | ✅ | ⭐⭐⭐⭐ |
| **Railway** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ✅* | ✅ | ⭐⭐⭐⭐ |
| **Fly.io** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ✅ | ✅ | ⭐⭐⭐ |

*$5 de crédit/mois

---

## 🚀 Déploiement Rapide Vercel (5 minutes)

### 1. Installer Vercel CLI

```powershell
npm install -g vercel
```

### 2. Se Connecter

```powershell
vercel login
```

### 3. Déployer le Frontend

```powershell
cd client
vercel
```

Suivez les instructions. Vercel va :
- Détecter automatiquement Vite
- Builder votre projet
- Vous donner une URL permanente

### 4. Configurer les Variables

Sur https://vercel.com/dashboard :
- Allez dans votre projet → Settings → Environment Variables
- Ajoutez :
  ```
  VITE_API_URL=https://votre-backend.onrender.com/api
  VITE_SUPABASE_URL=votre-url
  VITE_SUPABASE_ANON_KEY=votre-key
  ```

### 5. Redéployer

```powershell
vercel --prod
```

**C'est tout !** Vous avez maintenant une URL permanente comme :
`https://katymurr-client.vercel.app`

---

## 📝 Notes Importantes

1. **Backend séparé** : Pour le backend Express, utilisez Render ou Railway car Vercel est optimisé pour les fonctions serverless.

2. **Variables d'environnement** : N'oubliez pas de configurer toutes les variables nécessaires sur chaque plateforme.

3. **Base de données** : Votre Supabase reste le même, pas besoin de changer.

4. **Domaine personnalisé** : Tous ces services permettent d'ajouter votre propre domaine (gratuitement).

---

## 🎯 Ma Recommandation Finale

**Pour un preview permanent gratuit** :

1. **Frontend** → **Vercel** (le plus simple et rapide)
2. **Backend** → **Render** (gratuit, support Express)

**Temps de setup** : ~10-15 minutes
**Coût** : 0€
**URL permanente** : ✅ Oui

Voulez-vous que je vous guide étape par étape pour déployer sur Vercel ?

