import { config, fields, singleton } from '@keystatic/core';

// Storage: local while developing. In production, set PUBLIC_KEYSTATIC_GITHUB_REPO
// (e.g. "thsverk/website") as a Vercel env var and connect the Keystatic GitHub
// app — edits then commit to the repo and Vercel redeploys automatically.
const githubRepo = (import.meta as any).env?.PUBLIC_KEYSTATIC_GITHUB_REPO as
  | string
  | undefined;

const image = (label: string) =>
  fields.image({ label, directory: 'public/uploads', publicPath: '/uploads' });

const paragraphs = (label: string) =>
  fields.array(fields.text({ label: 'Málsgrein', multiline: true }), {
    label,
    itemLabel: (p) => p.value.slice(0, 48) || 'Málsgrein',
  });

export default config({
  storage: githubRepo ? { kind: 'github', repo: githubRepo } : { kind: 'local' },
  ui: {
    brand: { name: 'Þ.S. Verktakar' },
  },
  singletons: {
    // ---------------------------------------------------------- Fyrirtæki ---
    settings: singleton({
      label: 'Fyrirtæki & tengiliðir',
      path: 'src/content/settings/',
      format: { data: 'json' },
      schema: {
        logo: image('Merki (logo)'),
        phone: fields.text({ label: 'Sími', defaultValue: '471-1170' }),
        email: fields.text({ label: 'Netfang', defaultValue: 'ths@thsverk.is' }),
        address: fields.text({ label: 'Heimilisfang', defaultValue: 'Miðási 37 · 700 Egilsstaðir' }),
        facebook: fields.url({ label: 'Facebook slóð' }),
      },
    }),

    // ------------------------------------------------------------ Forsíða ---
    home: singleton({
      label: 'Forsíða',
      path: 'src/content/home/',
      format: { data: 'json' },
      schema: {
        heroImage: image('Forsíðumynd (hero)'),
        heroEyebrow: fields.text({ label: 'Yfirtexti', defaultValue: 'EGILSSTAÐIR · AUSTURLAND' }),
        heroTitleTop: fields.text({ label: 'Fyrirsögn — lína 1', defaultValue: 'ÞJÓNUSTA' }),
        heroTitleBottom: fields.text({ label: 'Fyrirsögn — lína 2', defaultValue: 'SÍÐAN ' }),
        heroTitleAccent: fields.text({ label: 'Áherslutala', defaultValue: '1978' }),
        heroSub: fields.text({ label: 'Undirtexti', defaultValue: 'Jarðvinna · Flutningar · Hífingar' }),
        services: fields.array(
          fields.object({
            title: fields.text({ label: 'Titill' }),
            body: fields.text({ label: 'Lýsing', multiline: true }),
          }),
          { label: 'Þjónustuflokkar', itemLabel: (p) => p.fields.title.value || 'Flokkur' }
        ),
        introImage: image('Mynd í kynningarreit'),
        introHeading: fields.text({ label: 'Kynning — fyrirsögn' }),
        introParagraphs: paragraphs('Kynning — málsgreinar'),
        teaserHeading: fields.text({ label: 'Kynntu þér meira — fyrirsögn', defaultValue: 'Kynntu þér meira' }),
        teasers: fields.array(
          fields.object({
            image: image('Mynd'),
            label: fields.text({ label: 'Merki' }),
            body: fields.text({ label: 'Lýsing (má vera tómt)', multiline: true }),
          }),
          { label: 'Kynningarreitir', itemLabel: (p) => p.fields.label.value || 'Reitur' }
        ),
      },
    }),

    // ----------------------------------------------------------- Um okkur ---
    about: singleton({
      label: 'Um okkur',
      path: 'src/content/about/',
      format: { data: 'json' },
      schema: {
        titleLine1: fields.text({ label: 'Fyrirsögn — lína 1' }),
        titleLine2: fields.text({ label: 'Fyrirsögn — lína 2' }),
        paragraphs: paragraphs('Málsgreinar'),
        stats: fields.array(
          fields.object({
            value: fields.text({ label: 'Tala / gildi' }),
            label: fields.text({ label: 'Skýring' }),
          }),
          { label: 'Tölur', itemLabel: (p) => p.fields.value.value || 'Tala' }
        ),
        image: image('Mynd neðst'),
      },
    }),

    // -------------------------------------------------------------- Saga ---
    saga: singleton({
      label: 'Saga',
      path: 'src/content/saga/',
      format: { data: 'json' },
      schema: {
        title: fields.text({ label: 'Fyrirsögn' }),
        intro: fields.text({ label: 'Inngangur', multiline: true }),
        image: image('Mynd'),
        timeline: fields.array(
          fields.object({
            year: fields.text({ label: 'Ár' }),
            title: fields.text({ label: 'Titill' }),
            body: fields.text({ label: 'Lýsing', multiline: true }),
          }),
          { label: 'Tímalína', itemLabel: (p) => p.fields.year.value || 'Ár' }
        ),
      },
    }),

    // ----------------------------------------------------------- Verkefni ---
    projects: singleton({
      label: 'Verkefni',
      path: 'src/content/projects/',
      format: { data: 'json' },
      schema: {
        intro: fields.text({ label: 'Inngangur', multiline: true }),
        items: fields.array(
          fields.object({
            image: image('Mynd'),
            category: fields.text({ label: 'Flokkur' }),
            title: fields.text({ label: 'Titill' }),
            body: fields.text({ label: 'Lýsing', multiline: true }),
          }),
          { label: 'Verkefni', itemLabel: (p) => p.fields.title.value || 'Verkefni' }
        ),
      },
    }),

    // -------------------------------------------------------- Tækjakostur ---
    equipment: singleton({
      label: 'Tækjakostur',
      path: 'src/content/equipment/',
      format: { data: 'json' },
      schema: {
        grofur: fields.array(
          fields.object({
            image: image('Mynd (tómt = "[ mynd af gröfu ]" reitur)'),
            title: fields.text({ label: 'Titill' }),
            sub: fields.text({ label: 'Lýsing', multiline: true }),
            stats: fields.array(
              fields.object({
                value: fields.text({ label: 'Gildi' }),
                label: fields.text({ label: 'Skýring' }),
              }),
              { label: 'Tölur', itemLabel: (p) => p.fields.value.value || 'Tala' }
            ),
          }),
          { label: 'Gröfur', itemLabel: (p) => p.fields.title.value || 'Grafa' }
        ),
        vorubilar: fields.array(
          fields.object({
            image: image('Mynd'),
            title: fields.text({ label: 'Titill' }),
            sub: fields.text({ label: 'Lýsing', multiline: true }),
          }),
          { label: 'Vörubílar', itemLabel: (p) => p.fields.title.value || 'Vörubíll' }
        ),
        bukollur: fields.object({
          image: image('Mynd'),
          title: fields.text({ label: 'Titill' }),
          sub: fields.text({ label: 'Lýsing', multiline: true }),
          stat: fields.text({ label: 'Áherslutala', defaultValue: '6×6' }),
          statBody: fields.text({ label: 'Skýring við tölu', multiline: true }),
        }),
        onnur: fields.array(
          fields.object({
            title: fields.text({ label: 'Titill' }),
            sub: fields.text({ label: 'Lýsing', multiline: true }),
          }),
          { label: 'Önnur tæki', itemLabel: (p) => p.fields.title.value || 'Tæki' }
        ),
      },
    }),

    // ------------------------------------------------------- Hafa samband ---
    contact: singleton({
      label: 'Hafa samband',
      path: 'src/content/contact/',
      format: { data: 'json' },
      schema: {
        formTitle: fields.text({ label: 'Titill forms', defaultValue: 'Sendu okkur fyrirspurn' }),
        formSub: fields.text({ label: 'Undirtexti forms', multiline: true }),
        reassurance: fields.text({ label: 'Fullvissa', defaultValue: 'Við svörum yfirleitt innan 24 klst.' }),
        workTypes: fields.array(fields.text({ label: 'Tegund verks' }), {
          label: 'Tegundir verka (fellilisti)',
          itemLabel: (p) => p.value || 'Tegund',
        }),
      },
    }),

    // --------------------------------------------------------- Loka-hvatning ---
    closingCta: singleton({
      label: 'Hvatningarborði (neðst)',
      path: 'src/content/closing-cta/',
      format: { data: 'json' },
      schema: {
        eyebrow: fields.text({ label: 'Yfirtexti', defaultValue: 'TILBÚIN AÐ BYRJA?' }),
        heading: fields.text({ label: 'Fyrirsögn' }),
        sub: fields.text({ label: 'Undirtexti' }),
      },
    }),
  },
});
