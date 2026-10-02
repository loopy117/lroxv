/** Registre des cartes : quelle carte sait afficher quelle collection (spec §3). */
import type { NomCollection } from '../schemas/collections';

export const cartes = {
  'service-carte': { collection: 'services', description: 'Grande carte : image, trait de couleur du métier, titre, résumé, prestations, lien.' },
  'realisation-carte': { collection: 'realisations', description: 'Image, commune en surtitre, titre du chantier.' },
  'zone-pastille': { collection: 'zones', description: 'Pastille cliquable colorée selon le métier. À utiliser avec la disposition « flux ».' },
} as const satisfies Record<string, { collection: NomCollection; description: string }>;

export type NomCarte = keyof typeof cartes;
export const nomsCartes = Object.keys(cartes) as NomCarte[];
