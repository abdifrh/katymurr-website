# Configuration du Système d'Envoi d'Emails Newsletter

## Vue d'ensemble

Le système de newsletter est maintenant en place avec :
- ✅ Gestion des abonnés
- ✅ Templates d'emails
- ✅ Campagnes d'emails
- ⚠️ Envoi d'emails (nécessite configuration)

## Configuration requise

Pour activer l'envoi d'emails, vous devez configurer un service d'email. Options recommandées :

### Option 1 : SendGrid (Recommandé)
1. Créez un compte sur [SendGrid](https://sendgrid.com)
2. Obtenez votre API Key
3. Ajoutez dans `server/.env` :
   ```
   SENDGRID_API_KEY=votre_cle_api
   SENDGRID_FROM_EMAIL=noreply@katymurr.com
   ```

### Option 2 : Mailgun
1. Créez un compte sur [Mailgun](https://mailgun.com)
2. Obtenez votre API Key et Domain
3. Ajoutez dans `server/.env` :
   ```
   MAILGUN_API_KEY=votre_cle_api
   MAILGUN_DOMAIN=votre_domaine.mailgun.org
   MAILGUN_FROM_EMAIL=noreply@katymurr.com
   ```

### Option 3 : Supabase Edge Functions
1. Créez une Edge Function dans Supabase
2. Utilisez un service d'email dans la fonction
3. Appelez la fonction depuis le backend

## Installation du package d'email

```bash
cd server
npm install @sendgrid/mail
# ou
npm install mailgun.js
```

## Route d'envoi d'emails

Une route backend sera créée pour envoyer les campagnes. Pour l'instant, les campagnes peuvent être créées et gérées via l'admin dashboard, mais l'envoi nécessite la configuration d'un service d'email.

## Utilisation

1. **Créer un template** : Dans l'admin dashboard > Newsletter > Templates
2. **Créer une campagne** : Newsletter > Campaigns > Create Campaign
3. **Envoyer** : Une fois le service d'email configuré, un bouton "Send" apparaîtra

## Variables disponibles dans les templates

- `{{name}}` - Nom de l'abonné
- `{{email}}` - Email de l'abonné
- `{{unsubscribe_link}}` - Lien de désabonnement
- `{{site_url}}` - URL du site
- `{{current_date}}` - Date actuelle

