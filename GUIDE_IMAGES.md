# Guide : Ajouter vos Logos et Favicon

## 📁 Où placer les fichiers

Placez vos fichiers PNG dans le dossier `client/public/` :

```
client/public/
├── favicon.png          ← Votre favicon (ou favicon.ico)
├── logo.png             ← Votre logo principal
└── images/
    └── logo.png         ← Alternative : logo dans un sous-dossier
```

## 📝 Étapes

### 1. Ajouter le Favicon

1. Placez votre fichier `favicon.png` (ou `favicon.ico`) dans `client/public/`
2. Ouvrez `client/index.html`
3. Modifiez la ligne du favicon :

```html
<!-- Pour PNG -->
<link rel="icon" type="image/png" href="/favicon.png" />

<!-- Pour ICO -->
<link rel="icon" type="image/x-icon" href="/favicon.ico" />
```

### 2. Ajouter le Logo dans le Header

1. Placez votre fichier `logo.png` dans `client/public/` ou `client/public/images/`
2. Ouvrez `client/src/components/Layout/Header.tsx`
3. Remplacez le texte par une image :

```tsx
<Link to="/" className="logo">
  <img src="/logo.png" alt="Katy Murr" />
</Link>
```

### 3. Ajouter le Logo dans le Footer (optionnel)

1. Ouvrez `client/src/components/Layout/Footer.tsx`
2. Ajoutez l'image du logo :

```tsx
<div className="footer-section">
  <img src="/logo.png" alt="Katy Murr" className="footer-logo" />
  <h3>Katy Murr</h3>
  <p>English Coaching, Interpreting & Writing Services</p>
</div>
```

## 🎨 Tailles recommandées

- **Favicon** : 32x32px ou 64x64px
- **Logo header** : Hauteur 40-60px (largeur proportionnelle)
- **Logo footer** : Hauteur 30-40px

## 💡 Astuces

- Utilisez des PNG avec fond transparent pour le logo
- Optimisez vos images avant de les ajouter (utilisez TinyPNG ou similaire)
- Pour le favicon, vous pouvez aussi créer un `favicon.ico` multi-taille

## 🔄 Après avoir ajouté les fichiers

1. Redémarrez le serveur de développement (`npm run dev`)
2. Videz le cache du navigateur (Ctrl+F5)
3. Vérifiez que les images s'affichent correctement

## 📦 Exemple de structure finale

```
client/public/
├── favicon.png
├── logo.png
├── logo-white.png (optionnel)
└── images/
    ├── hero-image.jpg
    └── ...
```

