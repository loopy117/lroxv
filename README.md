# La Roque Ovalie XV — site du club de rugby de La Roque-d'Anthéron

Site statique Astro construit avec le système xmedia·ai (même socle que les sites clients), modèle `club`, variante `rugby`.

| Dossier | Rôle |
| --- | --- |
| `content/` | pages (YAML) et collections (Markdown) |
| `data/` | coordonnées (`site.json`), menu, pied de page, formulaire d'inscription (`formulaires.json`) |
| `src/` | gabarit : blocs, schémas, styles (`src/styles/tokens.css` = noir, bleu ciel et or du maillot, Barlow) |
| `media/` | images d'origine, importées par `npm run import-media` |
| `ai/` | règles et catalogue lus par Claude |

Cadrage : document « modeles-clients-et-version-club » du projet CMS IA (section B8). Maquette de l'accueil : canevas « LROXV – page d'accueil ».

## Saison : rencontres, actualités, albums

- **Rencontres** (`content/rencontres/`, éditeur › Rencontres) : équipe, type (match, plateau, tournoi, amical), date et heure,
  adversaire, domicile ou extérieur, lieu, compétition, score facultatif (les plateaux de l'école de rugby n'en ont pas),
  annulée. Compte rendu dans le corps. Elles alimentent `/calendrier` (à venir, puis résultats), les pages des équipes et le
  bloc `match-center` de l'accueil (prochaine rencontre, dernier résultat), qui reste invisible tant que le calendrier est vide.
  Le site est reconstruit chaque matin (4 h 23 UTC) pour que « prochaine rencontre » soit toujours juste.
- **Saisie depuis le téléphone** : espace client › Rencontres et scores. Les entraîneurs (comptes « Entraîneur », limités
  à leurs équipes) ajoutent les rencontres et les scores, enregistrés directement dans `content/rencontres/` ; le build
  publie pour cela `xmedia-ai/contexte/rencontres.json` (`scripts/contexte-ia.ts`).
- **Actualités** (`content/actualites/`), rattachables à une équipe.
- **Albums** (`content/albums/`) : uniquement par l'espace client › Albums photos (dépôt depuis le téléphone, vérification du
  droit à l'image contre la liste des refus, validation de l'agence). Ils ne figurent pas dans l'éditeur, et le relais de
  l'éditeur refuse toute écriture dans `content/albums/` et `media/albums/`. La validation du site refuse aussi un album publié
  sans « autorisations ».
- **Espace des familles** (`/xmedia-ai/famille/`, lien « Espace familles » du menu) : servi par le serveur de l'agence, hors du
  site public. Connexion par lien e-mail pour les adresses de la liste des licenciés (espace client › Adhérents), demande
  d'accès pour les oubliés, droit à l'image en ligne, albums réservés aux familles, annonces, documents, message au club.
- **Frise** : bloc `frise` pour l'histoire et le palmarès, à remplir avec le club.

Commandes : `npm run dev`, `npm run validate`, `npm run build`.
Hébergement : serveur xmediacreation (`sudo xm-site creer lroxv www.lroxv.fr lroxv.fr`), voir `DEPLOIEMENT.md`.
