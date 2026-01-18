# Guide de Déploiement VPS - Katy Murr Website

## 📋 Prérequis

- Serveur VPS avec Ubuntu 20.04+ ou Debian 11+
- Node.js 18+ installé
- Nginx installé
- PM2 installé (gestionnaire de processus)
- Domaine configuré (optionnel pour preview)
- Accès SSH au serveur

## 🚀 Étapes de Déploiement

### 1. Préparer le Serveur

```bash
# Mettre à jour le système
sudo apt update && sudo apt upgrade -y

# Installer Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Installer PM2 globalement
sudo npm install -g pm2

# Installer Nginx
sudo apt install -y nginx
```

### 2. Cloner le Projet sur le Serveur

```bash
# Créer un répertoire pour l'application
sudo mkdir -p /var/www/katymurr
sudo chown -R $USER:$USER /var/www/katymurr

# Cloner le repository (ou transférer les fichiers)
cd /var/www/katymurr
git clone <votre-repo> .
# OU transférer les fichiers via SCP/SFTP
```

### 3. Installer les Dépendances

```bash
cd /var/www/katymurr

# Installer toutes les dépendances
npm run install:all
```

### 4. Configurer les Variables d'Environnement

#### Backend (`server/.env`)

```bash
nano server/.env
```

```env
# Supabase Configuration
SUPABASE_URL=https://fyqwjbkjrcezzfzffqjp.supabase.co
SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ5cXdqYmtqcmNlenpmemZmcWpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg2NDM4MzMsImV4cCI6MjA4NDIxOTgzM30.DLJMxZSwwYB5JthwAuBtiZjlawO1sM5IRvvKZeUU_iE

# Server Configuration
PORT=3001
CLIENT_URL=http://votre-ip-ou-domaine.com
BASE_URL=http://votre-ip-ou-domaine.com

# JWT Secret (générez un secret aléatoire)
JWT_SECRET=$(openssl rand -base64 32)
```

#### Frontend (`client/.env`)

```bash
nano client/.env
```

```env
# API Configuration (remplacez par votre IP ou domaine)
VITE_API_URL=http://votre-ip-ou-domaine.com/api

# Supabase Configuration
VITE_SUPABASE_URL=https://fyqwjbkjrcezzfzffqjp.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ5cXdqYmtqcmNlenpmemZmcWpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg2NDM4MzMsImV4cCI6MjA4NDIxOTgzM30.DLJMxZSwwYB5JthwAuBtiZjlawO1sM5IRvvKZeUU_iE
```

**⚠️ Important :** Pour un lien de preview, remplacez `votre-ip-ou-domaine.com` par l'IP de votre serveur (ex: `http://123.45.67.89`)

### 5. Build le Frontend

```bash
cd /var/www/katymurr/client
npm run build
```

Cela créera le dossier `dist/` avec les fichiers statiques.

### 6. Configurer Nginx

```bash
sudo nano /etc/nginx/sites-available/katymurr
```

```nginx
server {
    listen 80;
    server_name votre-ip-ou-domaine.com;  # Ou votre IP pour preview

    # Frontend - Servir les fichiers statiques
    location / {
        root /var/www/katymurr/client/dist;
        try_files $uri $uri/ /index.html;
        index index.html;
        
        # Headers pour le cache
        add_header Cache-Control "public, max-age=3600";
    }

    # API - Proxy vers le backend
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
        
        # Timeout pour les uploads
        proxy_read_timeout 300s;
        proxy_connect_timeout 300s;
    }

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/json;
}
```

Activer la configuration :

```bash
# Créer le lien symbolique
sudo ln -s /etc/nginx/sites-available/katymurr /etc/nginx/sites-enabled/

# Tester la configuration
sudo nginx -t

# Redémarrer Nginx
sudo systemctl restart nginx
```

### 7. Démarrer le Backend avec PM2

```bash
cd /var/www/katymurr/server

# Démarrer avec PM2
pm2 start index.js --name katymurr-api

# Sauvegarder la configuration PM2
pm2 save

# Configurer PM2 pour démarrer au boot
pm2 startup
# Suivre les instructions affichées
```

### 8. Configurer le Firewall

