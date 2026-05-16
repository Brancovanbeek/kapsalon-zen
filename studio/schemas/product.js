export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Naam',
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
      name: 'brand',
      title: 'Merk',
      type: 'string',
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
      title: 'Prijs (€)',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    },
    {
      name: 'image',
      title: 'Hoofdafbeelding',
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
      name: 'images',
      title: 'Galerij afbeeldingen',
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
    },
    {
      name: 'category',
      title: 'Categorie',
      type: 'string',
      options: {
        list: [
          { title: 'Shampoo', value: 'shampoo' },
          { title: 'Conditioner', value: 'conditioner' },
          { title: 'Styling', value: 'styling' },
          { title: 'Treatment', value: 'treatment' },
          { title: 'Overig', value: 'overig' },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'inStock',
      title: 'Op voorraad',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'featured',
      title: 'Uitgelicht op homepage',
      type: 'boolean',
      initialValue: false,
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'brand', media: 'image' },
    prepare({ title, subtitle, media }) {
      return { title, subtitle: subtitle ?? 'Geen merk', media };
    },
  },
  orderings: [
    {
      title: 'Aanmaakdatum (nieuwste eerst)',
      name: 'createdAtDesc',
      by: [{ field: '_createdAt', direction: 'desc' }],
    },
  ],
};
