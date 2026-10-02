import { z } from 'astro/zod';
import taxonomies from '../../data/taxonomies.json' with { type: 'json' };
import { image, metier } from './communs';
import { JOURS } from './site';

const tagsDe = (collection: keyof typeof taxonomies.tags) =>
  z.array(z.enum(Object.keys(taxonomies.tags[collection]) as [string, ...string[]])).max(6).default([]);

const heure = z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, 'heure attendue au format HH:MM (ex. 18:30)');

const seo = z
  .object({
    titre: z.string().max(60).optional(),
    description: z.string().min(120).max(160).optional(),
    noindex: z.boolean().default(false),
  })
  .strict()
  .default({ noindex: false });

/** Champs communs à toutes les collections (spec §5). */
const communs = {
  titre: z.string().min(3).max(90),
  statut: z.enum(['brouillon', 'publie', 'programme']).default('publie'),
  date: z.coerce.date().optional(),
  resume: z.string().max(300).optional(),
  image: image.optional(),
  categorie: metier,
  mis_en_avant: z.boolean().default(false),
  ordre: z.number().int().default(100),
  seo,
  ancres: z
    .array(z.string().min(3).max(60))
    .max(6)
    .optional()
    .describe("Expressions qui, dans le texte des autres pages, deviennent un lien vers celle-ci (ex. « pompe à chaleur de piscine »). Précises, 2 à 6 mots ; jamais « ici », « nos services »."),
  role: z
    .enum(['aimant', 'seo'])
    .optional()
    .describe("aimant : élément que le visiteur a envie d'ouvrir, cible des liens d'engagement. seo : page d'entrée depuis Google (les zones le sont par défaut)."),
  /** Sections facultatives ajoutées après le corps sur la page de détail (validées par le schéma de page). */
  sections: z.array(z.any()).optional(),
};

export const collectionSchemas = {
  services: z
    .object({
      ...communs,
      prestations: z
        .array(z.object({ label: z.string().max(45), badge: z.string().max(14).optional() }).strict())
        .min(1)
        .max(6)
        .describe('Prestations listées sur la carte et la page du service'),
      lien_label: z.string().max(40).default('Voir le détail').describe('Texte du lien de la carte'),
    })
    .strict()
    .describe('Un métier / une offre de service. Page de détail : /services/<id>.'),

  realisations: z
    .object({
      ...communs,
      date: z.coerce.date(),
      lieu: z.string().max(40).describe('Commune du chantier'),
      tags: tagsDe('realisations'),
      galerie: z.array(image).max(24).default([]),
    })
    .strict()
    .describe('Un chantier réalisé. Page de détail : /realisations/<id>.'),

  zones: z
    .object({
      ...communs,
      ville: z.string().max(40),
    })
    .strict()
    .describe("Une page locale « métier + ville » pour le référencement. Page de détail : /zones/<id>."),

  equipes: z
    .object({
      ...communs,
      nom_court: z.string().min(2).max(30).describe('Nom court affiché dans les listes et le planning (ex. « −12 ans », « Baby rugby »)'),
      ages: z.string().max(60).optional().describe('Âges ou années de naissance, seulement si le club les a donnés'),
      championnat: z.string().max(80).optional().describe('Compétition disputée (équipes en championnat)'),
      creneaux: z
        .array(
          z
            .object({
              jour: z.enum(JOURS),
              debut: heure,
              fin: heure,
              lieu: z.string().max(60).optional().describe('Si différent du lieu habituel'),
            })
            .strict()
            .refine((c) => c.fin > c.debut, { message: 'fin avant le début', path: ['fin'] }),
        )
        .max(6)
        .default([])
        .describe('Entraînements de la semaine'),
      encadrants: z
        .array(z.object({ nom: z.string().min(2).max(60), role: z.string().max(40).optional() }).strict())
        .max(6)
        .default([])
        .describe('Éducateurs et entraîneurs : nom affiché seulement avec leur accord'),
    })
    .strict()
    .describe("Une équipe ou une catégorie d'âge, avec ses créneaux. Le type (école, compétition, loisir) est la catégorie. Page de détail : /equipes/<id>."),
} as const;

export type NomCollection = keyof typeof collectionSchemas;
export const nomsCollections = Object.keys(collectionSchemas) as NomCollection[];
