# ⚡ Déploiement Rapide Vercel + Render

## 🚀 En 5 Étapes

### 1️⃣ Préparer Git

```powershell
# Si pas déjà fait
git init
git add .
git commit -m "Initial commit"

# Créer un repo sur GitHub, puis :
git remote add origin https://github.com/VOTRE_USERNAME/katymurr-website.git
git push -u origin main
```

### 2️⃣ Déployer Frontend (Vercel)

```powershell
# Installer Vercel CLI
npm install -g vercel

# Se connecter
vercel login

# Déployer
cd client
vercel

# Répondre aux questions :
# - Link to existing project? → N
# - Project name? → katymurr-client
# - Directory? → ./
```

**Puis sur https://vercel.com/dashboard** :
- Settings → Environment Variables
- Ajoutez :
  ```
  VITE_API_URL=https://katymurr-api.onrender.com/api
  VITE_SUPABASE_URL=votre-url
  VITE_SUPABASE_ANON_KEY=votre-key
  ```

### 3️⃣ Déployer Backend (Render)

1. Allez sur https://render.com
2. Créez un compte (avec GitHub)
3. "New +" → "Web Service"
4. Connectez votre repo GitHub
5. Configurez :
   - **Name** : `katymurr-api`
   - **Root Directory** : `server`
   - **Environment** : `Node`
   - **Build Command** : `npm install`
   - **Start Command** : `npm start`
6. Variables d'environnement :
   ```
   NODE_ENV=production
   PORT=3001
   SUPABASE_URL=votre-url
   SUPABASE_KEY=votre-key
   CLIENT_URL=https://katymurr-client.vercel.app
   BASE_URL=https://katymurr-api.onrender.com
   ```
7. "Create Web Service"

### 4️⃣ Mettre à Jour les URLs

**Dans Vercel** : Mettez à jour `VITE_API_URL` avec l'URL Render réelle
**Dans Render** : Mettez à jour `CLIENT_URL` avec l'URL Vercel réelle

### 5️⃣ Redéployer

```powershell
# Frontend
vercel --prod

# Backend (automatique sur Render après modification des variables)
```

**C'est tout !** 🎉

---

## 📝 URLs Finales

- Frontend : `https://katymurr-client.vercel.app`
- Backend : `https://katymurr-api.onrender.com`

Ces URLs sont **permanentes** et fonctionnent 24/7 !
