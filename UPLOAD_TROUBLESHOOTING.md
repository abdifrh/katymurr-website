# Dépannage de l'Upload de Fichiers

## Erreur 500 sur /api/upload

### Causes possibles :

1. **Buckets Supabase non créés**
   - Vérifiez que les buckets `media`, `logos`, et `favicons` existent dans Supabase Storage
   - Voir `SUPABASE_STORAGE_SETUP.md` pour les instructions

2. **Service Key manquante**
   - Le serveur backend doit utiliser la **Service Key** (pas l'anon key) pour uploader des fichiers
   - Vérifiez votre `server/.env` :
   ```env
   SUPABASE_KEY=votre_service_key_ici
   ```
   - La Service Key se trouve dans Supabase Dashboard > Settings > API > service_role key

3. **Politiques RLS non configurées**
   - Les buckets doivent avoir des politiques RLS pour permettre l'upload
   - Exécutez `server/data/createStorageBuckets.sql` dans Supabase SQL Editor

4. **Taille de fichier trop grande**
   - Limite par défaut : 10MB
   - Vérifiez la taille du fichier que vous essayez d'uploader

### Vérification rapide :

1. **Vérifier les buckets** :
   - Allez dans Supabase Dashboard > Storage
   - Vérifiez que `media`, `logos`, `favicons` existent et sont publics

2. **Vérifier la Service Key** :
   - Dans `server/.env`, assurez-vous d'utiliser la **service_role** key (pas l'anon key)
   - Format : `SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (longue clé)

3. **Vérifier les logs du serveur** :
   - Regardez la console du serveur backend pour voir l'erreur exacte
   - L'erreur devrait maintenant afficher plus de détails

### Solution rapide :

Si vous utilisez toujours l'anon key dans `server/.env`, changez-la pour la service_role key :

1. Allez dans Supabase Dashboard > Settings > API
2. Copiez la **service_role** key (secret)
3. Mettez à jour `server/.env` :
   ```env
   SUPABASE_KEY=votre_service_role_key_ici
   ```
4. Redémarrez le serveur backend

### Test de l'upload :

1. Connectez-vous au dashboard admin
2. Allez dans Media
3. Sélectionnez un type (Media, Logo, ou Favicon)
4. Uploadez un petit fichier image (< 1MB) pour tester
5. Vérifiez les logs du serveur si ça échoue

