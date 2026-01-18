# 🚀 Guide de Déploiement Plesk - Katy Murr Website

## 🌐 Votre Lien de Preview

**URL :** https://relaxed-booth.217-154-15-57.plesk.page/

## 📋 Configuration Spécifique Plesk

### 1. Variables d'Environnement à Configurer

#### Dans Plesk, configurez les variables d'environnement pour votre domaine :

**Backend (`server/.env`) :**
```env
SUPABASE_URL=https://fyqwjbkjrcezzfzffqjp.supabase.co
SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ5cXdqYmtqcmNlenpmemZmcWpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg2NDM4MzMsImV4cCI6MjA4NDIxOTgzM30.DLJMxZSwwYB5JthwAuBtiZjlawO1sM5IRvvKZeUU_iE
PORT=3001
CLIENT_URL=https://relaxed-booth.217-154-15-57.plesk.page
BASE_URL=https://relaxed-booth.217-154-15-57.plesk.page
JWT_SECRET=votre_secret_jwt_aleatoire
NODE_ENV=production
```

**Frontend (`client/.env`) :**
```env
VITE_API_URL=https://relaxed-booth.217-154-15-57.plesk.page/api
VITE_SUPABASE_URL=https://fyqwjbkjrcezzfzffqjp.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ5cXdqYmtqcmNlenpmemZmcWpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg2NDM4MzMsImV4cCI6MjA4NDIxOTgzM30.DLJMxZSwwYB5JthwAuBtiZjlawO1sM5IRvvKZeUU_iE
```

### 2. Structure des Fichiers sur Plesk

Sur Plesk, les fichiers sont généralement dans :
```
/var/www/vhosts/relaxed-booth.217-154-15-57.plesk.page/httpdocs/
```

Ou via le File Manager de Plesk dans le dossier `httpdocs/`

### 3. Configuration Nginx/Apache dans Plesk

#### Option A : Configuration via Plesk (Recommandé)

1. **Allez dans Plesk > Votre Domaine > Apache & nginx Settings**

2. **Ajoutez dans "Additional directives for nginx" :**

```nginx
# Servir les fichiers statiques du frontend
location / {
    root /var/www/vhosts/relaxed-booth.217-154-15-57.plesk.page/httpdocs/client/dist;
    try_files $uri $uri/ /index.html;
    index index.html;
}

# Proxy pour l'API
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
```

#### Option B : Si Plesk utilise Apache

Dans "Additional directives for Apache" :

```apache
# Servir les fichiers statiques
<Directory "/var/www/vhosts/relaxed-booth.217-154-15-57.plesk.page/httpdocs/client/dist">
    Options Indexes FollowSymLinks
    AllowOverride All
    Require all granted
    
    # React Router - rediriger vers index.html
    RewriteEngine On
    RewriteBase /
    RewriteRule ^index\.html$ - [L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /index.html [L]
</Directory>

# Proxy pour l'API
ProxyPass /api http://localhost:3001/api
ProxyPassReverse /api http://localhost:3001/api
```

### 4. Démarrage du Backend sur Plesk

#### Via SSH (si vous avez accès) :

```bash
cd /var/www/vhosts/relaxed-booth.217-154-15-57.plesk.page/httpdocs/server
pm2 start index.js --name katymurr-api
pm2 save
```

#### Via Plesk Node.js (si disponible) :

1. Allez dans **Plesk > Votre Domaine > Node.js**
2. Activez Node.js
3. Définissez :
   - **Application root** : `server/`
   - **Application startup file** : `index.js`
   - **Application URL** : `/api` (ou laissez vide)
4. Démarrez l'application

### 5. Build du Frontend

Via SSH ou File Manager :

```bash
cd /var/www/vhosts/relaxed-booth.217-154-15-57.plesk.page/httpdocs/client
npm install
npm run build
```

Assurez-vous que le fichier `.env` est créé AVANT le build, car Vite lit les variables au moment du build.

### 6. Vérification

1. **Vérifier que le frontend est accessible :**
   - https://relaxed-booth.217-154-15-57.plesk.page/

2. **Vérifier que l'API fonctionne :**
   - https://relaxed-booth.217-154-15-57.plesk.page/api/health
   - Devrait retourner : `{"status":"ok","timestamp":"..."}`

3. **Vérifier le dashboard admin :**
   - https://relaxed-booth.217-154-15-57.plesk.page/admin/login

## 🔧 Dépannage Plesk

### Problème : Le site charge mais l'API ne fonctionne pas

**Solution :**
1. Vérifier que le backend tourne : `pm2 list` ou dans Plesk Node.js
2. Vérifier que le proxy est configuré dans Nginx/Apache
3. Vérifier les logs : `pm2 logs katymurr-api`

### Problème : Erreur 404 sur les routes React

**Solution :**
- Vérifier que la directive `try_files` est dans la config Nginx
- Vérifier que le dossier `client/dist/` existe et contient `index.html`

### Problème : Variables d'environnement non prises en compte

**Solution :**
- Pour le frontend : Rebuild après avoir créé/modifié `client/.env`
- Pour le backend : Redémarrer le processus Node.js

### Problème : Port 3001 non accessible

**Solution :**
- Plesk peut avoir des restrictions de port
- Vérifier dans les paramètres du domaine
- Utiliser un port différent si nécessaire (modifier dans `server/.env`)

## 📝 Checklist Plesk

- [ ] Fichiers transférés dans `httpdocs/`
- [ ] Fichier `client/.env` créé avec les bonnes valeurs
- [ ] Fichier `server/.env` créé avec les bonnes valeurs
- [ ] Dépendances installées (`npm run install:all`)
- [ ] Frontend buildé (`cd client && npm run build`)
- [ ] Backend démarré (PM2 ou Plesk Node.js)
- [ ] Configuration Nginx/Apache mise à jour
- [ ] Site accessible via l'URL
- [ ] API accessible (`/api/health`)
- [ ] Dashboard admin accessible (`/admin/login`)

## 🔒 SSL/HTTPS sur Plesk

Plesk gère généralement SSL automatiquement. Vérifiez :

1. **Plesk > Votre Domaine > SSL/TLS Settings**
2. Activez "Let's Encrypt" si disponible
3. Ou utilisez le certificat fourni par Plesk

## 💡 Astuces Plesk

1. **File Manager :** Utilisez le File Manager de Plesk pour éditer les fichiers `.env` facilement
2. **Terminal :** Si vous avez accès SSH, utilisez-le pour les commandes npm/pm2
3. **Logs :** Consultez les logs dans Plesk > Logs ou via SSH
4. **Backup :** Utilisez la fonction de backup de Plesk avant de faire des modifications

## 🆘 Support

Si vous rencontrez des problèmes :

1. Vérifiez les logs dans Plesk
2. Vérifiez que tous les services sont démarrés
3. Vérifiez les permissions des fichiers
4. Contactez le support de votre hébergeur si nécessaire

