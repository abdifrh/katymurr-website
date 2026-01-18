# Guide de Migration du Contenu - katymurr.com

Ce document contient les informations extraites du site actuel [katymurr.com](https://www.katymurr.com/) pour faciliter la migration vers le nouveau site.

## Informations de Contact

- **Téléphone**: +41 79 658 56 71
- **Email**: contact@katymurr.com
- **Numéro d'entreprise**: CHE-365.506.039

## Services

### 1. English Coaching
- **Description courte**: "1:1 or small groups. Individually tailored. Native English coach."
- **Détails**: Coaching personnalisé en anglais, cours individuels ou petits groupes

### 2. Conference Interpreting
- **Description courte**: "Full consecutive & simultaneous services. MA in Conference Interpreting from FTI UNIGE."
- **Détails**: Services complets d'interprétation consécutive et simultanée

### 3. Creative Solutions
- **Description courte**: "Need another pair of eyes? Content creation, copywriting, copyediting and more."
- **Détails**: Création de contenu, rédaction publicitaire, correction

### 4. Translation & Proofreading
- **Description courte**: "Translation from French & German into English. English proofreading."
- **Détails**: Traduction français/allemand vers anglais, correction en anglais

## Cours Actuels

1. **EFL English Foreign Language Training A-Z**
2. **Business English: Keys to Success in International Geneva**
3. **Sail through Online Meetings in English**
4. **Get your Dream Job: Recruitment & Interviewing in English**

## Témoignages Clients

### 1. David Largey
- **Position**: Investment Analyst
- **Institution**: Family Office in Geneva
- **Langue**: Français
- **Témoignage**: "Parfait ! Ayant eu passablement de profs différents, je peux dire que Katy est clairement parmi les meilleures profs d'anglais..."

### 2. Aslan Khabliev
- **Position**: CEO
- **Institution**: Skytec Group Ltd
- **Langue**: Anglais
- **Témoignage**: "Katy is an outstanding teacher who empowers her pupils..."

### 3. Sandrine Grept
- **Position**: Founding Doctor
- **Institution**: SGL Esthétique, Geneva
- **Langue**: Français
- **Témoignage**: "Grâce à sa méthode basée sur la conversation..."

### 4. Soazic Grassiot
- **Position**: Founder
- **Institution**: Favilla, Geneva
- **Langue**: Français
- **Témoignage**: "Katy est une personne dynamique, curieuse et travailleuse..."

### 5. Auguste Velay
- **Position**: Analyst
- **Institution**: Fund Management Company
- **Langue**: Français
- **Témoignage**: "Parfait ! Katy est une professeure très compétente..."

## Tagline Principal

- **Anglais**: "Want to communicate better?"
- **Français**: "Vous voulez mieux communiquer ?"

## Sous-titre

- **Anglais**: "Conference Interpreter, English Coach & Writer"
- **Français**: "Interprète de conférence, Coach en anglais & Écrivaine"

## Instructions pour Importer les Données

1. **Exécuter le schéma SQL** (`server/supabase-schema.sql`) dans Supabase
2. **Exécuter les données initiales** (`server/data/initialData.sql`) pour importer les témoignages
3. **Utiliser le dashboard admin** pour ajouter/modifier le contenu
4. **Vérifier les coordonnées** dans les pages Contact et Footer

## Fichiers Créés

- `client/src/data/siteContent.ts` - Données structurées du site
- `server/data/initialData.sql` - Script SQL pour importer les témoignages
- `CONTENT_MIGRATION.md` - Ce document

