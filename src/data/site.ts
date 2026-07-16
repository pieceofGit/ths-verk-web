// ============================================================================
// Structural constants — routes, labels, and fixed UI bits that are NOT part of
// the editable content model. Editable content lives in Keystatic
// (src/content/*), read via ../lib/content.ts.
// ============================================================================

export const SITE_NAME = 'Þ.S. Verktakar ehf.';
export const SITE_DESCRIPTION =
  'Þ.S. Verktakar ehf. — jarðvinna, flutningar og hífingar á Austurlandi síðan 1978.';

export const nav = [
  { label: 'Forsíða', href: '/' },
  { label: 'Um okkur', href: '/um-okkur' },
  { label: 'Saga', href: '/saga' },
  { label: 'Verkefni', href: '/verkefni' },
  { label: 'Tækjakostur', href: '/taekjakostur' },
];
export const contactHref = '/hafa-samband';
export const ctaLabel = 'Fáðu tilboð';

// Section eyebrows (fixed labels)
export const eyebrows = {
  about: 'UM OKKUR',
  saga: 'SAGA',
  projects: 'VERKEFNI',
  equipment: 'TÆKJAKOSTUR',
  contact: 'HAFA SAMBAND',
};

// Home hero / teaser fixed bits
export const heroScrollHint = '↓ SKRUNAÐU';
export const teaserNote = '↓ MEIRA NIÐUR';
export const teaserHrefs = ['/taekjakostur', '/verkefni', '/saga'];

// Fixed image framing for full-bleed background photos
export const heroImagePosition = 'center 34%';
export const aboutImagePosition = 'center 34%';

// Equipment tab definitions (structural)
export const equipmentTabs = [
  { key: 'grofur', label: 'Gröfur' },
  { key: 'vorubilar', label: 'Vörubílar' },
  { key: 'bukollur', label: 'Búkollur' },
  { key: 'onnur', label: 'Önnur tæki' },
];
