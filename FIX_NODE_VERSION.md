# 🔧 Correction des Problèmes de Déploiement

## Problème 1 : Node.js Version Trop Ancienne

Vous avez Node.js 18.19.1 mais le projet nécessite >= 20.0.0

### Solution : Mettre à Jour Node.js

```bash
# Sur le serveur, via SSH

# 1. Installer NVM (Node Version Manager) - Recommandé
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Recharger le shell
source ~/.bashrc
# ou
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# 2. Installer Node.js 20 (LTS)
nvm install 20
nvm use 20
nvm alias default 20

# 3. Vérifier la version
node --version
# Devrait afficher v20.x.x

npm --version
```

### Alternative : Mettre à Jour Node.js Directement (sans NVM)

```bash
# Pour Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Vérifier
node --version
npm --version
```

---

## Problème 2 : TypeScript (tsc) Non Trouvé

Le problème vient du fait que les dépendances du client ne sont pas installées correctement.

### Solution : Réinstaller les Dépendances du Client

```bash
# Aller dans le dossier client
cd /var/www/vhosts/relaxed-booth.217-154-15-57.plesk.page/httpdocs/client

# Supprimer node_modules et package-lock.json (si existe)
rm -rf node_modules
rm -f package-lock.json

# Réinstaller les dépendances
npm install

# Vérifier que tsc est installé
./node_modules/.bin/tsc --version
# ou
npx tsc --version

# Maintenant, faire le build
npm run build
```

---

## 🔄 Solution Complète (Recommandée)

Exécutez ces commandes dans l'ordre :

```bash
# 1. Mettre à jour Node.js (si pas déjà fait)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# 2. Vérifier la version
node --version
# Doit être >= 20.0.0

# 3. Aller à la racine du projet
cd /var/www/vhosts/relaxed-booth.217-154-15-57.plesk.page/httpdocs

# 4. Réinstaller toutes les dépendances
# À la racine
rm -rf node_modules package-lock.json
npm install

# Dans server
cd server
rm -rf node_modules package-lock.json
npm install
cd ..

# Dans client
cd client
rm -rf node_modules package-lock.json
npm install

# 5. Vérifier que TypeScript est installé
npx tsc --version

# 6. Build le frontend
npm run build

# 7. Retourner à la racine et démarrer le serveur
cd ..
cd server
pm2 start index.js --name katymurr-api
pm2 save
```

---

## ⚠️ Note sur Multer

Vous avez un avertissement concernant Multer 1.x qui a des vulnérabilités. 

### Option 1 : Mettre à Jour Multer (Recommandé)

```bash
cd server
npm install multer@latest
```

Puis vérifiez que votre code est compatible avec Multer 2.x (généralement compatible).

### Option 2 : Garder la Version Actuelle (Temporaire)

L'avertissement est juste un warning, l'application fonctionnera mais il est recommandé de mettre à jour pour la sécurité.

---

## ✅ Vérification Finale

```bash
# Vérifier Node.js
node --version
# Doit être >= 20.0.0

# Vérifier npm
npm --version

# Vérifier TypeScript
cd client
npx tsc --version

# Vérifier que le build fonctionne
npm run build
# Le dossier dist/ doit être créé

# Vérifier que le serveur démarre
cd ../server
node index.js
# Si ça fonctionne, Ctrl+C puis :
pm2 start index.js --name katymurr-api
```

---

## 🐛 Si le Problème Persiste

### Vérifier les Permissions

```bash
# Donner les permissions au dossier
sudo chown -R $USER:$USER /var/www/vhosts/relaxed-booth.217-154-15-57.plesk.page/httpdocs
sudo chmod -R 755 /var/www/vhosts/relaxed-booth.217-154-15-57.plesk.page/httpdocs
```

### Vérifier le PATH

```bash
# Vérifier que node_modules/.bin est dans le PATH
echo $PATH

# Si nécessaire, ajouter au PATH (temporaire)
export PATH=$PATH:./node_modules/.bin
```

### Utiliser npx pour les commandes

```bash
# Au lieu de tsc directement, utiliser npx
npx tsc
npx vite build
```

