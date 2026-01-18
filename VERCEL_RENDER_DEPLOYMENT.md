# 🚀 Guide de Déploiement Vercel + Render + Git

## 📋 Vue d'ensemble

- **Frontend (React/Vite)** → **Vercel** (gratuit, URL permanente)
- **Backend (Express)** → **Render** (gratuit, URL permanente)
- **Code Source** → **GitHub** (gratuit)

---

## 🔧 Étape 1 : Préparer le Projet Git

### 1.1 Initialiser Git (si pas déjà fait)

```powershell
# Dans le dossier racine du projet
git init
git add .
git commit -m "Initial commit"
```

### 1.2 Créer un Repository GitHub

1. Allez sur https://github.com
2. Créez un nouveau repository (ex: `katymurr-website`)
3. **Ne cochez PAS** "Initialize with README"

### 1.3 Connecter le Projet Local à GitHub

```powershell
git remote add origin https://github.com/VOTRE_USERNAME/katymurr-website.git
git branch -M main
git push -u origin main
```

---

## 🎨 Étape 2 : Déployer le Frontend sur Vercel

### 2.1 Installer Vercel CLI

```powershell
npm install -g vercel
```

### 2.2 Se Connecter à Vercel

```powershell
vercel login
```

Suivez les instructions pour vous connecter avec GitHub.

### 2.3 Déployer le Frontend

```powershell
# Depuis la racine du projet
vercel
```

Répondez aux questions :
- **Set up and deploy?** → `Y`
- **Which scope?** → Sélectionnez votre compte
- **Link to existing project?** → `N`
- **What's your project's name?** → `katymurr-client` (ou autre)
- **In which directory is your code located?** → `./client`
- **Want to override the settings?** → `N`

### 2.4 Configurer les Variables d'Environnement

Sur https://vercel.com/dashboard :

1. Allez dans votre projet `katymurr-client`
2. Settings → Environment Variables
3. Ajoutez ces variables :

```
VITE_API_URL=https://katymurr-api.onrender.com/api
VITE_SUPABASE_URL=https://votre-projet.supabase.co
VITE_SUPABASE_ANON_KEY=votre-anon-key
```

**Important** : Pour chaque variable, sélectionnez :
- ✅ Production
- ✅ Preview
- ✅ Development

### 2.5 Redéployer avec les Variables

```powershell
vercel --prod
```

Vous obtiendrez une URL comme : `https://katymurr-client.vercel.app`

---

## ⚙️ Étape 3 : Déployer le Backend sur Render

### 3.1 Créer un Compte Render

1. Allez sur https://render.com
2. Créez un compte (utilisez GitHub pour connexion facile)
3. Connectez votre compte GitHub

### 3.2 Créer un Nouveau Web Service

1. Dans le dashboard Render, cliquez sur **"New +"**
2. Sélectionnez **"Web Service"**
3. Connectez votre repository GitHub `katymurr-website`

### 3.3 Configurer le Service

Remplissez les champs :

- **Name** : `katymurr-api`
- **Region** : `Frankfurt` (ou le plus proche de vous)
- **Branch** : `main`
- **Root Directory** : `server` (important !)
- **Environment** : `Node`
- **Build Command** : `npm install`
- **Start Command** : `npm start`

### 3.4 Configurer les Variables d'Environnement

Dans la section "Environment Variables", ajoutez :

```
NODE_ENV=production
PORT=3001
SUPABASE_URL=https://votre-projet.supabase.co
SUPABASE_KEY=votre-service-role-key
CLIENT_URL=https://katymurr-client.vercel.app
BASE_URL=https://katymurr-api.onrender.com
```

**Important** : Remplacez `katymurr-client.vercel.app` par votre vraie URL Vercel.

### 3.5 Créer le Service

Cliquez sur **"Create Web Service"**

Render va :
1. Cloner votre repo
2. Installer les dépendances
3. Démarrer votre backend
4. Vous donner une URL : `https://katymurr-api.onrender.com`

**Note** : Le premier déploiement peut prendre 5-10 minutes.

---

## 🔄 Étape 4 : Mettre à Jour les URLs

### 4.1 Mettre à Jour Vercel avec l'URL Render

Une fois que Render a donné l'URL du backend, mettez à jour Vercel :

1. Allez sur https://vercel.com/dashboard
2. Votre projet → Settings → Environment Variables
3. Modifiez `VITE_API_URL` :
   ```
   VITE_API_URL=https://katymurr-api.onrender.com/api
   ```
   (Remplacez par votre vraie URL Render)

4. Redéployez :
   ```powershell
   vercel --prod
   ```

### 4.2 Mettre à Jour Render avec l'URL Vercel

1. Allez sur https://dashboard.render.com
2. Votre service → Environment
3. Modifiez `CLIENT_URL` :
   ```
   CLIENT_URL=https://katymurr-client.vercel.app
   ```
   (Remplacez par votre vraie URL Vercel)

