import { createClient } from '@sanity/client';

export const sanityClient = createClient({
  projectId: import.meta.env.SANITY_PROJECT_ID ?? import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.SANITY_DATASET ?? import.meta.env.PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2025-01-01',
  useCdn: false,
});

export async function getHomePage() {
  return sanityClient.fetch(`*[_type == "homePage"][0]{
    heroHeadline,
    heroSubtext,
    "heroImages": heroImages[]{"imageUrl": asset->url, "alt": alt},
    aboutHeading,
    aboutText,
    "aboutImageUrl": aboutImage.asset->url,
    "aboutImageAlt": aboutImage.alt
  }`);
}

export async function getAllServices() {
  return sanityClient.fetch(`*[_type == "service"] | order(_createdAt asc){
    _id,
    title,
    "slug": slug.current,
    shortDescription,
    price,
    featured,
    "imageUrl": image.asset->url,
    "imageAlt": image.alt
  }`);
}

export async function getServiceBySlug(slug) {
  return sanityClient.fetch(`*[_type == "service" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    shortDescription,
    description,
    price,
    "imageUrl": image.asset->url,
    "imageAlt": image.alt
  }`, { slug });
}

export async function getFeaturedServices() {
  return sanityClient.fetch(`*[_type == "service" && featured == true] | order(_createdAt asc){
    _id,
    title,
    "slug": slug.current,
    shortDescription,
    price,
    "imageUrl": image.asset->url,
    "imageAlt": image.alt
  }`);
}

export async function getAllProducts() {
  return sanityClient.fetch(`*[_type == "product"] | order(_createdAt desc){
    _id,
    title,
    "slug": slug.current,
    brand,
    price,
    category,
    inStock,
    featured,
    "imageUrl": image.asset->url,
    "imageAlt": image.alt
  }`);
}

export async function getProductBySlug(slug) {
  return sanityClient.fetch(`*[_type == "product" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    brand,
    shortDescription,
    description,
    price,
    category,
    inStock,
    "imageUrl": image.asset->url,
    "imageAlt": image.alt,
    "galleryImages": images[]{"url": asset->url, "alt": alt},
    "address": *[_type == "siteSettings"][0].address
  }`, { slug });
}

export async function getFeaturedProducts() {
  return sanityClient.fetch(`*[_type == "product" && featured == true] | order(_createdAt desc)[0...3]{
    _id,
    title,
    "slug": slug.current,
    brand,
    price,
    category,
    inStock,
    "imageUrl": image.asset->url,
    "imageAlt": image.alt
  }`);
}

export async function getRelatedProducts(category, excludeSlug) {
  return sanityClient.fetch(`*[_type == "product" && category == $category && slug.current != $excludeSlug] | order(_createdAt desc)[0...3]{
    _id,
    title,
    "slug": slug.current,
    brand,
    price,
    category,
    inStock,
    "imageUrl": image.asset->url,
    "imageAlt": image.alt
  }`, { category, excludeSlug });
}

export async function getAllTestimonials() {
  return sanityClient.fetch(`*[_type == "testimonial"] | order(date desc){
    _id,
    name,
    quote,
    rating,
    date
  }`);
}

export async function getSiteSettings() {
  return sanityClient.fetch(`*[_type == "siteSettings"][0]{
    salonName,
    tagline,
    phone,
    email,
    address,
    instagram,
    facebook
  }`);
}

// Genereert een srcset-attribuut voor een <img> tag.
// De browser kiest dan zelf de juiste grootte op basis van het scherm.
// Sanity's CDN levert via ?auto=format automatisch WebP of AVIF aan.
export function srcset(url, widths = [400, 800, 1200, 1800]) {
  if (!url) return '';
  return widths.map(w => `${url}?w=${w}&auto=format ${w}w`).join(', ');
}

// Sanity slaat rijke tekst op als een array van blokken, niet als HTML.
// Deze functie zet die blokken om naar gewone HTML-tags (<p>, <h2>, etc.)
// zodat ze direct in de pagina gezet kunnen worden met set:html={...}.
export function portableTextToHtml(blocks = []) {
  return blocks
    .filter(b => b._type === 'block')
    .map(b => {
      const text = (b.children ?? []).map(c => c.text ?? '').join('');
      const tag = { h2: 'h2', h3: 'h3', h4: 'h4', blockquote: 'blockquote' }[b.style] ?? 'p';
      return `<${tag}>${text}</${tag}>`;
    })
    .join('');
}

// Zet een getal om naar een leesbare prijs in Nederlandse stijl.
// De .replace verwijdert ,00 bij ronde bedragen: € 35,– in plaats van € 35,00.
export function formatPrice(price) {
  return new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' })
    .format(price)
    .replace(',00', ',–');
}
