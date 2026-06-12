# Site Web — Bien en Soi Massage
## Centre de Thérapie par le Massage

Voici votre site web complet, prêt à être mis en ligne.

## 📁 Contenu

- `index.html` — Page d'accueil
- `services.html` — Liste complète des soins offerts
- `produits.html` — Boutique de produits (alimentée par Supabase)
- `admin.html` — Page privée pour gérer les produits (voir GUIDE-SUPABASE.md)
- `a-propos.html` — Présentation de Martine Charles
- `contact.html` — Coordonnées, carte et bouton de réservation
- `css/style.css` — Tous les styles visuels
- `js/main.js` — Menu mobile et animations
- `js/produits.js` — Connexion à la base de données des produits (Supabase)
- `images/logo.svg` — Logo (inspiré de votre carte d'affaires)
- `robots.txt` et `sitemap.xml` — Pour le référencement Google
- `GUIDE-SUPABASE.md` — Guide pour activer la boutique de produits

## 🌐 Comment mettre le site en ligne (gratuitement)

**Option recommandée : Netlify (très simple)**
1. Allez sur https://app.netlify.com/drop
2. Faites glisser le dossier complet `site` dans la fenêtre
3. Votre site est en ligne en quelques secondes avec une adresse temporaire
4. Vous pouvez ensuite connecter un nom de domaine (ex: bienensoimassage.com) dans les paramètres "Domain settings"

**Autres options :** GitHub Pages, Vercel, ou un hébergeur classique (transférer les fichiers via FTP/cPanel).

## 🔍 Pour apparaître sur Google (comme dans votre exemple Moodle)

1. **Achetez un nom de domaine** (ex : bienensoimassage.com) — environ 15-20$/an chez Namecheap, GoDaddy, ou OVH.
2. **Connectez-le à votre hébergement** (Netlify explique l'étape par étape).
3. **Important : remplacez** `https://bienensoimassage.com` dans les fichiers (balises `<link rel="canonical">`, `og:url`, `sitemap.xml`, `robots.txt`) **par votre vrai nom de domaine**.
4. **Inscrivez le site sur Google Search Console** (https://search.google.com/search-console) :
   - Ajoutez votre site
   - Soumettez le fichier `sitemap.xml`
   - Google indexera votre site en quelques jours à quelques semaines

5. **Créez une fiche Google Business Profile** (https://business.google.com) avec la même adresse, le même nom et le même numéro de téléphone — cela aide énormément à apparaître dans les recherches locales ("massage Québec", "massothérapeute près de moi", etc.)

## ✏️ Modifications faciles

- **Numéro de téléphone / courriel / adresse** : recherchez ces informations dans chaque fichier `.html` et remplacez-les.
- **Couleurs** : modifiez les variables au tout début de `css/style.css` (section `:root`).
- **Lien de réservation** : actuellement pointé vers `https://www.gorendezvous.com/BienenSoiMassage`.

## 🛍️ Page Produits / Boutique

La page `produits.html` affiche un catalogue de produits (photo, description, prix) que
Martine peut gérer elle-même via la page `admin.html`.

**Pour l'activer**, suivez le `GUIDE-SUPABASE.md` (configuration unique, environ 15-20 min).

**Accès à la page admin :** discrètement, via le petit point "." à la fin de la phrase
"...soins personnalisés et bienveillants." dans le pied de page de chaque page. Le mot de
passe par défaut est `bienensoi2026` — **changez-le** dans `admin.html`.

## 💡 Suggestion

Si vous avez de vraies photos professionnelles (du centre, des soins, de Martine), elles peuvent
remplacer les visuels décoratifs actuels pour rendre le site encore plus personnel et chaleureux.
Faites-moi signe si vous voulez que je les intègre !
