export default {
  name: 'service',
  title: 'Dienst',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Titel',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'shortDescription',
      title: 'Korte omschrijving',
      type: 'text',
      rows: 3,
    },
    {
      name: 'description',
      title: 'Volledige omschrijving',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'price',
      title: 'Prijs',
      type: 'string',
      description: 'Bijv. "vanaf €35"',
    },
    {
      name: 'image',
      title: 'Afbeelding',
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
    {
      name: 'featured',
      title: 'Uitgelicht op homepage',
      type: 'boolean',
      initialValue: false,
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'price', media: 'image' },
  },
  orderings: [
    {
      title: 'Aanmaakdatum (nieuwste eerst)',
      name: 'createdAtDesc',
      by: [{ field: '_createdAt', direction: 'desc' }],
    },
  ],
};
