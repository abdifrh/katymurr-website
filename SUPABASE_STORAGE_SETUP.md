# Configuration Supabase Storage pour les Médias

## Création des Buckets

Dans votre projet Supabase, vous devez créer les buckets suivants pour stocker les fichiers :

### 1. Accéder à Storage

1. Connectez-vous à votre projet Supabase
2. Allez dans **Storage** dans le menu de gauche
3. Cliquez sur **"New bucket"**

### 2. Créer les Buckets

Créez les buckets suivants avec ces configurations :

#### Bucket: `media`
- **Name**: `media`
- **Public**: ✅ **Oui** (pour que les images soient accessibles publiquement)
- **File size limit**: 10 MB (ou selon vos besoins)
- **Allowed MIME types**: `image/*`, `application/pdf`, etc. (ou laissez vide pour tous)

#### Bucket: `logos`
- **Name**: `logos`
- **Public**: ✅ **Oui**
- **File size limit**: 5 MB
- **Allowed MIME types**: `image/*`

#### Bucket: `favicons`
- **Name**: `favicons`
- **Public**: ✅ **Oui**
- **File size limit**: 1 MB
- **Allowed MIME types**: `image/x-icon`, `image/png`, `image/svg+xml`

### 3. Configurer les Politiques RLS (Row Level Security)

Pour chaque bucket, vous devez configurer les politiques d'accès :

#### Politique pour l'upload (authentifié)
```sql
-- Pour le bucket 'media'
CREATE POLICY "Allow authenticated uploads to media"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'media');

-- Pour le bucket 'logos'
CREATE POLICY "Allow authenticated uploads to logos"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'logos');

-- Pour le bucket 'favicons'
CREATE POLICY "Allow authenticated uploads to favicons"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'favicons');
```

#### Politique pour la lecture (public)
```sql
-- Pour le bucket 'media'
CREATE POLICY "Allow public read access to media"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'media');

-- Pour le bucket 'logos'
CREATE POLICY "Allow public read access to logos"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'logos');

-- Pour le bucket 'favicons'
CREATE POLICY "Allow public read access to favicons"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'favicons');
```

#### Politique pour la suppression (authentifié)
```sql
-- Pour le bucket 'media'
CREATE POLICY "Allow authenticated deletes from media"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'media');

-- Pour le bucket 'logos'
CREATE POLICY "Allow authenticated deletes from logos"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'logos');

-- Pour le bucket 'favicons'
CREATE POLICY "Allow authenticated deletes from favicons"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'favicons');
```

### 4. Alternative : Utiliser l'Interface Supabase

Vous pouvez aussi configurer les politiques via l'interface :

1. Allez dans **Storage** > **Policies**
2. Pour chaque bucket, créez les politiques :
   - **Insert**: Authenticated users can insert
   - **Select**: Public can select
   - **Delete**: Authenticated users can delete

## Structure des Dossiers

Les fichiers seront organisés ainsi dans les buckets :

```
media/
  ├── media/
  │   ├── 1234567890-abc123.jpg
  │   ├── 1234567891-def456.png
  │   └── ...
  ├── logos/
  │   ├── logo-main.png
  │   ├── logo-footer.png
  │   └── ...
  └── favicons/
      ├── favicon.ico
      ├── favicon.png
      └── ...
```

## Utilisation dans le Dashboard

Une fois les buckets configurés :

1. Allez dans **Admin > Media**
2. Sélectionnez le type de fichier (Media, Logo, ou Favicon)
3. Cliquez sur **"Upload File"**
4. Sélectionnez votre fichier
5. Le fichier sera automatiquement uploadé dans le bon bucket

## URLs Générées

Les URLs publiques générées seront au format :
```
https://[project-id].supabase.co/storage/v1/object/public/[bucket]/[path]
```

Ces URLs peuvent être utilisées directement dans votre site web.

## Notes Importantes

- Les buckets doivent être **publics** pour que les images soient accessibles sur le site
- La limite de taille par défaut est de 10MB (configurable)
- Les fichiers sont organisés automatiquement par catégorie
- Les noms de fichiers sont générés automatiquement pour éviter les conflits

