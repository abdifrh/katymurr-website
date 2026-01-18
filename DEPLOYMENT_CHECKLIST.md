# ✅ Checklist de Déploiement VPS

## Avant le Déploiement

### Configuration Supabase
- [ ] Projet Supabase créé
- [ ] Schéma SQL exécuté (`server/supabase-schema.sql`)
- [ ] URL et clés API notées
- [ ] Buckets de stockage créés (media, logos, favicon)
- [ ] Politiques RLS configurées

### Configuration Locale
- [ ] Fichiers `.env` créés (copier depuis `.env.example`)
- [ ] Variables d'environnement configurées
- [ ] Application testée en local
- [ ] Build du frontend testé (`npm run build`)

### Préparation du Serveur
- [ ] Serveur VPS accessible via SSH
- [ ] Node.js 18+ installé
- [ ] PM2 installé (`npm install -g pm2`)
- [ ] Nginx installé et configuré
- [ ] Firewall configuré (ports 80, 443)

## Déploiement

### Sur le Serveur
- [ ] Projet cloné/transféré sur le serveur
- [ ] Dépendances installées (`npm run install:all`)
- [ ] Fichiers `.env` créés avec les bonnes valeurs
- [ ] Frontend buildé (`cd client && npm run build`)
- [ ] Backend démarré avec PM2
- [ ] Nginx configuré et redémarré
- [ ] PM2 configuré pour démarrer au boot

### Vérifications
- [ ] Site accessible via IP/domaine
- [ ] API accessible (`/api/health` répond)
- [ ] Dashboard admin accessible (`/admin/login`)
- [ ] Upload de fichiers fonctionne
- [ ] Connexion Supabase fonctionne
- [ ] Pas d'erreurs dans les logs

## Post-Déploiement

### Sécurité
- [ ] SSL/HTTPS configuré (Let's Encrypt)
- [ ] JWT_SECRET changé en production
- [ ] CORS configuré correctement
- [ ] Rate limiting actif
- [ ] Firewall configuré

### Monitoring
- [ ] PM2 monitoring configuré
- [ ] Logs accessibles
- [ ] Backup Supabase configuré

### Tests Fonctionnels
- [ ] Navigation du site fonctionne
- [ ] Pages dynamiques se chargent
- [ ] Blog fonctionne
- [ ] Services s'affichent
- [ ] Références s'affichent
- [ ] Formulaire de contact fonctionne
- [ ] Newsletter fonctionne
- [ ] Dashboard admin complet fonctionnel
- [ ] Upload de médias fonctionne
- [ ] Menu dynamique fonctionne

## En Cas de Problème

### Le site ne charge pas
1. Vérifier Nginx : `sudo systemctl status nginx`
2. Vérifier PM2 : `pm2 list`
3. Vérifier les logs : `pm2 logs katymurr-api`
4. Vérifier les permissions : `ls -la /var/www/katymurr/client/dist`

### L'API ne répond pas
1. Vérifier que le backend tourne : `pm2 list`
2. Vérifier les variables d'env : `cat server/.env`
3. Vérifier les logs : `pm2 logs katymurr-api`
4. Tester localement : `curl http://localhost:3001/api/health`

### Erreurs 502 Bad Gateway
- Backend non démarré ou crashé
- Vérifier : `pm2 logs katymurr-api`
- Redémarrer : `pm2 restart katymurr-api`

### Erreurs 404 sur les routes React
- Vérifier la config Nginx : `try_files $uri $uri/ /index.html;`
- Vérifier que `dist/` existe : `ls -la /var/www/katymurr/client/dist`

## Commandes Utiles

```bash
# Voir les processus PM2
pm2 list

# Logs en temps réel
pm2 logs katymurr-api

# Redémarrer
pm2 restart katymurr-api

# Status Nginx
sudo systemctl status nginx

# Logs Nginx
sudo tail -f /var/log/nginx/error.log

# Tester la config Nginx
sudo nginx -t

# Rebuild frontend
cd /var/www/katymurr/client && npm run build

# Mettre à jour l'app
cd /var/www/katymurr
git pull
npm run install:all
cd client && npm run build
pm2 restart katymurr-api
```

