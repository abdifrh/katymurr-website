# ✅ Checklist de Déploiement Vercel + Render

## 📋 Avant de Commencer

- [ ] Compte GitHub créé
- [ ] Compte Vercel créé (https://vercel.com)
- [ ] Compte Render créé (https://render.com)
- [ ] Repository GitHub créé

---

## 🔧 Configuration Git

- [ ] Git initialisé (`git init`)
- [ ] Fichiers ajoutés (`git add .`)
- [ ] Premier commit (`git commit -m "Initial commit"`)
- [ ] Repository GitHub créé
- [ ] Remote ajouté (`git remote add origin ...`)
- [ ] Code poussé sur GitHub (`git push -u origin main`)

---

## 🎨 Frontend (Vercel)

### Installation
- [ ] Vercel CLI installé (`npm install -g vercel`)
- [ ] Connecté à Vercel (`vercel login`)

### Déploiement
- [ ] Projet déployé (`vercel`)
- [ ] URL Vercel obtenue (ex: `katymurr-client.vercel.app`)

### Configuration
- [ ] Variables d'environnement ajoutées :
  - [ ] `VITE_API_URL` (sera mis à jour après déploiement Render)
  - [ ] `VITE_SUPABASE_URL`
  - [ ] `VITE_SUPABASE_ANON_KEY`
- [ ] Déploiement production (`vercel --prod`)

---

## ⚙️ Backend (Render)

### Configuration
- [ ] Compte Render créé
- [ ] Repository GitHub connecté
- [ ] Nouveau Web Service créé
- [ ] Configuration :
  - [ ] Name : `katymurr-api`
  - [ ] Root Directory : `server`
  - [ ] Environment : `Node`
  - [ ] Build Command : `npm install`
  - [ ] Start Command : `npm start`

### Variables d'Environnement
- [ ] `NODE_ENV=production`
- [ ] `PORT=3001`
- [ ] `SUPABASE_URL` (votre URL Supabase)
- [ ] `SUPABASE_KEY` (votre service role key)
- [ ] `CLIENT_URL` (URL Vercel - à mettre à jour)
- [ ] `BASE_URL` (URL Render - sera générée)

### Déploiement
- [ ] Service créé et déployé
- [ ] URL Render obtenue (ex: `katymurr-api.onrender.com`)
- [ ] Health check fonctionne (`/api/health`)

---

## 🔗 Mise à Jour des URLs

### Vercel
- [ ] `VITE_API_URL` mis à jour avec l'URL Render réelle
- [ ] Redéployé (`vercel --prod`)

### Render
- [ ] `CLIENT_URL` mis à jour avec l'URL Vercel réelle
- [ ] `BASE_URL` mis à jour avec l'URL Render réelle
- [ ] Service redéployé (automatique)

---

## ✅ Tests

### Backend
- [ ] Health check fonctionne : `curl https://katymurr-api.onrender.com/api/health`
- [ ] Retourne `{"status":"ok",...}`

### Frontend
- [ ] Site accessible : `https://katymurr-client.vercel.app`
- [ ] Page d'accueil se charge
- [ ] Menu se charge (vérifier Network tab)
- [ ] Contenu dynamique se charge
- [ ] Pas d'erreurs CORS dans la console

### Fonctionnalités
- [ ] Navigation fonctionne
- [ ] Changement de langue fonctionne
- [ ] Formulaire de contact fonctionne
- [ ] Admin dashboard accessible (si configuré)

---

## 🔄 Déploiement Automatique

### Vercel
- [ ] Repository GitHub connecté dans Vercel
- [ ] Auto-deploy activé
- [ ] Testé avec un commit

### Render
- [ ] Auto-deploy activé (par défaut)
- [ ] Testé avec un commit

---

## 📝 Documentation

- [ ] URLs notées quelque part
- [ ] Variables d'environnement documentées
- [ ] Guide de déploiement sauvegardé

---

## 🎉 Résultat Final

- [ ] Frontend accessible 24/7
- [ ] Backend accessible 24/7
- [ ] URLs permanentes fonctionnelles
- [ ] Déploiement automatique configuré
- [ ] Site fonctionne complètement

---

## 🐛 En Cas de Problème

### Backend ne démarre pas
1. Vérifier les logs Render
2. Vérifier les variables d'environnement
3. Vérifier que `server/package.json` a `"start": "node index.js"`

### Frontend ne charge pas
1. Vérifier les logs Vercel
2. Vérifier les variables d'environnement
3. Vérifier que le build fonctionne localement

### Erreurs CORS
1. Vérifier que `CLIENT_URL` dans Render = URL Vercel
2. Vérifier la configuration CORS dans `server/index.js`

### API ne répond pas
1. Vérifier que le backend Render est démarré
2. Vérifier que `VITE_API_URL` dans Vercel = URL Render + `/api`
3. Tester directement l'URL Render dans le navigateur

---

**Une fois toutes les cases cochées, votre site est en ligne ! 🚀**

