# 🚀 Guide de Déploiement FTP + SSH

## 📋 Prérequis

- Accès FTP/SFTP à votre serveur
- Accès SSH à votre serveur
- Node.js installé sur le serveur (version 18+)
- PM2 installé globalement (pour gérer le processus)
- Nginx ou Apache configuré (pour servir le frontend)

---

## 📦 ÉTAPE 1 : Préparer les Fichiers Locaux

### 1.1 Build le Frontend (Optionnel - Recommandé de build sur le serveur)

```bash
cd client
npm run build
```

### 1.2 Créer une Archive des Fichiers

**Windows (PowerShell) :**
```powershell
# Créer une archive sans node_modules
Compress-Archive -Path client,server,package.json,package-lock.json -DestinationPath katymurr-deploy.zip -Force
```

**Linux/Mac :**
```bash
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

---

## 📤 ÉTAPE 2 : Transfert FTP

### 2.1 Se Connecter via FTP

Utilisez un client FTP (FileZilla, WinSCP, Cyberduck, etc.) :

- **Hôte** : Votre adresse IP ou domaine
- **Port** : 21 (FTP) ou 22 (SFTP)
- **Utilisateur** : Votre nom d'utilisateur
- **Mot de passe** : Votre mot de passe

### 2.2 Structure sur le Serveur

Créez le dossier de destination (ex: `/var/www/katymurr` ou `/home/votre-user/katymurr`)

### 2.3 Transférer les Fichiers

**Option A : Transférer l'archive**
- Transférez `katymurr-deploy.zip` ou `katymurr-deploy.tar.gz`
- Sur le serveur, extrayez l'archive

**Option B : Transférer les dossiers directement**
- Transférez `client/` (sans `node_modules` et `dist`)
- Transférez `server/` (sans `node_modules`)
- Transférez `package.json` et `package-lock.json`

---

## 🔐 ÉTAPE 3 : Connexion SSH

### 3.1 Se Connecter au Serveur

```bash
ssh utilisateur@votre-serveur-ip
# ou
ssh utilisateur@votre-domaine.com
```

### 3.2 Naviguer vers le Dossier du Projet

```bash
cd /var/www/katymurr
# ou
cd ~/katymurr
```

### 3.3 Extraire l'Archive (si vous avez transféré une archive)

```bash
# Pour ZIP
unzip katymurr-deploy.zip

# Pour TAR.GZ
tar -xzf katymurr-deploy.tar.gz
```

---

## ⚙️ ÉTAPE 4 : Configuration

### 4.1 Créer le Fichier `.env` du Serveur

```bash
nano server/.env
```

Ajoutez le contenu suivant (remplacez les valeurs) :

```env
# Supabase
SUPABASE_URL=https://votre-projet.supabase.co
SUPABASE_KEY=votre-service-role-key

# Serveur
PORT=3001
CLIENT_URL=https://katymurr.com
BASE_URL=https://katymurr.com

# Environnement
NODE_ENV=production
```

Sauvegarder : `Ctrl + O`, puis `Enter`, puis `Ctrl + X`

### 4.2 Créer le Fichier `.env` du Client

```bash
nano client/.env
```

```env
VITE_API_URL=https://katymurr.com/api
VITE_SUPABASE_URL=https://votre-projet.supabase.co
VITE_SUPABASE_ANON_KEY=votre-anon-key
```

---

## 📥 ÉTAPE 5 : Installation des Dépendances

### 5.1 Installer Node.js (si pas déjà installé)

```bash
# Vérifier la version
node --version

# Si pas installé, installer Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### 5.2 Installer les Dépendances

```bash
# À la racine du projet
npm install

# Dans le dossier server
cd server
npm install

# Dans le dossier client
cd ../client
npm install
```

---

## 🏗️ ÉTAPE 6 : Build du Frontend

```bash
cd /var/www/katymurr/client
npm run build
```

Le dossier `dist/` sera créé avec les fichiers statiques.

---

## 🚀 ÉTAPE 7 : Démarrer l'Application

### 7.1 Installer PM2 (si pas déjà installé)

```bash
sudo npm install -g pm2
```

### 7.2 Démarrer le Serveur Backend

```bash
cd /var/www/katymurr/server
pm2 start index.js --name katymurr-api
```

### 7.3 Vérifier que le Serveur Tourne

```bash
pm2 status
pm2 logs katymurr-api
```

### 7.4 Sauvegarder la Configuration PM2

```bash
pm2 save
pm2 startup
```

Suivez les instructions pour configurer PM2 au démarrage du serveur.

---

## 🌐 ÉTAPE 8 : Configuration Nginx/Apache

### 8.1 Configuration Nginx

```bash
sudo nano /etc/nginx/sites-available/katymurr
```

