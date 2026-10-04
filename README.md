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
- **Actualités** (`content/actualites/`) et **albums** (`content/albums/`), rattachables à une équipe ; un album ne peut être
  publié qu'avec « Droit à l'image vérifié » coché (la validation le refuse sinon).
- **Frise** : bloc `frise` pour l'histoire et le palmarès, à remplir avec le club.

Commandes : `npm run dev`, `npm run validate`, `npm run build`.
Hébergement : serveur xmediacreation (`sudo xm-site creer lroxv www.lroxv.fr lroxv.fr`), voir `DEPLOIEMENT.md`.
