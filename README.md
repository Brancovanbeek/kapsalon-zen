# Kapsalon Zen

Statische website voor **Kapsalon Zen** in Volendam, een lokale haarsalon. De website toont diensten, producten en contactinformatie. Content wordt beheerd via Sanity CMS; de site wordt automatisch gebouwd en gedeployed via Vercel.
---

## Tech stack

| Technologie | Gebruik |
|---|---|
| [Astro 6](https://astro.build) | Static site generator (SSG) |
| [Sanity CMS](https://sanity.io) | Content beheer (diensten, producten, reviews) |
| [Vercel](https://vercel.com) | Hosting en CI/CD |
| [Formspree](https://formspree.io) | Contactformulier verwerking |
| [Fontsource](https://fontsource.org) | Lokale fonts (Cormorant Garamond, DM Sans) |

---

## Installatie

### Vereisten
- Node.js 18+
- npm

### Frontend

```bash
git clone https://github.com/Brancovanbeek/kapsalon-zen
cd kapsalon-zen
npm install
```

### Sanity Studio

```bash
cd studio
npm install
```

---

## Environment variables

Maak een `.env` bestand aan in de root van het project (`.env` staat in `.gitignore` en wordt nooit gecommit):

```env
SANITY_PROJECT_ID=jouw_project_id
SANITY_DATASET=production
```

Maak voor de studio een `.env` aan in de `studio/` map:

```env
SANITY_STUDIO_PROJECT_ID=jouw_project_id
SANITY_STUDIO_DATASET=production
```

> De project ID is te vinden in het [Sanity dashboard](https://sanity.io/manage).

### Contactformulier (Formspree)

Het contactformulier in `src/pages/contact.astro` stuurt naar een Formspree endpoint. Maak een gratis account aan op [formspree.io](https://formspree.io), maak een nieuw formulier aan en vervang het `action`-attribuut op het `<form>`-element door jouw eigen endpoint-URL.

---

## Lokaal draaien

**Frontend** (op `http://localhost:4321`):
```bash
npm run dev
```

**Sanity Studio** (op `http://localhost:3333`):
```bash
cd studio
npm run dev
```

---

## Projectstructuur

```
kapsalon-zen/
├── src/
│   ├── components/     # Herbruikbare Astro-componenten
│   ├── layouts/        # BaseLayout met navigatie en footer
│   ├── lib/            # Sanity client en hulpfuncties
│   ├── pages/          # Pagina's (index, diensten, producten, contact)
│   └── styles/         # Globale CSS custom properties en utilities
├── studio/             # Sanity Studio (CMS beheeromgeving)
└── public/             # Statische bestanden (favicon)
```

---

## Sanity content types

| Schema | Beschrijving |
|---|---|
| `siteSettings` | Globale instellingen (naam, contactgegevens, openingstijden) |
| `homePage` | Hero-tekst en featured content voor de homepage |
| `service` | Kappersdienst met naam, prijs, beschrijving en foto |
| `product` | Product met naam, merk, prijs, voorraad en foto's |
| `productCategory` | Categorie voor het filteren van producten |
| `testimonial` | Klantrecensie met naam, tekst en beoordeling |

---

## Pagina's

| Route | Beschrijving |
|---|---|
| `/` | Homepage met hero, diensten, producten en reviews |
| `/diensten` | Overzicht van alle kappersdiensten |
| `/diensten/[slug]` | Detailpagina per dienst |
| `/producten` | Overzicht met categoriefilter |
| `/producten/[slug]` | Detailpagina per product |
| `/over-ons` | Verhaal en waarden van de salon |
| `/contact` | Contactgegevens en contactformulier |

---

## Build & deploy

```bash
npm run build     # Bouw de statische site naar /dist
npm run preview   # Preview de build lokaal
```

Elke push naar `main` triggert automatisch een deploy via Vercel.

---

## Branching

Nieuwe features worden op een aparte branch (`feature/naam`) ontwikkeld en via een pull request samengevoegd in `dev`. Als alles klaar is wordt `dev` naar `main` gepusht, waarna Vercel automatisch deployt.

---

## Live

[kapsalonzenvolendam.nl](https://kapsalonzenvolendam.nl)
