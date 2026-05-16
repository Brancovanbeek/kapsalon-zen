import siteSettings from './siteSettings.js';
import service from './service.js';
import product from './product.js';
import productCategory from './productCategory.js';
import testimonial from './testimonial.js';
import homePage from './homePage.js';

export const schemaTypes = [
  // Singletons
  siteSettings,
  homePage,
  // Content types
  service,
  product,
  productCategory,
  testimonial,
];
