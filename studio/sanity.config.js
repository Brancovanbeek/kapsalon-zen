import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas/index.js';

// Singleton document types that should only have one instance
const singletonTypes = new Set(['siteSettings', 'homePage']);

const singletonActions = new Set(['publish', 'discardChanges', 'restore']);

export default defineConfig({
  name: 'kapsalon-zen',
  title: 'Kapsalon Zen',

  projectId: 'ab9y12jb',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Inhoud')
          .items([
            // Singleton: Site-instellingen
            S.listItem()
              .title('Site-instellingen')
              .id('siteSettings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
              ),
            // Singleton: Homepage
            S.listItem()
              .title('Homepage')
              .id('homePage')
              .child(
                S.document()
                  .schemaType('homePage')
                  .documentId('homePage')
              ),
            S.divider(),
            // Regular document types
            S.documentTypeListItem('service').title('Diensten'),
            S.documentTypeListItem('product').title('Producten'),
            S.documentTypeListItem('productCategory').title('Productcategorieën'),
            S.documentTypeListItem('testimonial').title('Testimonials'),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },

  document: {
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({ action }) => action && singletonActions.has(action))
        : input,
  },
});
