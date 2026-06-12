import { MetadataRoute } from 'next';
import { CATEGORIES, getConversions } from '@/lib/units';
import { getCurrencyConversions } from '@/lib/currencies';

const BASE_URL = 'https://calcconvert.net';
const LANGS = ['', '/es', '/pt'] as const;

// 값 페이지(/.../[value])는 noindex 처리 → 사이트맵에서 제외.
// 컨버터(허브) 페이지만 색인 surface로 유지.
export default function sitemap(): MetadataRoute.Sitemap {
  const urls: MetadataRoute.Sitemap = [
    { url: BASE_URL, priority: 1.0, changeFrequency: 'monthly' },
    { url: `${BASE_URL}/about`, priority: 0.5, changeFrequency: 'yearly' },
    { url: `${BASE_URL}/contact`, priority: 0.5, changeFrequency: 'yearly' },
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
  }

  return urls;
}
