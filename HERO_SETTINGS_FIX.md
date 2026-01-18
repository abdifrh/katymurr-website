# Correction du Hero Dynamique - Settings

## Problème

Le hero n'affichait pas les valeurs modifiées dans le dashboard admin car :
1. Les clés dans la base de données sont `hero_title_en`, `hero_title_fr` (avec suffixe)
2. Le code cherchait `hero_title` avec le paramètre `language`
3. Les settings n'étaient pas rechargés automatiquement après modification

## Solutions Appliquées

### 1. Fonction `getSetting` Améliorée

La fonction `getSetting` cherche maintenant dans cet ordre :
1. **Clé avec suffixe de langue** : `hero_title_en`, `hero_title_fr` (format actuel dans la DB)
2. **Clé avec champ language** : `hero_title` avec `language='en'` (format alternatif)
3. **Clé globale** : `hero_title` sans langue (fallback)

```typescript
const getSetting = (key: string, lang?: string): string | undefined => {
  const langKey = lang || language
  
  // First, try key with language suffix (e.g., hero_title_en, hero_title_fr)
  const keyWithLang = `${key}_${langKey}`
  const settingWithSuffix = Object.values(settings).find(
    s => s.key === keyWithLang
  )
  if (settingWithSuffix) return settingWithSuffix.value
  
  // Second, try key with language field
  const langSetting = Object.values(settings).find(
    s => s.key === key && s.language === langKey
  )
  if (langSetting) return langSetting.value

  // Third, try global setting
  const globalSetting = Object.values(settings).find(
    s => s.key === key && !s.language
  )
  return globalSetting?.value
}
```

### 2. Rechargement Automatique des Settings

Les settings sont maintenant rechargés :
- **Au chargement initial** de la page
- **Quand la fenêtre reprend le focus** (si l'utilisateur a modifié dans un autre onglet)
- **Toutes les 30 secondes** automatiquement

## Vérification

### 1. Dans Supabase

Vérifiez que les settings existent avec les bonnes clés :

```sql
SELECT key, value, language 
FROM site_settings 
WHERE key LIKE 'hero_%'
ORDER BY key, language;
```

Vous devriez voir :
- `hero_title_en` (language: NULL ou 'en')
- `hero_title_fr` (language: NULL ou 'fr')
- `hero_subtitle_en`
- `hero_subtitle_fr`
- `hero_cta_text_en`
- `hero_cta_text_fr`
- `hero_cta_link` (language: NULL)
- `hero_image_url` (language: NULL)

### 2. Dans le Dashboard Admin

1. Allez dans **Settings** → **Hero Section**
2. Modifiez les valeurs (ex: `hero_title_fr`)
3. Les changements sont sauvegardés automatiquement

### 3. Sur le Frontend

1. **Rafraîchissez la page** (F5 ou Ctrl+R)
2. Ou **attendez 30 secondes** pour le rechargement automatique
3. Ou **changez d'onglet puis revenez** (rechargement au focus)

Le hero devrait maintenant afficher les valeurs modifiées dans le dashboard.

## Debug

Si les valeurs ne s'affichent toujours pas :

1. **Ouvrez la console du navigateur** (F12)
2. Vérifiez les erreurs dans la console
3. Vérifiez que les settings sont bien chargés :
   ```javascript
   // Dans la console
   console.log(window.__SITE_SETTINGS__) // Si exposé
   ```

4. **Vérifiez la réponse de l'API** :
   - Ouvrez l'onglet Network
   - Cherchez la requête vers `/api/settings`
   - Vérifiez que les valeurs sont bien présentes dans la réponse

5. **Vérifiez les clés dans Supabase** :
   - Les clés doivent être exactement : `hero_title_en`, `hero_title_fr`, etc.
   - Pas de fautes de frappe
   - Les valeurs doivent être non vides

## Notes

- Les settings sont maintenant **compatibles avec les deux formats** (suffixe ou champ language)
- Le rechargement automatique garantit que les modifications sont visibles rapidement
- Le rechargement au focus permet de voir les changements faits dans un autre onglet

