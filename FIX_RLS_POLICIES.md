# Correction des Politiques RLS (Row-Level Security)

## Problème

L'erreur `new row violates row-level security policy` signifie que les politiques RLS (Row-Level Security) ne sont pas correctement configurées pour les buckets Supabase Storage.

## Solution

### Étape 1 : Vérifier que les buckets existent

1. Allez dans Supabase Dashboard > **Storage**
2. Vérifiez que ces buckets existent et sont **publics** :
   - `media`
   - `logos`
   - `favicons`

### Étape 2 : Configurer les Politiques RLS

**Option A : Via SQL Editor (Recommandé)**

1. Allez dans Supabase Dashboard > **SQL Editor**
2. Exécutez le script complet dans `server/data/createStorageBuckets.sql`
3. Vérifiez qu'il n'y a pas d'erreurs

**Option B : Via l'Interface**

1. Allez dans Supabase Dashboard > **Storage** > **Policies**
2. Pour chaque bucket (`media`, `logos`, `favicons`), créez ces politiques :

#### Politique 1 : Insert (Upload)
- **Policy name**: `Allow authenticated uploads to [bucket]`
- **Allowed operation**: `INSERT`
- **Target roles**: `authenticated`
- **USING expression**: `bucket_id = '[bucket]'`
- **WITH CHECK expression**: `bucket_id = '[bucket]'`

#### Politique 2 : Select (Read)
- **Policy name**: `Allow public read access to [bucket]`
- **Allowed operation**: `SELECT`
- **Target roles**: `public`
- **USING expression**: `bucket_id = '[bucket]'`

#### Politique 3 : Delete
- **Policy name**: `Allow authenticated deletes from [bucket]`
- **Allowed operation**: `DELETE`
- **Target roles**: `authenticated`
- **USING expression**: `bucket_id = '[bucket]'`

### Étape 3 : Vérifier la Service Role Key

Assurez-vous que `server/.env` utilise la **service_role key** (pas l'anon key) :

```env
SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... (service_role key - longue)
```

Pour obtenir la service_role key :
1. Supabase Dashboard > **Settings** > **API**
2. Copiez la **service_role** key (secret, longue)
3. Mettez à jour `server/.env`

### Étape 4 : Redémarrer le serveur

```bash
# Arrêtez le serveur (Ctrl+C)
# Redémarrez-le
npm run dev
```

## Vérification

Après avoir configuré les politiques, essayez d'uploader un fichier. L'erreur RLS ne devrait plus apparaître.

## Script SQL Rapide

Si vous préférez exécuter directement le SQL, voici les commandes essentielles :

```sql
-- Pour le bucket 'media'
CREATE POLICY "Allow authenticated uploads to media"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'media');

CREATE POLICY "Allow public read access to media"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'media');

CREATE POLICY "Allow authenticated deletes from media"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'media');

-- Répétez pour 'logos' et 'favicons' en remplaçant 'media' par le nom du bucket
```

## Notes Importantes

- Les buckets doivent être **publics** pour que les images soient accessibles
- La **service_role key** est nécessaire pour bypasser RLS côté serveur
- Les politiques doivent être créées pour **chaque bucket** séparément