Ajoutez cette configuration :

```nginx
server {
    listen 80;
    server_name katymurr.com www.katymurr.com;

    # Redirection HTTPS (si vous avez SSL)
    # return 301 https://$server_name$request_uri;

    # Frontend (fichiers statiques)
    location / {
        root /var/www/katymurr/client/dist;
        try_files $uri $uri/ /index.html;
        index index.html;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Sitemap
    location /sitemap.xml {
        proxy_pass http://localhost:3001/sitemap.xml;
    }
}
```

Activer le site :

```bash
sudo ln -s /etc/nginx/sites-available/katymurr /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 8.2 Configuration Apache (Alternative)

```bash
sudo nano /etc/apache2/sites-available/katymurr.conf
```

```apache
<VirtualHost *:80>
    ServerName katymurr.com
    ServerAlias www.katymurr.com

    # Frontend
    DocumentRoot /var/www/katymurr/client/dist

    <Directory /var/www/katymurr/client/dist>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
        RewriteEngine On
        RewriteBase /
        RewriteRule ^index\.html$ - [L]
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule . /index.html [L]
    </Directory>

    # Backend API
    ProxyPass /api http://localhost:3001/api
    ProxyPassReverse /api http://localhost:3001/api

    # Sitemap
    ProxyPass /sitemap.xml http://localhost:3001/sitemap.xml
    ProxyPassReverse /sitemap.xml http://localhost:3001/sitemap.xml
</VirtualHost>
```

Activer le site :

```bash
sudo a2ensite katymurr.conf
sudo a2enmod proxy proxy_http rewrite
sudo systemctl reload apache2
```

---

## ✅ ÉTAPE 9 : Vérification

### 9.1 Vérifier le Backend

```bash
curl http://localhost:3001/api/health
```

### 9.2 Vérifier le Frontend

Ouvrez votre navigateur et allez sur `http://votre-ip` ou `https://katymurr.com`

### 9.3 Vérifier PM2

```bash
pm2 status
pm2 logs katymurr-api --lines 50
```

---

## 🔄 Commandes Utiles PM2

```bash
# Voir tous les processus
pm2 list

# Voir les logs
pm2 logs katymurr-api

# Redémarrer
pm2 restart katymurr-api

# Arrêter
pm2 stop katymurr-api

# Supprimer
pm2 delete katymurr-api

# Monitoring
pm2 monit
```

---

## 🔄 Mise à Jour de l'Application

### 1. Transférer les Nouveaux Fichiers via FTP

### 2. Sur le Serveur, via SSH :

```bash
cd /var/www/katymurr

# Installer les nouvelles dépendances (si nécessaire)
npm install
cd server && npm install && cd ..
cd client && npm install && cd ..

# Rebuild le frontend
cd client
npm run build
cd ..

# Redémarrer le backend
pm2 restart katymurr-api
```

---

## 🐛 Dépannage

### Le Backend ne démarre pas

```bash
# Vérifier les logs
pm2 logs katymurr-api

# Vérifier que le port 3001 n'est pas utilisé
sudo netstat -tulpn | grep 3001

# Vérifier les variables d'environnement
cd server
cat .env
```

### Le Frontend ne s'affiche pas

```bash
# Vérifier que le build a réussi
ls -la client/dist

# Vérifier les permissions
sudo chown -R www-data:www-data client/dist
```

### Erreurs de Permissions

```bash
# Donner les permissions au dossier
sudo chown -R $USER:$USER /var/www/katymurr
sudo chmod -R 755 /var/www/katymurr
```

---

## 📝 Checklist de Déploiement

- [ ] Fichiers transférés via FTP
- [ ] Connexion SSH établie
- [ ] Fichiers `.env` créés (server et client)
- [ ] Dépendances installées (racine, server, client)
- [ ] Frontend buildé (`npm run build` dans client/)
- [ ] PM2 installé globalement
- [ ] Backend démarré avec PM2
- [ ] PM2 configuré pour démarrer au boot
- [ ] Nginx/Apache configuré
- [ ] Site accessible via navigateur
- [ ] API accessible (`/api/health`)

---

## 🔒 Sécurité

### Firewall

```bash
# Autoriser HTTP et HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Autoriser SSH (si pas déjà fait)
sudo ufw allow 22/tcp

# Activer le firewall
sudo ufw enable
```

### SSL/HTTPS (Recommandé)

Utilisez Let's Encrypt avec Certbot :

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d katymurr.com -d www.katymurr.com
```

---

## 📞 Support

En cas de problème, vérifiez :
1. Les logs PM2 : `pm2 logs katymurr-api`
2. Les logs Nginx : `sudo tail -f /var/log/nginx/error.log`
3. Les variables d'environnement
4. Les permissions des fichiers

