# Configuration Rapide - Supabase Storage

## Étapes Rapides

### 1. Installer multer (Backend)

```bash
cd server
npm install multer
```

### 2. Créer les Buckets dans Supabase

1. Allez dans votre projet Supabase
2. Cliquez sur **Storage** dans le menu de gauche
3. Créez 3 buckets :

#### Bucket 1: `media`
- **Name**: `media`
- **Public**: ✅ **Oui** (très important !)
- **File size limit**: 10 MB

#### Bucket 2: `logos`
- **Name**: `logos`
- **Public**: ✅ **Oui**
- **File size limit**: 5 MB

#### Bucket 3: `favicons`
- **Name**: `favicons`
- **Public**: ✅ **Oui**
- **File size limit**: 1 MB

### 3. Configurer les Politiques RLS

Exécutez le script SQL dans Supabase SQL Editor :
- `server/data/createStorageBuckets.sql`

Ou configurez manuellement via l'interface :
1. Allez dans **Storage** > **Policies**
2. Pour chaque bucket, créez :
   - **Insert**: Authenticated users
   - **Select**: Public
   - **Delete**: Authenticated users

### 4. Tester l'Upload

1. Connectez-vous au dashboard admin
2. Allez dans **Media**
3. Sélectionnez le type (Media, Logo, ou Favicon)
4. Cliquez sur **Upload File**
5. Sélectionnez un fichier

Le fichier sera automatiquement uploadé dans le bon bucket !

## Structure des URLs

Les fichiers uploadés auront des URLs comme :
```
https://fyqwjbkjrcezzfzffqjp.supabase.co/storage/v1/object/public/media/1234567890-abc123.jpg
https://fyqwjbkjrcezzfzffqjp.supabase.co/storage/v1/object/public/logos/logo-main.png
https://fyqwjbkjrcezzfzffqjp.supabase.co/storage/v1/object/public/favicons/favicon.ico
```

## Notes

- Les buckets **DOIVENT** être publics pour que les images s'affichent sur le site
- La limite de taille par défaut est de 10MB (configurable)
- Les fichiers sont organisés automatiquement par catégorie
- Les noms de fichiers sont générés automatiquement pour éviter les conflits

