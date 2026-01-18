# Guide d'Accès au Dashboard Admin

## Accès à la Page de Connexion

### URL de Connexion

**En développement (local) :**
```
http://localhost:5173/admin/login
```

**En production :**
```
https://votre-domaine.com/admin/login
```

## Création d'un Compte Admin

Pour se connecter, vous devez d'abord créer un utilisateur dans Supabase :

### Méthode 1 : Via l'Interface Supabase (Recommandé)

1. **Connectez-vous à votre projet Supabase**
   - Allez sur [https://supabase.com](https://supabase.com)
   - Sélectionnez votre projet

2. **Accédez à Authentication**
   - Dans le menu de gauche, cliquez sur **"Authentication"**
   - Puis sur **"Users"**

3. **Créer un nouvel utilisateur**
   - Cliquez sur le bouton **"Add user"** ou **"Invite user"**
   - Choisissez **"Create new user"**
   - Entrez :
     - **Email** : votre adresse email (ex: admin@katymurr.com)
     - **Password** : un mot de passe sécurisé
   - Cliquez sur **"Create user"**

4. **Notez vos identifiants**
   - Email : `votre-email@exemple.com`
   - Password : `votre-mot-de-passe`

### Méthode 2 : Via SQL (Alternative)

Vous pouvez aussi créer un utilisateur directement via SQL dans l'éditeur SQL de Supabase :

```sql
-- Créer un utilisateur admin
-- Note: Cette méthode nécessite l'extension auth
-- Il est préférable d'utiliser l'interface Supabase
```

## Connexion au Dashboard

1. **Accédez à la page de login**
   - Ouvrez votre navigateur
   - Allez sur `http://localhost:5173/admin/login` (ou votre URL de production)

2. **Entrez vos identifiants**
   - **Email** : L'email que vous avez créé dans Supabase
   - **Password** : Le mot de passe que vous avez défini

3. **Cliquez sur "Login"**
   - Si les identifiants sont corrects, vous serez redirigé vers `/admin`
   - Si incorrect, un message d'erreur s'affichera

## Fonctionnalités du Dashboard

Une fois connecté, vous pouvez gérer :

- **Pages** : Créer et modifier les pages du site (Home, About, Contact, etc.)
- **Blog** : Gérer les articles de blog, catégories, et publications
- **References** : Ajouter et modifier les témoignages et références

## Sécurité

- Le token d'authentification est stocké dans le `localStorage` du navigateur
- La session reste active jusqu'à ce que vous vous déconnectiez
- Cliquez sur **"Logout"** dans le dashboard pour vous déconnecter

## Dépannage

### Erreur "Invalid login credentials"
- Vérifiez que l'email et le mot de passe sont corrects
- Assurez-vous que l'utilisateur existe dans Supabase Authentication

### Erreur "No token provided"
- Votre session a expiré, reconnectez-vous
- Vérifiez que les variables d'environnement sont correctement configurées

### Redirection automatique vers /admin/login
- Votre token n'est plus valide
- Supprimez le token du localStorage et reconnectez-vous

## Variables d'Environnement Requises

Assurez-vous que ces variables sont configurées dans `client/.env` :

```env
VITE_SUPABASE_URL=https://votre-projet.supabase.co
VITE_SUPABASE_ANON_KEY=votre_clé_anon
```

## Note Importante

- Seuls les utilisateurs créés dans Supabase Authentication peuvent se connecter
- Pour ajouter d'autres administrateurs, créez de nouveaux utilisateurs dans Supabase
- Les mots de passe doivent respecter les règles de sécurité de Supabase (minimum 6 caractères par défaut)

