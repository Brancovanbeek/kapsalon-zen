export default {
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Naam',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'quote',
      title: 'Citaat',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'rating',
      title: 'Beoordeling (1–5)',
      type: 'number',
      validation: (Rule) => Rule.required().min(1).max(5).integer(),
    },
    {
      name: 'date',
      title: 'Datum',
      type: 'date',
      options: {
        dateFormat: 'YYYY-MM-DD',
      },
    },
  ],
  preview: {
    select: { title: 'name', subtitle: 'quote' },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle: subtitle ? subtitle.substring(0, 60) + '…' : '',
      };
    },
  },
};
