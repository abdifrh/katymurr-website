# 📤 Guide de Transfert FTP - Fichiers à Envoyer

## ✅ Fichiers et Dossiers à Transférer

### Structure Complète à Transférer

```
WebApp/
├── client/
│   ├── public/              ✅ À TRANSFÉRER
│   ├── src/                 ✅ À TRANSFÉRER
│   ├── index.html           ✅ À TRANSFÉRER
│   ├── package.json         ✅ À TRANSFÉRER
│   ├── package-lock.json    ✅ À TRANSFÉRER
│   ├── vite.config.ts       ✅ À TRANSFÉRER
│   ├── tsconfig.json        ✅ À TRANSFÉRER
│   ├── tsconfig.node.json   ✅ À TRANSFÉRER
│   ├── tailwind.config.js   ✅ À TRANSFÉRER
│   ├── postcss.config.js    ✅ À TRANSFÉRER
│   └── .env.example         ✅ À TRANSFÉRER (pour référence)
│
├── server/
│   ├── routes/              ✅ À TRANSFÉRER
│   ├── middleware/          ✅ À TRANSFÉRER
│   ├── data/                ✅ À TRANSFÉRER (fichiers SQL)
│   ├── index.js             ✅ À TRANSFÉRER
│   ├── package.json         ✅ À TRANSFÉRER
│   ├── package-lock.json    ✅ À TRANSFÉRER
│   ├── supabase-schema.sql ✅ À TRANSFÉRER
│   ├── supabase-schema-settings.sql ✅ À TRANSFÉRER
│   └── .env.example         ✅ À TRANSFÉRER (pour référence)
│
├── package.json             ✅ À TRANSFÉRER
├── package-lock.json        ✅ À TRANSFÉRER
│
└── Documentation (optionnel)
    ├── VPS_DEPLOYMENT.md    ✅ Utile pour référence
    ├── DEPLOYMENT_CHECKLIST.md ✅ Utile pour référence
    └── *.md                  (optionnel)
```

## ❌ Fichiers à NE PAS Transférer

### Ne PAS envoyer :

```
❌ node_modules/              (sera installé sur le serveur)
❌ client/node_modules/       (sera installé sur le serveur)
❌ server/node_modules/       (sera installé sur le serveur)
❌ client/dist/               (sera généré par le build)
❌ .env                       (à créer manuellement sur le serveur)
❌ server/.env                (à créer manuellement sur le serveur)
❌ client/.env                (à créer manuellement sur le serveur)
❌ .git/                      (si vous utilisez Git)
❌ .vscode/                   (configuration IDE)
❌ .idea/                     (configuration IDE)
❌ *.log                      (fichiers de logs)
❌ .DS_Store                  (macOS)
❌ Thumbs.db                  (Windows)
```

## 📋 Liste Détaillée des Fichiers Essentiels

### 1. Dossier `client/` (Frontend React)

**Fichiers de configuration :**
- `package.json`
- `package-lock.json`
- `vite.config.ts`
- `tsconfig.json`
- `tsconfig.node.json`
- `tailwind.config.js`
- `postcss.config.js`
- `index.html`

**Dossiers à transférer :**
- `src/` (tout le dossier avec tous les sous-dossiers)
- `public/` (tout le dossier)

**À créer sur le serveur :**
- `client/.env` (créer manuellement avec vos valeurs)

### 2. Dossier `server/` (Backend Express)

**Fichiers principaux :**
- `index.js`
- `package.json`
- `package-lock.json`

**Dossiers à transférer :**
- `routes/` (tous les fichiers .js)
- `middleware/` (tous les fichiers .js)
- `data/` (tous les fichiers SQL)

**Fichiers SQL (utiles pour référence) :**
- `supabase-schema.sql`
- `supabase-schema-settings.sql`
- `supabase-schema-extended.sql` (si existe)

**À créer sur le serveur :**
- `server/.env` (créer manuellement avec vos valeurs)

### 3. Racine du Projet

**Fichiers essentiels :**
- `package.json`
- `package-lock.json`

## 🚀 Étapes de Transfert FTP

### Option 1 : Transfert Manuel (FileZilla, WinSCP, etc.)

1. **Connectez-vous à votre serveur via FTP/SFTP**

2. **Créez le dossier de destination** (ex: `/var/www/katymurr`)

3. **Transférez les fichiers suivants :**

   ```
   ✅ client/ (sans node_modules et dist)
   ✅ server/ (sans node_modules)
   ✅ package.json
   ✅ package-lock.json
   ```

4. **Structure sur le serveur après transfert :**
   ```
   /var/www/katymurr/
   ├── client/
   │   ├── src/
   │   ├── public/
   │   ├── package.json
   │   └── ... (autres fichiers de config)
   ├── server/
   │   ├── routes/
   │   ├── middleware/
   │   ├── data/
   │   ├── index.js
   │   └── package.json
   └── package.json
   ```

### Option 2 : Archive ZIP (Recommandé)

1. **Sur votre machine locale, créez une archive :**

   **Windows (PowerShell) :**
   ```powershell
   # Créer une archive sans node_modules et autres fichiers inutiles
   Compress-Archive -Path client,server,package.json,package-lock.json -DestinationPath katymurr-deploy.zip -Force
   ```

   **Linux/Mac :**
   ```bash
   # Créer une archive
   tar -czf katymurr-deploy.tar.gz \
     --exclude='node_modules' \
     --exclude='client/node_modules' \
     --exclude='server/node_modules' \
     --exclude='client/dist' \
     --exclude='.env' \
     --exclude='server/.env' \
     --exclude='client/.env' \
     --exclude='.git' \
     client/ server/ package.json package-lock.json
   ```

