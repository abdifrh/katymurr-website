# Dépannage - Menu Settings non visible

## Vérifications

### 1. Le menu "Settings" devrait apparaître
Le menu "Settings" devrait être visible dans le menu de gauche du dashboard admin, juste après "Newsletter".

### 2. Si le menu n'apparaît pas

#### Solution 1 : Rafraîchir la page
- Appuyez sur **Ctrl+F5** (Windows/Linux) ou **Cmd+Shift+R** (Mac) pour forcer le rechargement
- Ou fermez et rouvrez l'onglet du navigateur

#### Solution 2 : Redémarrer le serveur de développement
1. Arrêtez le serveur (Ctrl+C dans le terminal)
2. Redémarrez-le :
   ```bash
   cd client
   npm run dev
   ```

#### Solution 3 : Vérifier les erreurs
1. Ouvrez la console du navigateur (F12)
2. Regardez s'il y a des erreurs en rouge
3. Vérifiez l'onglet "Network" pour voir si les fichiers sont bien chargés

#### Solution 4 : Vérifier que les fichiers existent
Les fichiers suivants doivent exister :
- `client/src/pages/Admin/AdminSettings.tsx`
- `client/src/pages/Admin/AdminSettings.css`

### 3. Si le menu apparaît mais la page est vide

#### Vérifier que la table existe dans Supabase
1. Allez dans Supabase Dashboard > SQL Editor
2. Exécutez le script : `server/supabase-schema-settings.sql`
3. Vérifiez que la table `site_settings` existe

#### Vérifier que le serveur backend est démarré
1. Le serveur backend doit être en cours d'exécution sur le port 3001
2. Vérifiez dans un terminal :
   ```bash
   cd server
   npm run dev
   ```

#### Vérifier les routes API
Testez l'endpoint dans votre navigateur ou avec curl :
```
GET http://localhost:3001/api/admin/settings
```
Vous devez être authentifié (token dans le header Authorization).

### 4. Structure du menu attendue

Le menu de gauche devrait contenir (dans l'ordre) :
1. Dashboard
2. Pages
3. Blog
4. Services
5. References
6. Media
7. Menu
8. Analytics
9. Newsletter
10. **Settings** ← Devrait être ici

### 5. Si rien ne fonctionne

1. Vérifiez que vous avez bien sauvegardé tous les fichiers
2. Vérifiez qu'il n'y a pas d'erreurs de compilation :
   ```bash
   cd client
   npm run build
   ```
3. Vérifiez les logs du serveur de développement pour des erreurs