```bash
# Autoriser HTTP
sudo ufw allow 80/tcp

# Autoriser HTTPS (si vous configurez SSL plus tard)
sudo ufw allow 443/tcp

# Activer le firewall
sudo ufw enable
```

### 9. Vérifier le Déploiement

1. **Vérifier que le backend fonctionne :**
   ```bash
   curl http://localhost:3001/api/health
   # ou
   pm2 logs katymurr-api
   ```

2. **Vérifier que Nginx fonctionne :**
   ```bash
   sudo systemctl status nginx
   ```

3. **Accéder au site :**
   - Ouvrir votre navigateur
   - Aller sur `http://votre-ip` (pour preview)
   - Ou `http://votre-domaine.com` (si configuré)

## 🔒 Configuration SSL (Optionnel mais Recommandé)

Pour un environnement de production, configurez HTTPS avec Let's Encrypt :

```bash
# Installer Certbot
sudo apt install -y certbot python3-certbot-nginx

# Obtenir un certificat (remplacez par votre domaine)
sudo certbot --nginx -d votre-domaine.com

# Le certificat sera renouvelé automatiquement
```

## 📝 Commandes Utiles

### Gestion PM2

```bash
# Voir les processus
pm2 list

# Voir les logs
pm2 logs katymurr-api

# Redémarrer
pm2 restart katymurr-api

# Arrêter
pm2 stop katymurr-api

# Supprimer
pm2 delete katymurr-api
```

### Mise à Jour de l'Application

```bash
cd /var/www/katymurr

# Pull les dernières modifications
git pull

# Réinstaller les dépendances (si nécessaire)
npm run install:all

# Rebuild le frontend
cd client
npm run build

# Redémarrer le backend
pm2 restart katymurr-api
```

### Logs

```bash
# Logs Nginx
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log

# Logs PM2
pm2 logs katymurr-api
```

## 🐛 Dépannage

### Le site ne charge pas

1. Vérifier que Nginx est démarré : `sudo systemctl status nginx`
2. Vérifier que PM2 est démarré : `pm2 list`
3. Vérifier les logs : `pm2 logs katymurr-api`
4. Vérifier les permissions : `ls -la /var/www/katymurr/client/dist`

### L'API ne répond pas

1. Vérifier que le backend écoute sur le port 3001 : `netstat -tulpn | grep 3001`
2. Vérifier les variables d'environnement : `cat server/.env`
3. Vérifier les logs PM2 : `pm2 logs katymurr-api`

### Erreurs 502 Bad Gateway

- Le backend n'est pas démarré ou ne répond pas
- Vérifier : `pm2 list` et `pm2 logs katymurr-api`

### Erreurs 404 sur les routes React

- Vérifier que Nginx a bien la directive `try_files $uri $uri/ /index.html;`
- Vérifier que le dossier `dist/` existe et contient `index.html`

## 📊 Monitoring

### Surveiller les performances

```bash
# Monitoring PM2
pm2 monit

# Statistiques système
htop
```

## ✅ Checklist de Déploiement

- [ ] Node.js 18+ installé
- [ ] PM2 installé et configuré
- [ ] Nginx installé et configuré
- [ ] Fichiers `.env` créés avec les bonnes valeurs
- [ ] Frontend buildé (`client/dist/` existe)
- [ ] Backend démarré avec PM2
- [ ] Nginx configuré et redémarré
- [ ] Firewall configuré
- [ ] Site accessible via IP ou domaine
- [ ] API accessible via `/api`
- [ ] Dashboard admin accessible via `/admin/login`

## 🔗 Accès au Site

Une fois déployé, vous pouvez accéder à :

- **Site principal :** `http://votre-ip` ou `http://votre-domaine.com`
- **Dashboard admin :** `http://votre-ip/admin/login` ou `http://votre-domaine.com/admin/login`
- **API :** `http://votre-ip/api` ou `http://votre-domaine.com/api`

## 📞 Support

En cas de problème, vérifiez :
1. Les logs PM2 : `pm2 logs katymurr-api`
2. Les logs Nginx : `sudo tail -f /var/log/nginx/error.log`
3. Les variables d'environnement
4. Les permissions des fichiers