2. **Transférez l'archive sur le serveur**

3. **Sur le serveur, extrayez l'archive :**
   ```bash
   # Pour ZIP
   unzip katymurr-deploy.zip -d /var/www/katymurr
   
   # Pour TAR.GZ
   tar -xzf katymurr-deploy.tar.gz -C /var/www/katymurr
   ```

## ⚠️ IMPORTANT : Build Avant ou Après le Transfert ?

### ✅ **Recommandation : Build SUR LE SERVEUR** (après transfert)

**Pourquoi ?**
- ✅ Les fichiers sources sont plus petits à transférer
- ✅ Le build se fait dans l'environnement de production (meilleure compatibilité)
- ✅ Plus facile de mettre à jour (juste pull/transfert, puis rebuild)
- ✅ Pas besoin de transférer le dossier `dist/` (généré sur le serveur)

**Processus :**
1. Transférer les fichiers sources (sans `dist/`)
2. Sur le serveur : installer les dépendances
3. Sur le serveur : faire le build (`npm run build`)
4. Le dossier `dist/` sera créé sur le serveur

### ❌ **Alternative : Build AVANT le transfert** (non recommandé)

Si vous buildez avant :
- ❌ Vous devez transférer le dossier `client/dist/` (plus volumineux)
- ❌ Risque de problèmes de compatibilité entre votre machine et le serveur
- ❌ Plus difficile à maintenir

**Si vous choisissez cette option :**
- Buildez : `cd client && npm run build`
- Transférez aussi le dossier `client/dist/`
- Sur le serveur, servez directement depuis `client/dist/`

## 📝 Après le Transfert FTP

Une fois les fichiers transférés sur le serveur :

### 1. Créer les fichiers `.env`

**Sur le serveur, créez `server/.env` :**
```bash
nano /var/www/katymurr/server/.env
```

```env
SUPABASE_URL=https://fyqwjbkjrcezzfzffqjp.supabase.co
SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ5cXdqYmtqcmNlenpmemZmcWpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg2NDM4MzMsImV4cCI6MjA4NDIxOTgzM30.DLJMxZSwwYB5JthwAuBtiZjlawO1sM5IRvvKZeUU_iE
PORT=3001
CLIENT_URL=http://VOTRE_IP
BASE_URL=http://VOTRE_IP
JWT_SECRET=$(openssl rand -base64 32)
NODE_ENV=production
```

**Créez `client/.env` :**
```bash
nano /var/www/katymurr/client/.env
```

```env
VITE_API_URL=http://VOTRE_IP/api
VITE_SUPABASE_URL=https://fyqwjbkjrcezzfzffqjp.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ5cXdqYmtqcmNlenpmemZmcWpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg2NDM4MzMsImV4cCI6MjA4NDIxOTgzM30.DLJMxZSwwYB5JthwAuBtiZjlawO1sM5IRvvKZeUU_iE
```

### 2. Installer les Dépendances

```bash
cd /var/www/katymurr
npm run install:all
```

### 3. Build le Frontend

```bash
cd /var/www/katymurr/client
npm run build
```

### 4. Démarrer le Backend

```bash
cd /var/www/katymurr/server
pm2 start index.js --name katymurr-api
pm2 save
```

## ✅ Checklist de Transfert

- [ ] Dossier `client/` transféré (sans node_modules et dist)
- [ ] Dossier `server/` transféré (sans node_modules)
- [ ] `package.json` et `package-lock.json` à la racine transférés
- [ ] Fichiers `.env` créés sur le serveur (pas transférés)
- [ ] Dépendances installées sur le serveur
- [ ] Frontend buildé
- [ ] Backend démarré avec PM2

## 🔍 Vérification Rapide

Après le transfert, vérifiez que la structure est correcte :

```bash
# Sur le serveur
cd /var/www/katymurr
ls -la

# Devrait afficher :
# client/
# server/
# package.json
# package-lock.json

# Vérifier le contenu de client/
ls -la client/
# Devrait avoir : src/, public/, package.json, etc.

# Vérifier le contenu de server/
ls -la server/
# Devrait avoir : routes/, middleware/, index.js, package.json, etc.
```

## 💡 Astuce : Script de Préparation

Créez un script pour préparer les fichiers à transférer :

**Windows (prepare-deploy.ps1) :**
```powershell
# Créer un dossier temporaire
New-Item -ItemType Directory -Force -Path "deploy-temp"

# Copier les fichiers nécessaires
Copy-Item -Path "client" -Destination "deploy-temp\client" -Recurse -Exclude "node_modules","dist",".env"
Copy-Item -Path "server" -Destination "deploy-temp\server" -Recurse -Exclude "node_modules",".env"
Copy-Item -Path "package.json" -Destination "deploy-temp\"
Copy-Item -Path "package-lock.json" -Destination "deploy-temp\"

# Créer l'archive
Compress-Archive -Path "deploy-temp\*" -DestinationPath "katymurr-deploy.zip" -Force

# Nettoyer
Remove-Item -Path "deploy-temp" -Recurse -Force

Write-Host "Archive créée : katymurr-deploy.zip"
```

**Linux/Mac (prepare-deploy.sh) :**
```bash
#!/bin/bash
tar -czf katymurr-deploy.tar.gz \
  --exclude='node_modules' \
  --exclude='client/node_modules' \
  --exclude='server/node_modules' \
  --exclude='client/dist' \
  --exclude='.env' \
  --exclude='server/.env' \
  --exclude='client/.env' \
  --exclude='.git' \
  client/ server/ package.json package-lock.json

echo "Archive créée : katymurr-deploy.tar.gz"
```

