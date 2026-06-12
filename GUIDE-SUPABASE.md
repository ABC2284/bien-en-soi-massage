# Guide — Configurer la base de données des produits (Supabase)

Ce guide vous explique comment activer la page **Produits** et la page **Administration**
(`admin.html`) de votre site. Sans cette configuration, ces deux pages afficheront
"Aucun produit disponible" et ne fonctionneront pas.

C'est gratuit et prend environ **15-20 minutes**, à faire une seule fois.

---

## Étape 1 — Créer un compte Supabase

1. Allez sur https://supabase.com
2. Cliquez sur **"Start your project"**
3. Connectez-vous avec le compte Google de l'entreprise (ex: `bienensoimassagemassage@gmail.com`)
4. Cliquez sur **"New project"**
   - Nom du projet : `bien-en-soi-massage`
   - Mot de passe de base de données : choisissez-en un et **conservez-le** (pas besoin de le retenir, juste de le noter)
   - Région : choisissez **Canada (Central)** si disponible, sinon East US
5. Cliquez **"Create new project"** — patientez 1-2 minutes pendant la création

---

## Étape 2 — Créer la table "produits"

1. Dans le menu de gauche, cliquez sur **"Table Editor"**
2. Cliquez **"New table"**
3. Nom de la table : `produits`
4. **Décochez** "Enable Row Level Security (RLS)" temporairement (on l'activera après)
5. Ajoutez les colonnes suivantes (en plus de `id` et `created_at` qui existent déjà) :

   | Nom de la colonne | Type     |
   |-------------------|----------|
   | `nom`             | text     |
   | `description`     | text     |
   | `prix`            | numeric  |
   | `image_url`       | text     |

6. Cliquez **"Save"**

---

## Étape 3 — Activer la sécurité (RLS) correctement

C'est une étape importante : elle permet à **tout le monde de voir** les produits, mais
seulement aux personnes connaissant le mot de passe admin de pouvoir **en ajouter ou
supprimer** (via votre page `admin.html`).

1. Allez dans **"Table Editor"** → table `produits`
2. Cliquez sur l'icône de bouclier ou allez dans **"Authentication" → "Policies"**
3. Activez **"Enable RLS"** pour la table `produits`
4. Ajoutez une nouvelle politique ("New Policy") :
   - **Nom** : `Lecture publique`
   - **Opération** : `SELECT`
   - **Cible** : `public`
   - **Condition (USING)** : `true`
5. Ajoutez une deuxième politique :
   - **Nom** : `Ajout et suppression publics`
   - **Opérations** : `INSERT`, `DELETE`, `UPDATE`
   - **Cible** : `public`
   - **Condition** : `true`

   > ⚠️ Note : comme le site est "statique" (sans serveur), la protection contre
   > l'ajout/suppression se fait par le **mot de passe de la page admin.html**
   > (`bienensoi2026` par défaut — **changez-le** dans `admin.html`, ligne `ADMIN_PASSWORD`).
   > Ce n'est pas un système de sécurité bancaire, mais suffisant pour un usage normal :
   > une personne mal intentionnée devrait connaître l'URL de la base de données ET
   > le mot de passe admin pour pouvoir modifier les produits.

---

## Étape 4 — Créer le bucket de stockage pour les images

1. Dans le menu de gauche, cliquez sur **"Storage"**
2. Cliquez **"New bucket"**
3. Nom du bucket : `produits`
4. Activez **"Public bucket"** (très important — sinon les images ne s'afficheront pas)
5. Cliquez **"Create bucket"**

---

## Étape 5 — Récupérer vos clés API

1. Dans le menu de gauche, cliquez sur l'icône **⚙️ "Project Settings"**
2. Cliquez sur **"API"**
3. Vous verrez deux informations importantes :
   - **Project URL** (ex: `https://abcdefgh.supabase.co`)
   - **anon public key** (une longue clé qui commence par `eyJ...`)

---

## Étape 6 — Connecter le site à Supabase

1. Ouvrez le fichier `js/produits.js` dans votre dépôt GitHub (ou demandez-moi de le faire)
2. Remplacez ces deux lignes :

```javascript
const SUPABASE_URL = "https://VOTRE-PROJET.supabase.co";
const SUPABASE_ANON_KEY = "VOTRE_CLE_ANON_PUBLIQUE";
```

par vos vraies valeurs copiées à l'étape 5, par exemple :

```javascript
const SUPABASE_URL = "https://abcdefgh.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...";
```

3. Sauvegardez et republiez le site (Netlify/GitHub Pages se mettra à jour automatiquement)

---

## Étape 7 — Tester

1. Allez sur `votresite.com/admin.html`
2. Entrez le mot de passe (`bienensoi2026` par défaut, ou celui que vous avez choisi)
3. Ajoutez un produit test : nom, description, prix, photo
4. Allez sur `votresite.com/produits.html` — le produit devrait apparaître !

---

## 🔐 Important : changer le mot de passe admin

Dans le fichier `admin.html`, recherchez cette ligne :

```javascript
const ADMIN_PASSWORD = "bienensoi2026";
```

Remplacez `"bienensoi2026"` par un mot de passe de votre choix, entre guillemets.

---

## Besoin d'aide ?

Si une étape bloque, copiez-collez le message d'erreur et je vous aiderai à le résoudre.
