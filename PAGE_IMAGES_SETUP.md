# Système d'Images pour les Pages

## Vue d'ensemble

Un système complet a été ajouté pour permettre l'ajout d'images aux pages, avec un layout automatique "image à gauche, texte à droite" pour les pages qui ont une image.

## 1. Base de données

### Ajouter le champ `featured_image` à la table `pages`

Exécutez ce SQL dans Supabase :

```sql
-- Fichier: server/data/addPageImages.sql
ALTER TABLE pages 
ADD COLUMN IF NOT EXISTS featured_image VARCHAR(500);

-- Add index for better performance
CREATE INDEX IF NOT EXISTS idx_pages_featured_image ON pages(featured_image) WHERE featured_image IS NOT NULL;
```

## 2. Fonctionnalités

### Dans le Dashboard Admin (`AdminPages.tsx`)

- ✅ **Champ "Featured Image"** dans l'éditeur de page
- ✅ **Input URL** pour entrer manuellement une URL d'image
- ✅ **Bouton "Select from Library"** pour choisir une image existante
- ✅ **Bouton "Upload New Image"** pour uploader une nouvelle image
- ✅ **Prévisualisation** de l'image sélectionnée
- ✅ **Médiathèque** avec grille d'images cliquables

### Dans le Frontend (`DynamicPage.tsx`)

- ✅ **Détection automatique** : Si une page a `featured_image`, le layout change automatiquement
- ✅ **Layout responsive** :
  - **Desktop** : Image à gauche (sticky), texte à droite
  - **Mobile** : Image en haut, texte en dessous
- ✅ **Styles CSS** pour un rendu élégant

## 3. Utilisation

### Dans le Dashboard

1. Allez dans **Pages** → **Edit** (ou **Add New**)
2. Dans le champ **"Featured Image"** :
   - **Option 1** : Entrez directement l'URL de l'image
   - **Option 2** : Cliquez sur **"Select from Library"** pour choisir une image existante
   - **Option 3** : Cliquez sur **"Upload New Image"** pour uploader une nouvelle image depuis votre ordinateur
3. L'image sera automatiquement sauvegardée dans le bucket `media` de Supabase Storage
4. Sauvegardez la page

### Résultat sur le Frontend

- Si la page a une `featured_image` :
  - L'image s'affiche à gauche (desktop) ou en haut (mobile)
  - Le contenu texte s'affiche à droite (desktop) ou en dessous (mobile)
  - Layout automatique avec styles élégants

- Si la page n'a pas d'image :
  - Le contenu s'affiche normalement, centré

## 4. Exemple : Page About

La page About peut maintenant avoir une image professionnelle à gauche avec le texte à droite :

1. **Dans le Dashboard** :
   - Allez dans **Pages** → Trouvez "About" → **Edit**
   - Dans **"Featured Image"**, uploadez ou sélectionnez une image
   - Sauvegardez

2. **Sur le Frontend** :
   - La page About affichera automatiquement l'image à gauche et le texte à droite
   - Le layout est responsive et s'adapte aux petits écrans

## 5. Styles CSS

Les styles sont dans :
- `client/src/components/DynamicPage/DynamicPage.css` - Layout image/texte
- `client/src/pages/Admin/AdminPages.css` - Interface admin (médiathèque, upload)

## 6. Structure HTML Générée

```html
<div class="page-content-with-image">
  <div class="page-image">
    <img src="[featured_image_url]" alt="[page_title]" class="page-featured-image" />
  </div>
  <div class="page-text">
    <div class="dynamic-content">
      [page.content HTML]
    </div>
  </div>
</div>
```

## 7. Notes Techniques

- Les images sont stockées dans le bucket `media` de Supabase Storage
- Les URLs sont sauvegardées dans le champ `featured_image` de la table `pages`
- Le layout utilise CSS Grid avec `grid-template-columns: 1fr 2fr` (image 1/3, texte 2/3)
- Sur mobile, le grid devient `1fr` (une colonne)
- L'image est `position: sticky` sur desktop pour rester visible lors du scroll

## 8. Prochaines Étapes

Pour utiliser ce système :

1. ✅ Exécutez le SQL pour ajouter le champ `featured_image`
2. ✅ Redémarrez le serveur backend si nécessaire
3. ✅ Allez dans le Dashboard → Pages → Edit une page
4. ✅ Uploadez ou sélectionnez une image
5. ✅ Sauvegardez et vérifiez sur le frontend

