export default {
  name: 'productCategory',
  title: 'Productcategorie',
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
      name: 'description',
      title: 'Omschrijving',
      type: 'text',
      rows: 3,
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'description' },
  },
};
