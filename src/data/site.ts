// ============================================================================
// Þ.S. Verktakar — site content
// Single source of truth for all copy + image references.
// This is the layer the CMS (Keystatic) reads/writes. Keep it data-only.
// ============================================================================

const img = (name: string) => `/uploads/${name}`;

export const site = {
  name: 'Þ.S. Verktakar ehf.',
  logo: img('logo.png'),
  phone: '471-1170',
  phoneHref: 'tel:+3544711170',
  email: 'ths@thsverk.is',
  address: 'Miðási 37 · 700 Egilsstaðir',
  facebook: 'https://www.facebook.com/thsverk',
  mapEmbed:
    'https://www.google.com/maps?q=Mi%C3%B0%C3%A1si%2037%2C%20700%20Egilssta%C3%B0ir&output=embed',
};

export const nav = [
  { key: 'home', label: 'Forsíða', href: '/' },
  { key: 'um', label: 'Um okkur', href: '/um-okkur' },
  { key: 'saga', label: 'Saga', href: '/saga' },
  { key: 'verkefni', label: 'Verkefni', href: '/verkefni' },
  { key: 'taeki', label: 'Tækjakostur', href: '/taekjakostur' },
];
export const contactHref = '/hafa-samband';
export const ctaLabel = 'Fáðu tilboð';

// ---------------------------------------------------------------- Forsíða ---
export const home = {
  hero: {
    image: img('483523128_9912688478741079_6727020034868942669_n.jpg'),
    imagePosition: 'center 34%',
    eyebrow: 'EGILSSTAÐIR · AUSTURLAND',
    titleTop: 'ÞJÓNUSTA',
    titleBottom: 'SÍÐAN ',
    titleAccent: '1978',
    sub: 'Jarðvinna · Flutningar · Hífingar',
    scrollHint: '↓ SKRUNAÐU',
  },
  services: [
    {
      title: 'Jarðvinna',
      body: 'Uppgröftur, fyllingar, klöppun og fullnaðarfrágangur lóða og vega af öllum stærðum.',
    },
    {
      title: 'Flutningar',
      body: 'Efnis- og tækjaflutningar með vörubílum og búkollum um allt Austurland.',
    },
    {
      title: 'Hífingar',
      body: 'Örugg hífing og tilfærsla á þungum búnaði með réttum tækjum og reyndum mönnum.',
    },
  ],
  intro: {
    image: img('4b50cc_de89f30bc63442aa8baef8ada13504f9~mv2.jpg.avif'),
    heading: 'Traustir verktakar í meira en 45 ár',
    paragraphs: [
      'Þ.S. Verktakar er fjölskyldufyrirtæki með aðsetur á Egilsstöðum. Frá árinu 1978 höfum við unnið jarðvinnu, flutninga og hífingar fyrir sveitarfélög, fyrirtæki og einstaklinga á Austurlandi.',
      'Öflugur tækjakostur, reynt starfsfólk og áhersla á að klára verkið rétt — sama hvernig viðrar.',
    ],
    linkLabel: 'Lesa meira um okkur →',
  },
  teasers: {
    heading: 'Kynntu þér meira',
    note: '↓ MEIRA NIÐUR',
    items: [
      {
        href: '/taekjakostur',
        image: img('4b50cc_342ce06b69654816938d009a7839d524~mv2.jpg.avif'),
        label: 'TÆKJAKOSTUR →',
        body: 'Gröfur, vörubílar, búkollur og annar búnaður.',
      },
      {
        href: '/verkefni',
        image: img('4b50cc_c37af423961f40e6a2d1727d62f5495a~mv2.png'),
        label: 'VERKEFNI →',
      },
      {
        href: '/saga',
        image: img('4b50cc_36d64be263534334962aba91a1b72a54~mv2_d_1818_1228_s_2.jpg.avif'),
        label: 'SAGA →',
      },
    ],
  },
};

// -------------------------------------------------------------- Um okkur ---
export const about = {
  eyebrow: 'UM OKKUR',
  title: ['Fjölskyldu­fyrirtæki', 'á Austurlandi'],
  paragraphs: [
    'Þ.S. Verktakar ehf. hefur frá árinu 1978 boðið upp á jarðvinnu, flutninga og hífingar á Austurlandi. Fyrirtækið er rekið af sömu fjölskyldu og byggir á áratuga reynslu og þekkingu á aðstæðum á svæðinu.',
    'Við tökum að okkur verk af öllum stærðum — allt frá undirbúningi einstakra lóða til stærri jarðvinnu- og vegaframkvæmda. Áhersla er lögð á vönduð vinnubrögð, öryggi og að standa við gefin tímamörk.',
    'Öflugur og vel við haldinn tækjakostur gerir okkur kleift að vinna við krefjandi aðstæður allan ársins hring.',
  ],
  stats: [
    { value: '1978', label: 'Stofnað' },
    { value: '45+', label: 'Ár í rekstri' },
    { value: 'Austurland', label: 'Starfssvæði' },
  ],
  image: img('483523128_9912688478741079_6727020034868942669_n.jpg'),
  imagePosition: 'center 34%',
};

