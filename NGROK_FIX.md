# 🔧 Correction du Problème CORS avec ngrok

## ❌ Problème

Les requêtes vont toujours vers `http://localhost:3001/api` au lieu d'utiliser le proxy Vite `/api`.

## ✅ Solution

### 1. Vérifier qu'il n'y a pas de fichier `.env` qui override

Vérifiez s'il existe un fichier `client/.env` qui contient :
```env
VITE_API_URL=http://localhost:3001/api
```

Si oui, **supprimez cette ligne** ou changez-la en :
```env
VITE_API_URL=/api
```

Ou **supprimez complètement le fichier** `.env` pour utiliser la valeur par défaut.

### 2. Redémarrer le serveur de développement

**Important** : Vous devez **arrêter complètement** le serveur et le **redémarrer** pour que les changements soient pris en compte.

```powershell
# Arrêtez le serveur (Ctrl+C)
# Puis redémarrez :
npm run dev
```

### 3. Vider le cache du navigateur

Le navigateur peut avoir mis en cache l'ancien code JavaScript. Videz le cache :

**Chrome/Edge** :
- Appuyez sur `Ctrl + Shift + Delete`
- Sélectionnez "Images et fichiers en cache"
- Cliquez sur "Effacer les données"

**Ou** :
- Ouvrez les DevTools (F12)
- Clic droit sur le bouton de rechargement
- Sélectionnez "Vider le cache et effectuer une actualisation forcée"

### 4. Vérifier dans les DevTools

Ouvrez les DevTools (F12) → Network, et vérifiez que les requêtes vont vers :
- ✅ `/api/...` (URL relative)
- ❌ PAS `http://localhost:3001/api/...`

## 🔍 Vérification

Après avoir redémarré et vidé le cache, les requêtes devraient maintenant passer par le proxy Vite :

1. **Dans les DevTools Network**, vous devriez voir :
   - Requêtes vers `/api/menu/en` (pas `http://localhost:3001/api/menu/en`)
   - Statut 200 (succès) au lieu d'erreurs CORS

2. **Le site devrait fonctionner** via ngrok

## 🐛 Si le problème persiste

### Option 1 : Vérifier le proxy Vite

Vérifiez que le proxy est bien configuré dans `client/vite.config.ts` :

```typescript
proxy: {
  '/api': {
    target: 'http://localhost:3001',
    changeOrigin: true
  }
}
```

### Option 2 : Forcer le rechargement

1. Arrêtez complètement le serveur
2. Supprimez le dossier `.vite` (cache Vite) :
   ```powershell
   Remove-Item -Recurse -Force client\.vite -ErrorAction SilentlyContinue
   ```
3. Redémarrez :
   ```powershell
   npm run dev
   ```

### Option 3 : Vérifier que le backend tourne

Assurez-vous que le backend tourne bien sur le port 3001 :
```powershell
# Dans un autre terminal
curl http://localhost:3001/api/health
```

## ✅ Résultat Attendu

Après ces corrections :
- ✅ Les requêtes passent par `/api` (proxy Vite)
- ✅ Le proxy redirige vers `localhost:3001`
- ✅ Pas d'erreurs CORS
- ✅ Le site fonctionne via ngrok

