# Configuration Rapide - Identifiants Supabase

Vos identifiants Supabase ont été fournis. Voici comment configurer les fichiers `.env` :

## 1. Créer `server/.env`

Créez un fichier `.env` dans le dossier `server/` avec ce contenu :

```env
# Supabase Configuration
SUPABASE_URL=https://votre-projet.supabase.co
SUPABASE_KEY=votre-service-role-key-ici

# Server Configuration
PORT=3001
CLIENT_URL=http://localhost:5173
BASE_URL=http://localhost:3001

# JWT Secret (générez un secret aléatoire pour la production)
JWT_SECRET=changez_cette_valeur_en_production
```

## 2. Créer `client/.env`

Créez un fichier `.env` dans le dossier `client/` avec ce contenu :

```env
# API Configuration
VITE_API_URL=http://localhost:3001/api

# Supabase Configuration
VITE_SUPABASE_URL=https://votre-projet.supabase.co
VITE_SUPABASE_ANON_KEY=votre-anon-key-ici
```

## 3. Commandes Rapides (PowerShell)

Vous pouvez créer ces fichiers rapidement avec ces commandes :

### Pour server/.env :
```powershell
@"
# Supabase Configuration
SUPABASE_URL=https://votre-projet.supabase.co
SUPABASE_KEY=votre-service-role-key-ici

# Server Configuration
PORT=3001
CLIENT_URL=http://localhost:5173
BASE_URL=http://localhost:3001

# JWT Secret
JWT_SECRET=changez_cette_valeur_en_production
"@ | Out-File -FilePath "server\.env" -Encoding utf8
```

### Pour client/.env :
```powershell
@"
# API Configuration
VITE_API_URL=http://localhost:3001/api

# Supabase Configuration
VITE_SUPABASE_URL=https://votre-projet.supabase.co
VITE_SUPABASE_ANON_KEY=votre-anon-key-ici
"@ | Out-File -FilePath "client\.env" -Encoding utf8
```

## 4. Prochaines Étapes

1. ✅ Exécuter le schéma SQL dans Supabase (`server/supabase-schema.sql`)
2. ✅ Créer les fichiers `.env` (voir ci-dessus)
3. Installer les dépendances : `npm run install:all`
4. Lancer l'application : `npm run dev`
5. Créer un utilisateur admin dans Supabase (Authentication > Users)
6. Se connecter au dashboard : http://localhost:5173/admin/login

## ⚠️ Important

- Ne commitez JAMAIS les fichiers `.env` dans Git (ils sont déjà dans `.gitignore`)
- Changez le `JWT_SECRET` en production avec une valeur aléatoire sécurisée
- Gardez vos clés Supabase privées

