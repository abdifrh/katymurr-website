# 🌐 Configuration ngrok pour Développement Local

## 📋 Prérequis

1. **Compte ngrok** (gratuit) : https://ngrok.com/
2. **ngrok installé** sur votre machine
3. **Application en cours d'exécution** en local

---

## 🔧 Étape 1 : Installer ngrok

### Windows

**Option A : Via Chocolatey**
```powershell
choco install ngrok
```

**Option B : Téléchargement manuel**
1. Allez sur https://ngrok.com/download
2. Téléchargez ngrok pour Windows
3. Extrayez l'exécutable dans un dossier (ex: `C:\ngrok`)
4. Ajoutez le dossier au PATH Windows

**Option C : Via npm (global)**
```powershell
npm install -g ngrok
```

### Vérifier l'installation

```powershell
ngrok version
```

---

## 🔑 Étape 2 : Obtenir votre Token ngrok

1. Créez un compte sur https://ngrok.com/ (gratuit)
2. Connectez-vous à votre dashboard
3. Allez dans "Your Authtoken"
4. Copiez votre token

### Configurer le token

```powershell
ngrok config add-authtoken VOTRE_TOKEN_ICI
```

---

## 🚀 Étape 3 : Exposer votre Application

### Configuration Vite

La configuration Vite a été mise à jour pour exposer le serveur sur le réseau local. Le fichier `client/vite.config.ts` contient maintenant `host: true`.

### Démarrer l'Application

```powershell
# Dans le dossier racine du projet
npm run dev
```

Vous devriez voir :
```
➜  Local:   http://localhost:5173/
➜  Network: http://192.168.x.x:5173/
```

### Exposer avec ngrok

**Dans un nouveau terminal**, lancez ngrok :

```powershell
# Exposer le frontend (port 5173)
ngrok http 5173
```

Vous obtiendrez une URL comme :
```
Forwarding   https://xxxx-xxxx-xxxx.ngrok-free.app -> http://localhost:5173
```

### Exposer aussi le Backend (Optionnel)

Si vous voulez exposer directement le backend API :

```powershell
# Dans un autre terminal
ngrok http 3001
```

---

## ⚙️ Étape 4 : Configuration des Variables d'Environnement

### Pour le Frontend (client/.env)

Si vous utilisez ngrok, vous devrez peut-être mettre à jour l'URL de l'API :

```env
# URL ngrok du backend (si vous exposez le backend séparément)
VITE_API_URL=https://xxxx-xxxx-xxxx.ngrok-free.app/api

# Ou utiliser le proxy Vite (recommandé - pas besoin de changer)
# VITE_API_URL=http://localhost:5173/api
```

**Note** : Avec le proxy Vite configuré, vous n'avez généralement pas besoin de changer `VITE_API_URL` car les requêtes `/api` sont automatiquement proxyfiées vers `localhost:3001`.

### Pour le Backend (server/.env)

Si vous exposez le backend avec ngrok, mettez à jour :

```env
CLIENT_URL=https://xxxx-xxxx-xxxx.ngrok-free.app
BASE_URL=https://xxxx-xxxx-xxxx.ngrok-free.app
```

---

## 🎯 Configuration Recommandée

### Option 1 : Exposer uniquement le Frontend (Recommandé)

Le frontend Vite proxy automatiquement les requêtes `/api` vers le backend local.

1. **Démarrer l'application** :
   ```powershell
   npm run dev
   ```

2. **Exposer avec ngrok** :
   ```powershell
   ngrok http 5173
   ```

3. **Utiliser l'URL ngrok** pour accéder à votre site

**Avantages** :
- ✅ Simple (un seul tunnel ngrok)
- ✅ Le proxy Vite gère automatiquement les requêtes API
- ✅ Pas besoin de modifier les variables d'environnement

### Option 2 : Exposer Frontend et Backend séparément

1. **Démarrer l'application** :
   ```powershell
   npm run dev
   ```

