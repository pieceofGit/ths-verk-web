# Fara í loftið (deploy) — Þ.S. Verktakar vefur

Astro + Keystatic vefur. Static síður + Keystatic CMS. Hýsing: Vercel (ókeypis).

Everything is built and committed locally. These are the steps only you can do
(they need your GitHub + Vercel accounts). Run the terminal blocks on your Mac.

---

## 1. Sameina CMS-vinnuna inn á `main`

The site is on `main`; the CMS work is on `feature/keystatic-cms`. Merge it in:

```bash
cd ~/Documents/websites/thsverk
git checkout main
git merge feature/keystatic-cms      # fast-forward, no conflicts
```

## 2. Búa til GitHub repo

1. Farðu á https://github.com/new
2. Nafn t.d. `thsverk-vefur`. **Ekki** haka við "Add a README" (repo á að vera tómt).
3. Create repository. Afritaðu slóðina (t.d. `https://github.com/<notandi>/thsverk-vefur.git`).

## 3. Ýta kóðanum upp

```bash
git remote add origin https://github.com/<notandi>/thsverk-vefur.git
git push -u origin main
```

## 4. Tengja við Vercel (fer í loftið)

1. Farðu á https://vercel.com → skráðu þig inn með GitHub.
2. **Add New… → Project** → veldu `thsverk-vefur` repo → **Import**.
3. Vercel þekkir Astro sjálfkrafa (Framework Preset: Astro). Ýttu **Deploy**.
4. Eftir ~1 mín færðu lifandi slóð: `https://thsverk-vefur.vercel.app` ✅

## 5. Leyfa eigendum að breyta efni í loftinu (Keystatic + GitHub)

Núna les vefurinn efni úr `src/content/`. Til að eigendur geti breytt beint á
netinu (án tölvupósts til þín) þarf að tengja Keystatic við GitHub:

1. Vercel → verkefnið → **Settings → Environment Variables**, bættu við:
   - `PUBLIC_KEYSTATIC_GITHUB_REPO` = `<notandi>/thsverk-vefur`
2. Opnaðu `https://<vercel-slóðin>/keystatic` — Keystatic leiðir þig í gegnum
   að búa til GitHub-app og bætir sjálfkrafa við þessum breytum í Vercel:
   `KEYSTATIC_GITHUB_CLIENT_ID`, `KEYSTATIC_GITHUB_CLIENT_SECRET`, `KEYSTATIC_SECRET`.
3. Redeploy (Vercel → Deployments → ⋯ → Redeploy).

Eftir þetta: eigandi skráir sig inn með GitHub á `/keystatic`, breytir texta/myndum
→ Keystatic vistar sem commit → Vercel byggir og uppfærir vefinn sjálfkrafa.

> Á meðan þetta er ekki tengt geta eigendur ekki breytt í loftinu, en þú getur
> breytt efni beint í `src/content/*.json` og ýtt upp.

## 6. Lén: thsverk.is (þegar tilbúið)

Vercel → verkefnið → **Settings → Domains** → `Add` → `thsverk.is`.
Vercel gefur DNS-gildi (A / CNAME) sem þú setur inn hjá lénaskráningaraðila.
HTTPS er sjálfvirkt og ókeypis.

---

## Local þróun

```bash
npm run dev            # http://localhost:4321  (vefur)
                       # http://localhost:4321/keystatic  (ritstjórn)
npm run build          # framleiðslu-build (á að vera 0 villur)
```

## Athugið (follow-ups)
- `npm audit` sýnir nokkur "high" viðvaranir í dev-deps Keystatic — ekki
  blokkerandi fyrir framleiðslu; skoða síðar.
- Efni sem er læst í kóða (ekki í CMS): kaflaheiti (eyebrows), tenglar í
  kynningarreitum forsíðu, myndaramma-staðsetning. Auðvelt að opna síðar ef þarf.
