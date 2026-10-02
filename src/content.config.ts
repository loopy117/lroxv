import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { page } from './schemas/page';
import { collectionSchemas } from './schemas/collections';

// Les fichiers de contenu vivent dans /content (hors src/), un dossier par collection.
export const collections = {
  pages: defineCollection({ loader: glob({ pattern: '**/*.yaml', base: './content/pages' }), schema: page }),
  services: defineCollection({ loader: glob({ pattern: '*.md', base: './content/services' }), schema: collectionSchemas.services }),
  realisations: defineCollection({ loader: glob({ pattern: '*.md', base: './content/realisations' }), schema: collectionSchemas.realisations }),
  equipes: defineCollection({ loader: glob({ pattern: '*.md', base: './content/equipes' }), schema: collectionSchemas.equipes }),
  zones: defineCollection({ loader: glob({ pattern: '*.md', base: './content/zones' }), schema: collectionSchemas.zones }),
};
