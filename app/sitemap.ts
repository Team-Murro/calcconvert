import { MetadataRoute } from 'next';
import { CATEGORIES, getConversions, POPULAR_VALUES } from '@/lib/units';
import { getCurrencyConversions, POPULAR_CURRENCY_VALUES } from '@/lib/currencies';

const BASE_URL = 'https://calcconvert.net';
const LANGS = ['', '/es', '/pt'] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const urls: MetadataRoute.Sitemap = [
    { url: BASE_URL, priority: 1.0, changeFrequency: 'monthly' },
    { url: `${BASE_URL}/privacy`, priority: 0.3, changeFrequency: 'yearly' },
  ];

  for (const category of CATEGORIES) {
    urls.push({
      url: `${BASE_URL}/${category.key}`,
      priority: 0.9,
      changeFrequency: 'monthly',
    });

    for (const conv of getConversions(category)) {
      for (const lang of LANGS) {
        urls.push({
          url: `${BASE_URL}${lang}/${category.key}/${conv.slug}`,
          priority: 0.8,
          changeFrequency: 'monthly',
        });
      }

      for (const val of POPULAR_VALUES[category.key]) {
        for (const lang of LANGS) {
          urls.push({
            url: `${BASE_URL}${lang}/${category.key}/${conv.slug}/${val}`,
            priority: 0.6,
            changeFrequency: 'monthly',
          });
        }
      }
    }
  }

  urls.push({ url: `${BASE_URL}/currency`, priority: 0.9, changeFrequency: 'daily' });

  for (const conv of getCurrencyConversions()) {
    for (const lang of LANGS) {
      urls.push({
        url: `${BASE_URL}${lang}/currency/${conv.slug}`,
        priority: 0.8,
        changeFrequency: 'daily',
      });
    }
    for (const val of POPULAR_CURRENCY_VALUES) {
      for (const lang of LANGS) {
        urls.push({
          url: `${BASE_URL}${lang}/currency/${conv.slug}/${val}`,
          priority: 0.6,
          changeFrequency: 'daily',
        });
      }
    }
  }

  return urls;
}