// ------------------------------------------------------------------ Saga ---
export const saga = {
  eyebrow: 'SAGA',
  title: 'Frá 1978 til dagsins í dag',
  intro:
    'Það sem byrjaði með einum vörubíl er í dag öflugt verktakafyrirtæki með fjölbreyttan tækjakost.',
  image: img('4b50cc_c37af423961f40e6a2d1727d62f5495a~mv2.png'),
  timeline: [
    {
      year: '1978',
      title: 'Fyrirtækið stofnað',
      body: 'Rekstur hefst á Egilsstöðum með flutninga og jarðvinnu í heimabyggð. [Nákvæmar dagsetningar má uppfæra]',
    },
    {
      year: '1990s',
      title: 'Vöxtur og uppbygging',
      body: 'Tækjakostur stækkar og fyrirtækið tekur að sér stærri jarðvinnuverkefni um allt Austurland.',
    },
    {
      year: '2010s',
      title: 'Nútímavæðing',
      body: 'Fjárfest í nýjum tækjum með GPS-stýringu og aukin áhersla á flutninga og hífingar.',
    },
    {
      year: 'Í dag',
      title: 'Áfram í fararbroddi',
      body: 'Sama fjölskyldan, sama áherslan á traust vinnubrögð — með öflugasta tækjakost fyrirtækisins til þessa.',
    },
  ],
};

// -------------------------------------------------------------- Verkefni ---
export const projects = {
  eyebrow: 'VERKEFNI',
  title: 'Unnin verk',
  intro:
    'Úrval verkefna á Austurlandi — jarðvinna, vegagerð, efnisflutningar og hífingar við krefjandi aðstæður. [Bætið við raunverulegum verkefnum og myndum]',
  items: [
    {
      image: img('4b50cc_36d64be263534334962aba91a1b72a54~mv2_d_1818_1228_s_2.jpg.avif'),
      category: 'VEGAGERÐ',
      title: 'Vegir og slóðar um hálendi',
      body: 'Uppbygging og viðhald vega í dölum og til fjalla.',
    },
    {
      image: img('Kranavinna-vetur-1-scaled.jpg'),
      category: 'HÍFINGAR · VETUR',
      title: 'Kranavinna í vetraraðstæðum',
      body: 'Hífingar og uppsetning búnaðar við erfið veðurskilyrði.',
    },
    {
      image: img('483523128_9912688478741079_6727020034868942669_n.jpg'),
      imagePosition: 'center 34%',
      category: 'JARÐVINNA · FLUTNINGAR',
      title: 'Uppgröftur og efnisflutningar',
      body: 'Grafa hleður búkollu — samhæfð jarðvinna og flutningar.',
    },
    {
      image: img('854F2E74-2F95-46FA-8337-F366C357DE63_1_105_c.jpeg'),
      category: 'FLUTNINGAR',
      title: 'Efnisflutningar að vatnasvæðum',
      body: 'Flutningar og losun á fjölbreyttum verkstöðum.',
    },
  ],
};

// ----------------------------------------------------------- Tækjakostur ---
export const equipment = {
  eyebrow: 'TÆKJAKOSTUR',
  title: 'Búnaður fyrir hvert verk',
  tabs: [
    { key: 'grofur', label: 'Gröfur' },
    { key: 'vorubilar', label: 'Vörubílar' },
    { key: 'bukollur', label: 'Búkollur' },
    { key: 'onnur', label: 'Önnur tæki' },
  ],
  grofur: [
    {
      image: img('4b50cc_62ed434a3a4f47e6bf861a456da330de~mv2.jpg.avif'),
      title: 'Komatsu PC240LC',
      sub: 'Beltagrafa með GPS-stýringu (Trimble)',
      stats: [
        { value: '~24 t', label: 'Þyngd' },
        { value: 'GPS', label: 'Stýring' },
      ],
    },
    { placeholder: true, title: 'Smágrafa', sub: 'Fyrir þrengri verk og lóðir. [uppfæra]' },
    { placeholder: true, title: 'Hjólagrafa', sub: 'Lipur á milli verkstaða. [uppfæra]' },
  ],
  vorubilar: [
    {
      image: img('4b50cc_342ce06b69654816938d009a7839d524~mv2.jpg.avif'),
      title: 'Mercedes-Benz Arocs',
      sub: 'Öflugur vörubíll með lágvagn fyrir tækjaflutninga.',
    },
    {
      image: img('854F2E74-2F95-46FA-8337-F366C357DE63_1_105_c.jpeg'),
      title: 'Scania',
      sub: 'Malar- og efnisflutningar um allt Austurland.',
    },
  ],
  bukollur: {
    image: img('4b50cc_36d64be263534334962aba91a1b72a54~mv2_d_1818_1228_s_2.jpg.avif'),
    title: 'Búkollur (liðléttingar)',
    sub: 'Fyrir efnisflutninga á vegleysum og krefjandi verkstöðum þar sem venjulegir vörubílar komast ekki.',
    stat: '6×6',
    statBody: 'Drif á öllum hjólum — kemst þangað sem verkið er. [fjöldi / gerðir uppfærist]',
  },
  onnur: [
    { title: 'Valtar', sub: 'Þjöppun á fyllingum og undirlagi. [uppfæra]' },
    { title: 'Jarðýtur', sub: 'Mótun lands og ýting. [uppfæra]' },
    { title: 'Krani', sub: 'Hífingar og uppsetning búnaðar. [uppfæra]' },
  ],
};

// ------------------------------------------------------------ Hafa samband ---
export const contact = {
  eyebrow: 'HAFA SAMBAND',
  title: 'Fáðu tilboð',
  formTitle: 'Sendu okkur fyrirspurn',
  formSub: 'Fylltu út og við höfum samband með verðmat — þér að kostnaðarlausu.',
  workTypes: [
    'Jarðvinna',
    'Uppgröftur / gröftur',
    'Efnisflutningar',
    'Hífingar / kranavinna',
    'Snjómokstur',
    'Annað',
  ],
  reassurance: 'Við svörum yfirleitt innan 24 klst.',
};

// -------------------------------------------------------------- Closing CTA ---
export const closingCta = {
  eyebrow: 'TILBÚIN AÐ BYRJA?',
  heading: 'Fáðu verðmat án skuldbindingar',
  sub: 'Við svörum fljótt — sími 471-1170',
};
