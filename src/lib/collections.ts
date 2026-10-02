/**
 * Réglages de routage et d'affichage des collections (spec §5).
 * Partie « présentation » : l'IA ne modifie pas ce fichier.
 */
import type { NomCollection } from '../schemas/collections';

export interface ReglagesCollection {
  base: string;               // préfixe d'URL
  libelle: string;            // nom affiché (menu, fil d'Ariane, archive)
  detail: boolean;            // une page par élément
  archive?: {
    titre: string;
    intro?: string;
    carte: string;
    affichage: 'grid' | 'slider' | 'liste' | 'masonry' | 'flux';
    options?: Record<string, unknown>;
    ordre: string | string[];
    parPage: number;
    parCategorie: boolean;    // pages /<base>/categorie/<slug>
  };
}

export const reglages: Record<NomCollection, ReglagesCollection> = {
  services: { base: '/services', libelle: 'Services', detail: true },
  realisations: {
    base: '/realisations',
    libelle: 'Réalisations',
    detail: true,
    archive: {
      titre: 'Nos réalisations',
      intro: 'Chantiers de climatisation, pompe à chaleur et électricité autour de Pertuis et dans le Pays d\'Aix.',
      carte: 'realisation-carte',
      affichage: 'grid',
      options: { colonnes: 3 },
      ordre: 'date desc',
      parPage: 12,
      parCategorie: true,
    },
  },
  equipes: {
    base: '/equipes',
    libelle: 'Équipes',
    detail: true,
    archive: {
      titre: 'Nos équipes',
      intro: 'Toutes les catégories du club, du baby rugby au rugby loisir, avec leurs créneaux d\'entraînement.',
      carte: 'equipe-carte',
      affichage: 'grid',
      options: { colonnes: 3 },
      ordre: 'ordre asc',
      parPage: 30,
      parCategorie: false,
    },
  },
  zones: {
    base: '/zones',
    libelle: "Zones d'intervention",
    detail: true,
    archive: {
      titre: "Zones d'intervention",
      intro: "Autour de Pertuis, jusqu'au Pays d'Aix.",
      carte: 'zone-pastille',
      affichage: 'flux',
      ordre: 'ordre asc',
      parPage: 60,
      parCategorie: false,
    },
  },
};
