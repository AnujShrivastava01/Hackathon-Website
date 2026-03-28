/**
 * Default registration link when the event has none saved.
 * Replace in admin with your full Google Forms URL (Share → Get link).
 */
export const REGISTRATION_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSdO7N7vXy7v3z_XhA/viewform';

/** Strip invisible chars and line breaks so pasted form links stay one valid URL. */
export function normalizeRegistrationLink(raw) {
  if (typeof raw !== 'string') return '';
  return raw
    .replace(/[\u200B-\u200D\uFEFF\u00A0]/g, '')
    .replace(/\s+/g, '')
    .trim();
}

/** Resolve registration URL from API `event` with fallback to `REGISTRATION_URL`. */
export function resolveRegistrationHref(event) {
  const link = normalizeRegistrationLink(
    typeof event?.registrationLink === 'string' ? event.registrationLink : ''
  );
  return link || REGISTRATION_URL;
}

/** Hero carousel when API returns none — retro / neo-brutalist mood (not glossy stock tech). */
export const DEFAULT_HERO_CAROUSEL = [
  { url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1000&q=80&auto=format&fit=crop', caption: 'Arcade-grade focus' },
  { url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1000&q=80&auto=format&fit=crop', caption: 'Terminal tide' },
  { url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=1000&q=80&auto=format&fit=crop', caption: 'Neon ship mode' },
  { url: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=1000&q=80&auto=format&fit=crop', caption: 'Classic workspace' },
  { url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1000&q=80&auto=format&fit=crop', caption: 'Hit record on your build' },
];

/** Fixed prize pool tiers shown on the landing page (public). */
export const PRIZE_TIERS = [
  { place: '1st', label: 'First prize', amount: '1,00,000', currency: '₹' },
  { place: '2nd', label: 'Second prize', amount: '50,000', currency: '₹' },
  { place: '3rd', label: 'Third prize', amount: '25,000', currency: '₹' },
];