2. **Exposer le frontend** :
   ```powershell
   ngrok http 5173
   ```

3. **Exposer le backend** (dans un autre terminal) :
   ```powershell
   ngrok http 3001
   ```

4. **Mettre à jour `client/.env`** :
   ```env
   VITE_API_URL=https://backend-xxxx.ngrok-free.app/api
   ```

---

## 🔒 Configuration CORS (si nécessaire)

Si vous avez des problèmes CORS, vérifiez `server/index.js` :

```javascript
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));
```

Assurez-vous que `CLIENT_URL` dans `server/.env` contient l'URL ngrok du frontend.

---

## 📝 Scripts Utiles

### Créer un script pour démarrer ngrok automatiquement

**Windows (start-ngrok.ps1)** :

```powershell
# Démarrer ngrok pour le frontend
Start-Process ngrok -ArgumentList "http 5173" -WindowStyle Normal

Write-Host "ngrok démarré pour le port 5173" -ForegroundColor Green
Write-Host "Vérifiez l'URL dans la fenêtre ngrok" -ForegroundColor Yellow
```

**Linux/Mac (start-ngrok.sh)** :

```bash
#!/bin/bash
ngrok http 5173
```

---

## 🧪 Tester

1. **Démarrer l'application** :
   ```powershell
   npm run dev
   ```

2. **Démarrer ngrok** :
   ```powershell
   ngrok http 5173
   ```

3. **Copier l'URL ngrok** (ex: `https://xxxx.ngrok-free.app`)

4. **Ouvrir dans un navigateur** ou partager avec d'autres

5. **Vérifier que tout fonctionne** :
   - Le site se charge
   - Les requêtes API fonctionnent
   - Les images se chargent

---

## ⚠️ Notes Importantes

1. **URL ngrok change à chaque démarrage** (gratuit) :
   - L'URL change à chaque fois que vous redémarrez ngrok
   - Pour une URL fixe, utilisez ngrok Pro

2. **Avertissement ngrok** :
   - La version gratuite affiche un avertissement sur la page
   - Pour le retirer, utilisez ngrok Pro

3. **Limites de la version gratuite** :
   - 1 tunnel simultané
   - URL change à chaque démarrage
   - Limite de bande passante

4. **Sécurité** :
   - Ne partagez pas votre URL ngrok publiquement
   - Utilisez uniquement pour le développement/test

---

## 🔄 Workflow Recommandé

1. **Développement local** :
   ```powershell
   npm run dev
   ```
   Accès : `http://localhost:5173`

2. **Test avec ngrok** (quand nécessaire) :
   ```powershell
   # Terminal 1
   npm run dev
   
   # Terminal 2
   ngrok http 5173
   ```
   Accès : URL ngrok fournie

3. **Production** :
   - Déployer sur le serveur
   - Utiliser le domaine réel

---

## 🐛 Dépannage

### ngrok ne démarre pas

```powershell
# Vérifier que ngrok est installé
ngrok version

# Vérifier le token
ngrok config check
```

### Erreurs CORS

Vérifiez que `CLIENT_URL` dans `server/.env` correspond à l'URL ngrok du frontend.

### Le proxy ne fonctionne pas

Vérifiez que le proxy est bien configuré dans `client/vite.config.ts` :

```typescript
proxy: {
  '/api': {
    target: 'http://localhost:3001',
    changeOrigin: true
  }
}
```

### Port déjà utilisé

Si le port 5173 est déjà utilisé :

```powershell
# Changer le port dans vite.config.ts
server: {
  port: 5174, // ou un autre port
  host: true
}
```

Puis :
```powershell
ngrok http 5174
```

---

## 📚 Ressources

- Documentation ngrok : https://ngrok.com/docs
- Dashboard ngrok : https://dashboard.ngrok.com/
- Vite Server Options : https://vitejs.dev/config/server-options.html

