# Démarrage Rapide - Katy Murr Website

## 🚀 Démarrer l'Application

### Option 1 : Démarrer les deux serveurs (Recommandé)

À la **racine du projet** :

```bash
npm run dev
```

Cela démarre :
- ✅ Backend sur `http://localhost:3001`
- ✅ Frontend sur `http://localhost:5173`

### Option 2 : Démarrer séparément

**Terminal 1 - Backend :**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend :**
```bash
cd client
npm run dev
```

## ⚠️ Erreurs Courantes

### ERR_CONNECTION_REFUSED

**Problème** : Le serveur backend n'est pas démarré.

**Solution** :
1. Ouvrez un terminal
2. Allez dans le dossier `server` : `cd server`
3. Démarrez le serveur : `npm run dev`
4. Vous devriez voir : `Server running on port 3001`

### Port déjà utilisé

Si le port 3001 est déjà utilisé :

1. Changez le port dans `server/.env` :
   ```env
   PORT=3002
   ```

2. Mettez à jour `client/.env` :
   ```env
   VITE_API_URL=http://localhost:3002/api
   ```

3. Redémarrez les serveurs

## 📋 Vérification

Une fois les serveurs démarrés :

- ✅ Backend : `http://localhost:3001/api/health` devrait retourner `{"status":"ok"}`
- ✅ Frontend : `http://localhost:5173` devrait afficher le site
- ✅ Admin : `http://localhost:5173/admin/login` devrait afficher la page de connexion

## 🔧 Commandes Utiles

```bash
# Installer toutes les dépendances
npm run install:all

# Démarrer en développement
npm run dev

# Build pour production
npm run build

# Démarrer en production
npm start
```

## 📝 Notes

- Le backend doit être démarré **avant** d'utiliser le dashboard admin
- Les uploads de fichiers nécessitent que le backend soit en cours d'exécution
- Vérifiez toujours que les deux serveurs sont démarrés avant de tester

