# 🔧 Correction du Problème TypeScript

## ❌ Problème

Quand vous tapez `npx tsc --version`, npm essaie d'installer un package `tsc` qui n'est pas le bon. Le vrai TypeScript est le package `typescript`.

## ✅ Solution

### 1. Installer les Dépendances du Client

```bash
# Aller dans le dossier client
cd /var/www/vhosts/relaxed-booth.217-154-15-57.plesk.page/httpdocs/client

# Supprimer node_modules si existe
rm -rf node_modules package-lock.json

# Installer toutes les dépendances (y compris TypeScript)
npm install

# Vérifier que TypeScript est installé
ls node_modules/.bin/tsc
# ou
./node_modules/.bin/tsc --version
```

### 2. Utiliser le Bon Chemin pour tsc

```bash
# Option A : Utiliser le chemin direct
./node_modules/.bin/tsc --version

# Option B : Utiliser npx avec typescript (pas tsc)
npx typescript --version

# Option C : Utiliser npx avec le chemin complet
npx --package=typescript tsc --version
```

### 3. Faire le Build

```bash
# Le script dans package.json devrait fonctionner maintenant
npm run build

# Si ça ne fonctionne toujours pas, utilisez npx explicitement
npx tsc && npx vite build
```

## 🔍 Vérification

```bash
# Vérifier que typescript est dans package.json
cat package.json | grep typescript

# Vérifier que node_modules contient typescript
ls node_modules/typescript

# Vérifier que le binaire tsc existe
ls node_modules/.bin/tsc
```

## 🚨 Si npm install ne fonctionne pas

### Vérifier Node.js Version

```bash
node --version
# Doit être >= 20.0.0

# Si pas, mettre à jour :
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### Nettoyer et Réinstaller

```bash
cd /var/www/vhosts/relaxed-booth.217-154-15-57.plesk.page/httpdocs/client

# Nettoyer complètement
rm -rf node_modules package-lock.json .npm

# Réinstaller
npm cache clean --force
npm install
```

## 📝 Alternative : Modifier le Script de Build

Si le problème persiste, modifiez temporairement `package.json` :

```bash
nano package.json
```

Changez :
```json
"build": "tsc && vite build"
```

En :
```json
"build": "npx tsc && npx vite build"
```

Ou :
```json
"build": "./node_modules/.bin/tsc && ./node_modules/.bin/vite build"
```

