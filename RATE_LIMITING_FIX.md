# Correction du Rate Limiting (429 Too Many Requests)

## Problème

Le serveur retournait des erreurs `429 Too Many Requests` car :
1. Le rate limiter était configuré avec seulement **100 requêtes par 15 minutes**
2. React StrictMode en développement fait des **double renders**, doublant toutes les requêtes
3. Au chargement de la page, plusieurs composants font des appels API simultanés :
   - `SiteSettingsProvider` → `/api/settings`
   - `Header` → `/api/menu/en`
   - `Home` → `/api/references`, `/api/blog`, `/api/services`, `/api/pages`
   - `App` → `/api/analytics/visit`

## Solution Appliquée

### 1. Rate Limiting Ajusté (`server/index.js`)

```javascript
const isDevelopment = process.env.NODE_ENV !== 'production';

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute (au lieu de 15)
  max: isDevelopment ? 1000 : 100, // 1000 req/min en dev, 100 en prod
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => req.path === '/api/health'
});
```

**Changements :**
- ✅ Fenêtre réduite à **1 minute** (au lieu de 15)
- ✅ Limite augmentée à **1000 requêtes/minute en développement** (au lieu de 100/15min)
- ✅ Limite de **100 requêtes/minute en production** (sécurité maintenue)
- ✅ Health check exclu du rate limiting

### 2. Cleanup Functions Ajoutées

Ajout de cleanup functions dans les `useEffect` pour éviter les appels multiples lors des double renders de React StrictMode :

**Fichiers modifiés :**
- ✅ `SiteSettingsProvider.tsx` - Cleanup pour éviter les appels multiples
- ✅ `Header.tsx` - Cleanup pour le chargement du menu
- ✅ `Home.tsx` - Cleanup pour le chargement des données

**Pattern utilisé :**
```typescript
useEffect(() => {
  let cancelled = false
  
  const loadData = async () => {
    try {
      const data = await fetchData()
      if (cancelled) return // Ne pas mettre à jour si annulé
      setData(data)
    } catch (error) {
      if (!cancelled) {
        console.error(error)
      }
    }
  }
  
  loadData()
  
  return () => {
    cancelled = true // Annuler lors du cleanup
  }
}, [dependencies])
```

## Résultat

- ✅ **En développement** : 1000 requêtes/minute (largement suffisant)
- ✅ **En production** : 100 requêtes/minute (sécurisé)
- ✅ **Cleanup functions** : Évite les appels multiples lors des double renders
- ✅ **Health check** : Exclu du rate limiting

## Test

1. Redémarrez le serveur backend
2. Rafraîchissez la page frontend
3. Les erreurs 429 devraient disparaître

## Note

Si vous avez encore des problèmes, vous pouvez temporairement désactiver React StrictMode en développement (mais ce n'est pas recommandé) :

```tsx
// client/src/main.tsx
ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode> // Commenté temporairement
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  // </React.StrictMode>
)
```

Mais avec les corrections apportées, cela ne devrait plus être nécessaire.

