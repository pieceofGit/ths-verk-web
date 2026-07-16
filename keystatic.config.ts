import { config, fields, singleton } from '@keystatic/core';

// Storage: local while developing. In production, set PUBLIC_KEYSTATIC_GITHUB_REPO
// (e.g. "pieceofGit/ths-verk-web") as a Vercel env var and connect the Keystatic
// GitHub app — edits then commit to the repo and Vercel redeploys automatically.
const githubRepo = (import.meta as any).env?.PUBLIC_KEYSTATIC_GITHUB_REPO as
  | string
  | undefined;

const image = (label: string, description?: string) =>
  fields.image({ label, description, directory: 'public/uploads', publicPath: '/uploads' });

const paragraphs = (label: string, description?: string) =>
  fields.array(fields.text({ label: 'Málsgrein', multiline: true }), {
    label,
    description,
    itemLabel: (p) => p.value.slice(0, 48) || 'Málsgrein',
  });

export default config({
  storage: githubRepo ? { kind: 'github', repo: githubRepo } : { kind: 'local' },
  ui: {
    brand: { name: 'Þ.S. Verktakar' },
    navigation: {
      Síður: ['home', 'about', 'saga', 'projects', 'equipment', 'contact'],
      'Sameiginlegt (allar síður)': ['settings', 'closingCta'],
    },
  },
  singletons: {
    // ---------------------------------------------------------- Fyrirtæki ---
    settings: singleton({
      label: 'Fyrirtæki & tengiliðir',
      path: 'src/content/settings/',
      format: { data: 'json' },
      schema: {
        logo: image('Merki (logo)', 'Birtist efst til vinstri á öllum síðum og í fæti neðst.'),
        phone: fields.text({
          label: 'Sími',
          description: 'Birtist í fæti, á Hafa samband-síðunni og í öllum „Hringja“-hnöppum.',
          defaultValue: '471-1170',
        }),
        email: fields.text({
          label: 'Netfang',
          description: 'Birtist í fæti og á Hafa samband. Fyrirspurnir af forminu berast á þetta netfang.',
          defaultValue: 'ths@thsverk.is',
        }),
        address: fields.text({
          label: 'Heimilisfang',
          description: 'Birtist í fæti og á Hafa samband — kortið á síðunni fylgir þessu heimilisfangi.',
          defaultValue: 'Miðási 37 · 700 Egilsstaðir',
        }),
        facebook: fields.url({
          label: 'Facebook slóð',
          description: 'Tengill á Facebook-síðuna, birtist á Hafa samband.',
        }),
      },
    }),

    // ------------------------------------------------------------ Forsíða ---
    home: singleton({
      label: 'Forsíða',
      path: 'src/content/home/',
      format: { data: 'json' },
      schema: {
        heroImage: image('Aðalmynd', 'Stóra myndin sem fyllir skjáinn efst á forsíðunni.'),
        heroEyebrow: fields.text({
          label: 'Yfirtexti',
          description: 'Litli blái textinn efst, fyrir ofan stóru fyrirsögnina.',
          defaultValue: 'EGILSSTAÐIR · AUSTURLAND',
        }),
        heroTitleTop: fields.text({
          label: 'Stór fyrirsögn — lína 1',
          description: 'Fyrri lína risafyrirsagnarinnar yfir myndinni („ÞJÓNUSTA“).',
          defaultValue: 'ÞJÓNUSTA',
        }),
        heroTitleBottom: fields.text({
          label: 'Stór fyrirsögn — lína 2',
          description: 'Seinni línan („SÍÐAN “) — blaa talan hér fyrir neðan bætist aftan við hana.',
          defaultValue: 'SÍÐAN ',
        }),
        heroTitleAccent: fields.text({
          label: 'Blá tala í fyrirsögn',
          description: 'Talan sem birtist í bláum lit aftast í línu 2 („1978“).',
          defaultValue: '1978',
        }),
        heroSub: fields.text({
          label: 'Undirtexti',
          description: 'Textinn undir stóru fyrirsögninni („Jarðvinna · Flutningar · Hífingar“).',
          defaultValue: 'Jarðvinna · Flutningar · Hífingar',
        }),
        services: fields.array(
          fields.object({
            title: fields.text({ label: 'Titill' }),
            body: fields.text({ label: 'Lýsing', multiline: true }),
          }),
          {
            label: 'Þjónustukort (3 glerkort)',
            description: 'Kortin þrjú sem „fljóta“ neðst yfir aðalmyndinni: Jarðvinna, Flutningar, Hífingar.',
            itemLabel: (p) => p.fields.title.value || 'Kort',
          }
        ),
        introHeading: fields.text({
          label: 'Kynning — fyrirsögn',
          description: 'Kaflinn fyrir neðan þjónustukortin („Traustir verktakar í meira en 45 ár“).',
        }),
        introParagraphs: paragraphs('Kynning — málsgreinar', 'Textinn í kynningarkaflanum, vinstra megin við myndina.'),
        introImage: image('Kynning — mynd', 'Myndin hægra megin í kynningarkaflanum.'),
        teaserHeading: fields.text({
          label: '„Kynntu þér meira“ — fyrirsögn',
          description: 'Fyrirsögn neðsta kafla forsíðunnar.',
          defaultValue: 'Kynntu þér meira',
        }),
        teasers: fields.array(
          fields.object({
            image: image('Mynd'),
            label: fields.text({ label: 'Merki (t.d. „TÆKJAKOSTUR →“)' }),
            body: fields.text({ label: 'Lýsing (má vera tómt)', multiline: true }),
          }),
          {
            label: 'Tenglareitir neðst',
            description:
              'Þrír myndareitir neðst á forsíðunni sem vísa á undirsíður. RÖÐIN SKIPTIR MÁLI: 1 = Tækjakostur, 2 = Verkefni, 3 = Saga.',
            itemLabel: (p) => p.fields.label.value || 'Reitur',
          }
        ),
      },
    }),

    // ----------------------------------------------------------- Um okkur ---
    about: singleton({
      label: 'Um okkur',
      path: 'src/content/about/',
      format: { data: 'json' },
      schema: {
        titleLine1: fields.text({
          label: 'Fyrirsögn — lína 1',
          description: 'Stóra fyrirsögnin á Um okkur-síðunni („Fjölskyldufyrirtæki“).',
        }),
        titleLine2: fields.text({
          label: 'Fyrirsögn — lína 2',
          description: 'Seinni línan („á Austurlandi“).',
        }),
        paragraphs: paragraphs('Málsgreinar', 'Meginmálið vinstra megin á síðunni.'),
        stats: fields.array(
          fields.object({
            value: fields.text({ label: 'Tala / gildi' }),
            label: fields.text({ label: 'Skýring' }),
          }),
          {
            label: 'Tölureitir',
            description: 'Reitirnir hægra megin: 1978 / 45+ / Austurland.',
            itemLabel: (p) => p.fields.value.value || 'Tala',
          }
        ),
        image: image('Mynd', 'Breiða myndin neðst á síðunni.'),
      },
    }),

    // -------------------------------------------------------------- Saga ---
    saga: singleton({
      label: 'Saga',
      path: 'src/content/saga/',
      format: { data: 'json' },
      schema: {
        title: fields.text({
          label: 'Fyrirsögn',
          description: 'Stóra fyrirsögnin á Saga-síðunni.',
        }),
        intro: fields.text({
          label: 'Inngangur',
          description: 'Stutti textinn undir fyrirsögninni.',
          multiline: true,
        }),
        image: image('Mynd', 'Breiða myndin fyrir ofan tímalínuna.'),
        timeline: fields.array(
          fields.object({
            year: fields.text({ label: 'Ár (t.d. „1978“ eða „Í dag“)' }),
            title: fields.text({ label: 'Titill' }),
            body: fields.text({ label: 'Lýsing', multiline: true }),
          }),
          {
            label: 'Tímalína',
            description: 'Raðirnar í tímalínunni, í birtingarröð frá elsta til nýjasta.',
            itemLabel: (p) => p.fields.year.value || 'Ár',
          }
        ),
      },
    }),

    // -------------------------------------------------------------- Verkefni ---
    projects: singleton({
      label: 'Verkefni',
      path: 'src/content/projects/',
      format: { data: 'json' },
      schema: {
        intro: fields.text({
          label: 'Inngangur',
          description: 'Textinn undir „Unnin verk“ fyrirsögninni.',
          multiline: true,
        }),
        items: fields.array(
          fields.object({
            image: image('Mynd'),
            category: fields.text({ label: 'Flokkur (t.d. „VEGAGERÐ“)' }),
            title: fields.text({ label: 'Titill' }),
            body: fields.text({ label: 'Lýsing', multiline: true }),
          }),
          {
            label: 'Verkefnakort',
            description: 'Kortin á Verkefni-síðunni — bættu við, fjarlægðu eða endurraðaðu að vild.',
            itemLabel: (p) => p.fields.title.value || 'Verkefni',
          }
        ),
      },
    }),

    // ----------------------------------------------------------- Tækjakostur ---
    equipment: singleton({
      label: 'Tækjakostur',
      path: 'src/content/equipment/',
      format: { data: 'json' },
      schema: {
        grofur: fields.array(
          fields.object({
            image: image('Mynd', 'EF TÓMT: birtist gráraður „[ mynd af gröfu ]“ reitur í staðinn.'),
            title: fields.text({ label: 'Titill' }),
            sub: fields.text({ label: 'Lýsing', multiline: true }),
            stats: fields.array(
              fields.object({
                value: fields.text({ label: 'Gildi (t.d. „~24 t“)' }),
                label: fields.text({ label: 'Skýring (t.d. „Þyngd“)' }),
              }),
              { label: 'Tölur (má vera tómt)', itemLabel: (p) => p.fields.value.value || 'Tala' }
            ),
          }),
          {
            label: 'Flipi: Gröfur',
            description:
              'ATH: Tækjakostur-síðan hefur 4 flipa — þetta efni sést þegar smellt er á „Gröfur“ flipann (hann er opinn sjálfgefið).',
            itemLabel: (p) => p.fields.title.value || 'Grafa',
          }
        ),
        vorubilar: fields.array(
          fields.object({
            image: image('Mynd'),
            title: fields.text({ label: 'Titill' }),
            sub: fields.text({ label: 'Lýsing', multiline: true }),
          }),
          {
            label: 'Flipi: Vörubílar',
            description: 'Sést þegar smellt er á „Vörubílar“ flipann á Tækjakostur-síðunni.',
            itemLabel: (p) => p.fields.title.value || 'Vörubíll',
          }
        ),
        bukollur: fields.object(
          {
            image: image('Mynd'),
            title: fields.text({ label: 'Titill' }),
            sub: fields.text({ label: 'Lýsing', multiline: true }),
            stat: fields.text({ label: 'Áherslutala (t.d. „6×6“)', defaultValue: '6×6' }),
            statBody: fields.text({ label: 'Skýring við töluna', multiline: true }),
          },
          {
            label: 'Flipi: Búkollur',
            description: 'Sést þegar smellt er á „Búkollur“ flipann á Tækjakostur-síðunni.',
          }
        ),
        onnur: fields.array(
          fields.object({
            title: fields.text({ label: 'Titill' }),
            sub: fields.text({ label: 'Lýsing', multiline: true }),
          }),
          {
            label: 'Flipi: Önnur tæki',
            description: 'Textakort (án mynda) — sjást þegar smellt er á „Önnur tæki“ flipann.',
            itemLabel: (p) => p.fields.title.value || 'Tæki',
          }
        ),
      },
    }),

    // ------------------------------------------------------- Hafa samband ---
    contact: singleton({
      label: 'Hafa samband',
      path: 'src/content/contact/',
      format: { data: 'json' },
      schema: {
        formTitle: fields.text({
          label: 'Titill forms',
          description: 'Fyrirsögn fyrirspurnaformsins („Sendu okkur fyrirspurn“).',
          defaultValue: 'Sendu okkur fyrirspurn',
        }),
        formSub: fields.text({
          label: 'Undirtexti forms',
          description: 'Textinn beint undir titlinum.',
          multiline: true,
        }),
        reassurance: fields.text({
          label: 'Texti undir „Senda“ hnappnum',
          description: '„Við svörum yfirleitt innan 24 klst.“',
          defaultValue: 'Við svörum yfirleitt innan 24 klst.',
        }),
        workTypes: fields.array(fields.text({ label: 'Tegund verks' }), {
          label: 'Tegundir verka (fellilisti)',
          description: 'Valmöguleikarnir í „Tegund verks“ fellilistanum á forminu.',
          itemLabel: (p) => p.value || 'Tegund',
        }),
      },
    }),

    // --------------------------------------------------------- Loka-hvatning ---
    closingCta: singleton({
      label: 'Blái borðinn neðst',
      path: 'src/content/closing-cta/',
      format: { data: 'json' },
      schema: {
        eyebrow: fields.text({
          label: 'Yfirtexti',
          description:
            'Blái borðinn („Fáðu verðmat…“) birtist NEÐST Á ÖLLUM SÍÐUM NEMA Hafa samband. Þetta er litli textinn efst í honum.',
          defaultValue: 'TILBÚIN AÐ BYRJA?',
        }),
        heading: fields.text({
          label: 'Fyrirsögn',
          description: 'Stóra línan í borðanum („Fáðu verðmat án skuldbindingar“).',
        }),
        sub: fields.text({
          label: 'Undirtexti',
          description: 'Línan undir fyrirsögninni („Við svörum fljótt — sími …“).',
        }),
      },
    }),
  },
});
