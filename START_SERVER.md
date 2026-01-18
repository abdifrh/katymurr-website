# Démarrer le Serveur Backend

## Problème : ERR_CONNECTION_REFUSED

L'erreur `ERR_CONNECTION_REFUSED` signifie que le serveur backend n'est pas en cours d'exécution.

## Solution : Démarrer le serveur

### Option 1 : Depuis la racine du projet

```bash
# À la racine du projet
npm run dev
```

Cela démarre à la fois le serveur backend et le frontend.

### Option 2 : Démarrer uniquement le backend

```bash
# Aller dans le dossier server
cd server

# Installer les dépendances si nécessaire
npm install

# Démarrer le serveur
npm run dev
# ou
npm start
```

Le serveur devrait démarrer sur `http://localhost:3001`

### Vérification

Une fois le serveur démarré, vous devriez voir dans la console :
```
Server running on port 3001
```

### Si le port 3001 est déjà utilisé

1. Changez le port dans `server/.env` :
   ```env
   PORT=3002
   ```

2. Mettez à jour `client/.env` :
   ```env
   VITE_API_URL=http://localhost:3002/api
   ```

3. Redémarrez les deux serveurs

## Commandes utiles

- **Backend uniquement** : `cd server && npm run dev`
- **Frontend uniquement** : `cd client && npm run dev`
- **Les deux** : `npm run dev` (à la racine)

