import ServiceCarte from './ServiceCarte.astro';
import RealisationCarte from './RealisationCarte.astro';
import ZonePastille from './ZonePastille.astro';
import EquipeCarte from './EquipeCarte.astro';
import type { NomCarte } from './cartes';

export const composantsCartes: Record<NomCarte, any> = {
  'service-carte': ServiceCarte,
  'realisation-carte': RealisationCarte,
  'zone-pastille': ZonePastille,
  'equipe-carte': EquipeCarte,
};
