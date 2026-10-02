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

Commandes : `npm run dev`, `npm run validate`, `npm run build`.
Hébergement : serveur xmediacreation (`sudo xm-site creer lroxv www.lroxv.fr lroxv.fr`), voir `DEPLOIEMENT.md`.
