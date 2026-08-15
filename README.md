# Association DPG USPN

Site web de l'association des étudiants du Master 2 Droit Privé Général (USPN).

## Stack

- [Eleventy](https://www.11ty.dev/) — générateur de site statique
- [GitHub Pages](https://pages.github.com/) — hébergement gratuit, déploiement automatique via GitHub Actions
- [Pages CMS](https://pagescms.org/) — édition de contenu via une interface web (aucune ligne de code nécessaire), les modifications sont commitées directement dans ce dépôt

## Développement local

```bash
npm install
npm run dev
```

Le site est servi sur `http://localhost:8080`.

```bash
npm run build
```

Génère le site dans `_site/`.

## Éditer le contenu

Rendez-vous sur [pagescms.org](https://app.pagescms.org/), connectez-vous avec GitHub, et sélectionnez ce dépôt. Toute personne devant éditer le contenu (bureau de l'association) doit d'abord être ajoutée comme collaborateur·rice du dépôt GitHub (Settings → Collaborators, rôle "Write" minimum), accepter l'invitation, puis se connecter à Pages CMS.

Les sections éditables : Accueil, Présentation (+ Bureau), Événements, Chroniques, Partenariat (+ Partenaires), Boutique, Contact.

### Boutique / paiement

Le site est statique : il n'y a pas de panier ni de paiement géré par le site lui-même. Chaque produit a un champ "Lien de paiement Stripe" — créez un [Payment Link](https://dashboard.stripe.com/payment-links) dans le dashboard Stripe pour chaque produit et collez son URL dans ce champ via Pages CMS. Le bouton "Acheter" du site renvoie directement vers cette page de paiement Stripe hébergée. Aucun backend/serveur supplémentaire n'est nécessaire.

## Déploiement

Chaque `push` sur `main` (y compris les commits effectués par Pages CMS) déclenche automatiquement le workflow `.github/workflows/deploy.yml`, qui build le site et le publie sur GitHub Pages.

Réglage requis une seule fois : dans les Settings du dépôt GitHub → Pages → "Build and deployment" → Source = **GitHub Actions**.

## URL du site

Le dépôt est nommé `association-dpg-uspn.github.io`, ce qui donne une URL propre à la racine : `https://association-dpg-uspn.github.io/` (aucun `pathPrefix` Eleventy nécessaire).

## Charte graphique

- Couleur primaire : `#600824` (bordeaux)
- Couleur secondaire : `#C7B7A3` (beige)
- Police des titres : Playfair Display (proche du Didot de la charte)
- Police du texte courant : Georgia / Times New Roman

Logo : `src/assets/images/logo.jpg`.
