export default {
  name: 'siteSettings',
  title: 'Site-instellingen',
  type: 'document',
  fields: [
    {
      name: 'salonName',
      title: 'Naam salon',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
    },
    {
      name: 'phone',
      title: 'Telefoonnummer',
      type: 'string',
    },
    {
      name: 'email',
      title: 'E-mailadres',
      type: 'string',
    },
    {
      name: 'address',
      title: 'Adres',
      type: 'text',
      rows: 3,
    },
    {
      name: 'instagram',
      title: 'Instagram URL',
      type: 'url',
    },
    {
      name: 'facebook',
      title: 'Facebook URL',
      type: 'url',
    },
  ],
  preview: {
    select: { title: 'salonName' },
    prepare({ title }) {
      return { title: title ?? 'Site-instellingen' };
    },
  },
};
