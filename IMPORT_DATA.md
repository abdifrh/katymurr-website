# Guide d'Importation des Données

Ce guide explique comment importer les données d'exemple dans votre base de données Supabase.

## Étapes d'Importation

### 1. Exécuter le Schéma SQL

D'abord, assurez-vous que le schéma de base de données est créé :

1. Ouvrez votre projet Supabase
2. Allez dans **SQL Editor**
3. Exécutez le contenu de `server/supabase-schema.sql`

### 2. Importer les Données d'Exemple

1. Dans le **SQL Editor** de Supabase
2. Copiez et exécutez le contenu de `server/data/sampleData.sql`

Ce script va insérer :
- **Pages** : Pages d'accueil et "À propos" en anglais et français
- **Catégories de blog** : 8 catégories (4 en anglais, 4 en français)
- **Articles de blog** : 6 articles publiés avec contenu complet
- **Références/Témoignages** : 8 témoignages (5 en vedette, 3 supplémentaires)
- **Médias** : 7 entrées de médias avec URLs placeholder

## Données Incluses

### Pages
- Home (EN/FR)
- About (EN/FR)

### Catégories de Blog
- English Coaching / Coaching en anglais
- Conference Interpreting / Interprétation de conférence
- Writing / Écriture
- Language Learning / Apprentissage des langues

### Articles de Blog
1. **5 Tips for Improving Your Business English** (EN)
2. **Comment améliorer votre anglais professionnel** (FR)
3. **The Art of Conference Interpreting** (EN)
4. **L'art de l'interprétation de conférence** (FR)
5. **Effective Online Meeting Communication in English** (EN)
6. **Writing for International Audiences** (EN)

### Témoignages (Réels du site katymurr.com)
- David Largey (Investment Analyst) - Featured
- Aslan Khabliev (CEO, Skytec Group Ltd) - Featured
- Sandrine Grept (Founding Doctor, SGL Esthétique) - Featured
- Soazic Grassiot (Founder, Favilla) - Featured
- Auguste Velay (Analyst) - Featured
- Marie Dubois (Marketing Director) - Additional
- Jean-Pierre Martin (Senior Consultant) - Additional
- Sarah Johnson (Project Manager) - Additional

## Personnalisation

Après l'importation, vous pouvez :

1. **Modifier le contenu** via le dashboard admin (`/admin`)
2. **Ajouter des images** en uploadant des fichiers et mettant à jour les URLs dans la table `media`
3. **Créer de nouveaux articles** via le dashboard admin
4. **Ajouter des pages** personnalisées selon vos besoins

## Notes Importantes

- Les URLs des médias sont des placeholders - remplacez-les par les vraies URLs après avoir uploadé vos images
- Les articles de blog sont déjà publiés (`published: true`)
- Les témoignages marqués comme `featured: true` apparaîtront sur la page d'accueil
- Vous pouvez modifier toutes ces données via le dashboard admin une fois connecté

## Vérification

Après l'importation, vérifiez que :

1. Les pages sont accessibles sur le site
2. Les articles de blog apparaissent dans `/blog`
3. Les témoignages s'affichent sur `/references`
4. Les catégories sont disponibles dans le filtre du blog

## Prochaines Étapes

1. Uploader vos images réelles et mettre à jour les URLs dans la table `media`
2. Personnaliser le contenu des pages selon vos besoins
3. Ajouter plus d'articles de blog
4. Configurer les métadonnées SEO pour chaque page

