# Guide des dimensions d'image pour la section Hero

## Dimensions recommandées

### Option 1 : Image hero pleine largeur (recommandé)
- **Desktop** : `1920 x 1080px` (ratio 16:9)
  - Format : JPG (qualité 85%) ou WebP
  - Poids cible : < 300KB
  - Utilisation : Image de fond ou image principale du hero

### Option 2 : Image hero plus large (paysage)
- **Desktop** : `1920 x 800px` (ratio 2.4:1)
  - Format : JPG (qualité 85%) ou WebP
  - Poids cible : < 250KB
  - Utilisation : Image de fond avec moins de hauteur

### Option 3 : Image hero portrait (si vous voulez une image de profil)
- **Desktop** : `1200 x 1600px` (ratio 3:4)
  - Format : JPG (qualité 90%) ou WebP
  - Poids cible : < 400KB
  - Utilisation : Photo professionnelle de Katy Murr

## Versions responsive

### Pour mobile
- Créez une version optimisée : `768 x 1024px` ou `640 x 960px`
- Poids cible : < 150KB
- Utilisez les attributs `srcset` pour charger différentes tailles

## Formats recommandés

1. **WebP** (meilleure compression, support moderne)
2. **JPG** (compatibilité maximale)
3. **PNG** (uniquement si transparence nécessaire)

## Optimisation

- Utilisez des outils comme :
  - TinyPNG / TinyJPG
  - Squoosh (Google)
  - ImageOptim
- Compressez toujours avant d'utiliser
- Testez le temps de chargement

## Placement du fichier

Placez l'image dans : `client/public/images/hero/`

Exemple : `client/public/images/hero/hero-image.jpg`

## Exemple d'utilisation dans le code

```tsx
<section className="hero" style={{backgroundImage: 'url(/images/hero/hero-image.jpg)'}}>
  {/* Contenu */}
</section>
```

Ou avec image responsive :

```tsx
<picture>
  <source media="(max-width: 768px)" srcSet="/images/hero/hero-mobile.jpg" />
  <source media="(min-width: 769px)" srcSet="/images/hero/hero-desktop.jpg" />
  <img src="/images/hero/hero-desktop.jpg" alt="Katy Murr" />
</picture>
```

## Recommandation finale

**Pour votre site, je recommande :**
- **Dimension** : `1920 x 1080px` (16:9)
- **Format** : WebP (avec fallback JPG)
- **Poids** : < 300KB
- **Style** : Image professionnelle, élégante, en harmonie avec la palette de couleurs (cream, warm, accent)

