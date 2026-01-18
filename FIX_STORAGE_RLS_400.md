# Résoudre l'Erreur 400 lors de l'Upload

## Problème

Les logs Supabase montrent des erreurs `POST | 400` lors des tentatives d'upload vers les buckets Storage. Cela indique un problème avec les politiques RLS (Row-Level Security).

## Solution 1 : Vérifier la Service Role Key

Le serveur backend **DOIT** utiliser la **service_role key** (pas l'anon key) pour bypasser RLS.

### Vérification

1. Allez dans Supabase Dashboard > **Settings** > **API**
2. Copiez la **service_role** key (c'est la clé longue et secrète, pas l'anon key)
3. Vérifiez votre `server/.env` :

```env
# ✅ CORRECT - Service Role Key (longue, commence par eyJ...)
SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ5cXdqYmtqcmNlenpmemZmcWpwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2ODY2NDM4MzMsImV4cCI6MjA4NDIxOTgzM30.XXXXX

# ❌ INCORRECT - Anon Key (ne peut pas bypasser RLS)
SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ5cXdqYmtqcmNlenpmemZmcWpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg2NDM8MzMsImV4cCI6MjA4NDIxOTgzM30.XXXXX
```

**Différence clé** : La service_role key contient `"role":"service_role"` dans le payload JWT, tandis que l'anon key contient `"role":"anon"`.

### Redémarrer le serveur

Après avoir mis à jour la clé :

```bash
# Arrêtez le serveur (Ctrl+C)
# Redémarrez-le
npm run dev
```

## Solution 2 : Configurer les Politiques RLS (si nécessaire)

Même avec la service_role key, il est recommandé de configurer les politiques RLS correctement.

### Via SQL Editor (Recommandé)

1. Allez dans Supabase Dashboard > **SQL Editor**
2. Exécutez le script complet dans `server/data/createStorageBuckets.sql`
3. Vérifiez qu'il n'y a pas d'erreurs

### Politiques Requises

Pour chaque bucket (`media`, `logos`, `favicons`), créez ces 3 politiques :

#### 1. INSERT (Upload)
```sql
CREATE POLICY "Allow authenticated uploads to [bucket]"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = '[bucket]');
```

#### 2. SELECT (Read)
```sql
CREATE POLICY "Allow public read access to [bucket]"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = '[bucket]');
```

#### 3. DELETE
```sql
CREATE POLICY "Allow authenticated deletes from [bucket]"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = '[bucket]');
```

## Solution 3 : Vérifier que les Buckets sont Publics

1. Allez dans Supabase Dashboard > **Storage**
2. Pour chaque bucket (`media`, `logos`, `favicons`) :
   - Cliquez sur le bucket
   - Vérifiez que **"Public bucket"** est activé
   - Si ce n'est pas le cas, activez-le

## Solution 4 : Désactiver RLS Temporairement (Non recommandé pour production)

Si vous voulez tester rapidement sans RLS :

```sql
-- ⚠️ ATTENTION : Ceci désactive RLS pour tous les buckets
-- Utilisez uniquement pour tester, puis réactivez RLS

ALTER TABLE storage.objects DISABLE ROW LEVEL SECURITY;
```

Puis réactivez-le après les tests :

```sql
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;
```

## Vérification

Après avoir appliqué les solutions :

1. Redémarrez le serveur backend
2. Essayez d'uploader un fichier
3. Vérifiez les logs du serveur - vous ne devriez plus voir d'erreur 400
4. Vérifiez dans Supabase Dashboard > Storage que le fichier apparaît

## Diagnostic

Si le problème persiste, vérifiez :

1. **Logs du serveur** : Regardez l'erreur exacte dans la console
2. **Logs Supabase** : Vérifiez les détails de l'erreur 400 dans Supabase Dashboard > Logs
3. **Service Role Key** : Assurez-vous qu'elle est bien utilisée (vérifiez le payload JWT)

## Note Importante

La **service_role key** bypass normalement RLS, donc si vous l'utilisez correctement, vous ne devriez pas avoir besoin de configurer les politiques RLS pour l'upload depuis le serveur. Cependant, les politiques sont toujours nécessaires pour :
- La lecture publique des fichiers
- Les opérations depuis le client (frontend)

