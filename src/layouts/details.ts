/**
 * Gabarits de détail des collections, écrits comme des compositions de
 * sections (spec §5). Les boucles « similaires » utilisent $courant.
 * Partie présentation : l'IA ne modifie pas ce fichier.
 */
import site from '../../data/site.json';
import taxonomies from '../../data/taxonomies.json';
import type { NomCollection } from '../schemas/collections';

const ctaFin = { block: 'cta', variant: 'carte', spacing: 'compact', ...site.cta_defaut };
const devis = { label: 'Demander un devis gratuit', href: '/contact', style: 'primaire' };
const dateFr = (d?: Date) => (d ? new Intl.DateTimeFormat('fr-FR', { month: 'long', year: 'numeric' }).format(d) : undefined);

/** Sections placées avant le corps Markdown, et après. */
export function gabaritDetail(collection: NomCollection, e: { id: string; data: any }): { avant: any[]; apres: any[] } {
  const d = e.data;
  const metier = (taxonomies.metiers as Record<string, string>)[d.categorie];
  switch (collection) {
    case 'services':
      return {
        avant: [
          { block: 'hero', variant: d.image ? 'split' : 'minimal', surtitre: 'Nos métiers', titre: d.titre, texte: d.resume, image: d.image, ctas: [devis] },
          { block: 'features', variant: 'grille-icones', titre: 'Nos prestations', items: d.prestations.map((p: any) => ({ icone: 'check', titre: p.label })) },
        ],
        apres: [
          { block: 'boucle', background: 'alt', titre: `Nos chantiers en ${metier.toLowerCase()}`, source: 'realisations', filtre: { categorie: '$courant.categorie' }, ordre: 'date desc', nombre: 3, carte: 'realisation-carte', affichage: 'grid', lien_tout_voir: { label: 'Tous les chantiers', href: '/realisations' } },
          { block: 'boucle', titre: 'Où nous intervenons', source: 'zones', filtre: { categorie: '$courant.categorie' }, ordre: 'ordre asc', nombre: 24, carte: 'zone-pastille', affichage: 'flux' },
          ctaFin,
        ],
      };
    case 'realisations':
      return {
        avant: [
          { block: 'hero', variant: d.image ? 'split' : 'minimal', surtitre: [d.lieu, dateFr(d.date)].filter(Boolean).join(' · '), titre: d.titre, texte: d.resume, image: d.image },
          ...(d.galerie?.length >= 2 ? [{ block: 'galerie', variant: 'mosaique', titre: 'En images', images: d.galerie }] : []),
        ],
        apres: [
          { block: 'boucle', titre: 'Le service', source: 'services', filtre: { categorie: '$courant.categorie' }, ordre: 'ordre asc', nombre: 1, carte: 'service-carte', affichage: 'grid' },
          { block: 'boucle', titre: 'Nous intervenons aussi près de chez vous', source: 'zones', filtre: { categorie: '$courant.categorie', ville: '$courant.lieu' }, ordre: 'ordre asc', nombre: 4, carte: 'zone-pastille', affichage: 'flux' },
          { block: 'boucle', background: 'alt', titre: 'Chantiers similaires', source: 'realisations', filtre: { categorie: '$courant.categorie' }, exclure: ['$courant.id'], ordre: 'date desc', nombre: 3, carte: 'realisation-carte', affichage: 'grid' },
          ctaFin,
        ],
      };
    case 'zones':
      return {
        avant: [{ block: 'hero', variant: 'minimal', surtitre: d.ville, titre: d.titre, texte: d.resume, ctas: [devis] }],
        apres: [
          { block: 'boucle', titre: 'Le service', source: 'services', filtre: { categorie: '$courant.categorie' }, ordre: 'ordre asc', nombre: 3, carte: 'service-carte', affichage: 'grid' },
          { block: 'boucle', background: 'alt', titre: `Nos chantiers à ${d.ville}`, source: 'realisations', filtre: { categorie: '$courant.categorie', lieu: '$courant.ville' }, ordre: 'date desc', nombre: 3, carte: 'realisation-carte', affichage: 'grid' },
          ctaFin,
        ],
      };
  }
}
