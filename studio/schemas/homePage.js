export default {
  name: 'homePage',
  title: 'Homepage',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    {
      name: 'heroHeadline',
      title: 'Hero — Hoofdtitel',
      type: 'string',
      description: 'Grote serif kop in de hero-sectie',
    },
    {
      name: 'heroSubtext',
      title: 'Hero — Subtekst',
      type: 'text',
      rows: 3,
    },
    {
      name: 'heroImages',
      title: 'Hero — Afbeeldingen (2×2 raster)',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              title: 'Alt-tekst',
              type: 'string',
            },
          ],
        },
      ],
      validation: (Rule) => Rule.max(4),
    },
    {
      name: 'aboutHeading',
      title: 'Over ons — Koptekst',
      type: 'string',
    },
    {
      name: 'aboutText',
      title: 'Over ons — Tekst',
      type: 'text',
      rows: 5,
    },
    {
      name: 'aboutImage',
      title: 'Over ons — Afbeelding',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          title: 'Alt-tekst',
          type: 'string',
        },
      ],
    },
  ],
  preview: {
    prepare() {
      return { title: 'Homepage-inhoud' };
    },
  },
};
