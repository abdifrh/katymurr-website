# Guide de Configuration Initiale

## Étapes de Configuration

### 1. Installation des Dépendances

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

### 2. Configuration Supabase

1. Créer un compte sur [Supabase](https://supabase.com)
2. Créer un nouveau projet
3. Aller dans l'éditeur SQL et exécuter le contenu de `server/supabase-schema.sql`
4. Noter l'URL du projet et la clé "anon public" dans les paramètres API

### 3. Configuration des Variables d'Environnement

#### Backend (`server/.env`)

Créez un fichier `.env` dans le dossier `server/`:

```env
SUPABASE_URL=https://votre-projet.supabase.co
SUPABASE_KEY=votre_clé_anon
PORT=3001
CLIENT_URL=http://localhost:5173
BASE_URL=http://localhost:3001
JWT_SECRET=votre_secret_jwt_aleatoire
```

#### Frontend (`client/.env`)

Créez un fichier `.env` dans le dossier `client/`:

```env
VITE_API_URL=http://localhost:3001/api
VITE_SUPABASE_URL=https://votre-projet.supabase.co
VITE_SUPABASE_ANON_KEY=votre_clé_anon
```

### 4. Créer un Utilisateur Admin

1. Dans Supabase, allez dans Authentication > Users
2. Créez un nouvel utilisateur avec email/mot de passe
3. Cet utilisateur pourra se connecter au dashboard admin

### 5. Lancer l'Application

```bash
# À la racine du projet
npm run dev
```

Cela lancera:
- Le serveur backend sur http://localhost:3001
- Le frontend sur http://localhost:5173

### 6. Accéder au Dashboard Admin

1. Aller sur http://localhost:5173/admin/login
2. Se connecter avec les identifiants créés dans Supabase
3. Commencer à ajouter du contenu

## Structure des Données

### Pages
- Créer des pages avec slug unique par langue
- Exemple: `home` (en), `home` (fr)

### Blog
- Créer des catégories dans `blog_categories`
- Créer des articles dans `blog_posts`
- Marquer comme `published: true` pour les publier

### Références
- Ajouter des témoignages dans `references`
- Marquer comme `featured: true` pour les afficher sur la page d'accueil

## Personnalisation

### Couleurs
Modifier les variables CSS dans `client/src/index.css`:
- `--color-cream`: #F4F1E9
- `--color-warm`: #D69B71
- `--color-accent`: #9A4818
- `--color-dark`: #674439

### Typographie
Les polices Lora et Georgia sont déjà configurées via Google Fonts.

## Prochaines Étapes

1. Ajouter du contenu via le dashboard admin
2. Personnaliser les textes et traductions
3. Ajouter des images professionnelles
4. Configurer le domaine personnalisé
5. Optimiser pour le SEO

