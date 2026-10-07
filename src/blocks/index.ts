import Hero from './Hero.astro';
import Texte from './Texte.astro';
import TexteImage from './TexteImage.astro';
import Features from './Features.astro';
import Galerie from './Galerie.astro';
import Slider from './Slider.astro';
import Cta from './Cta.astro';
import Faq from './Faq.astro';
import Chiffres from './Chiffres.astro';
import Boucle from './Boucle.astro';
import Formulaire from './Formulaire.astro';
import Tarifs from './Tarifs.astro';
import Partenaires from './Partenaires.astro';
import Planning from './Planning.astro';
import Legal from './Legal.astro';
import Carte from './Carte.astro';
import Labels from './Labels.astro';
import MatchCenter from './MatchCenter.astro';
import Frise from './Frise.astro';
import AvisGoogle from './AvisGoogle.astro';
import type { NomBloc } from '../schemas/blocs';

export const composantsBlocs: Record<NomBloc, any> = {
  hero: Hero, texte: Texte, 'texte-image': TexteImage, features: Features, galerie: Galerie,
  slider: Slider, cta: Cta, faq: Faq, chiffres: Chiffres, formulaire: Formulaire, boucle: Boucle, tarifs: Tarifs, partenaires: Partenaires, planning: Planning, legal: Legal, carte: Carte, labels: Labels, 'match-center': MatchCenter, frise: Frise, 'avis-google': AvisGoogle,
};