4. Redéployez (Render redéploie automatiquement)

---

## 🔗 Étape 5 : Configuration Automatique (Optionnel)

### 5.1 Connecter Vercel à GitHub

Pour que Vercel déploie automatiquement à chaque push :

1. Allez sur https://vercel.com/dashboard
2. Votre projet → Settings → Git
3. Connectez votre repository GitHub
4. Configurez :
   - **Production Branch** : `main`
   - **Framework Preset** : `Vite`
   - **Root Directory** : `client`
   - **Build Command** : `npm run build`
   - **Output Directory** : `dist`

### 5.2 Render se Connecte Automatiquement

Render se connecte automatiquement à GitHub lors de la création du service.

---

## ✅ Vérification

### Vérifier le Backend

```bash
curl https://katymurr-api.onrender.com/api/health
```

Devrait retourner :
```json
{"status":"ok","timestamp":"..."}
```

### Vérifier le Frontend

Ouvrez votre URL Vercel dans le navigateur :
```
https://katymurr-client.vercel.app
```

Le site devrait se charger et les requêtes API devraient fonctionner.

---

## 🔄 Workflow de Déploiement

### Développement Local

```powershell
# Développer en local
npm run dev

# Tester avec ngrok si besoin
ngrok http 5173
```

### Déploiement

**Option 1 : Automatique (recommandé)**
```powershell
# Push sur GitHub
git add .
git commit -m "Vos modifications"
git push origin main

# Vercel et Render déploient automatiquement
```

**Option 2 : Manuel**

```powershell
# Frontend
vercel --prod

# Backend (via dashboard Render ou CLI)
```

---

## 📝 Fichiers de Configuration Créés

### `vercel.json`
Configuration Vercel pour le frontend avec :
- Build automatique
- Rewrites pour l'API
- Headers de sécurité

### `render.yaml`
Configuration Render pour le backend avec :
- Configuration du service web
- Variables d'environnement
- Health check

---

## 🐛 Dépannage

### Le Backend ne démarre pas sur Render

1. Vérifiez les logs dans le dashboard Render
2. Vérifiez que `server/package.json` a bien le script `start`
3. Vérifiez que toutes les variables d'environnement sont définies

### Le Frontend ne peut pas accéder à l'API

1. Vérifiez que `VITE_API_URL` dans Vercel pointe vers l'URL Render
2. Vérifiez que le backend Render est bien démarré
3. Vérifiez les logs Vercel pour les erreurs

### Erreurs CORS

1. Vérifiez que `CLIENT_URL` dans Render correspond à votre URL Vercel
2. Vérifiez la configuration CORS dans `server/index.js`

---

## 🔒 Sécurité

### Variables Sensibles

**Ne jamais commiter** :
- `.env` files
- Clés API
- Tokens

Utilisez les variables d'environnement des plateformes.

### Vérifier `.gitignore`

Assurez-vous que `.gitignore` contient :
```
.env
.env.local
.env.production
server/.env
client/.env
node_modules/
dist/
```

---

## 📊 Monitoring

### Vercel Analytics
- Disponible dans le dashboard Vercel
- Statistiques de visite
- Performance

### Render Logs
- Disponibles dans le dashboard Render
- Logs en temps réel
- Historique des déploiements

---

## 🎯 URLs Finales

Après le déploiement, vous aurez :

- **Frontend** : `https://katymurr-client.vercel.app`
- **Backend API** : `https://katymurr-api.onrender.com`
- **Health Check** : `https://katymurr-api.onrender.com/api/health`

Ces URLs sont **permanentes** et fonctionnent même si votre ordinateur est éteint !

---

## 🚀 Commandes Rapides

```powershell
# Développement local
npm run dev

# Déployer frontend
vercel --prod

# Push et déploiement automatique
git add .
git commit -m "Update"
git push origin main
```

---

## 💡 Astuces

1. **Domaine personnalisé** : Vous pouvez ajouter votre propre domaine sur Vercel (gratuit)

2. **Preview Deployments** : Vercel crée automatiquement une URL de preview pour chaque pull request

3. **Rollback** : Les deux plateformes permettent de revenir à une version précédente

4. **Monitoring** : Surveillez les logs pour détecter les problèmes rapidement

---

## ✅ Checklist de Déploiement

- [ ] Repository GitHub créé et connecté
- [ ] Vercel CLI installé et connecté
- [ ] Frontend déployé sur Vercel
- [ ] Variables d'environnement Vercel configurées
- [ ] Compte Render créé
- [ ] Backend déployé sur Render
- [ ] Variables d'environnement Render configurées
- [ ] URLs mises à jour (Vercel → Render, Render → Vercel)
- [ ] Health check backend fonctionne
- [ ] Frontend peut accéder à l'API
- [ ] Site fonctionne complètement

---

**🎉 Félicitations ! Votre site est maintenant en ligne avec des URLs permanentes !**

