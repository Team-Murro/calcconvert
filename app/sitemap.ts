import { MetadataRoute } from 'next';
import { CATEGORIES, getConversions, POPULAR_VALUES } from '@/lib/units';

const BASE_URL = 'https://calcconvert.net';

export default function sitemap(): MetadataRoute.Sitemap {
  const urls: MetadataRoute.Sitemap = [
    { url: BASE_URL, priority: 1.0, changeFrequency: 'monthly' },
  ];

  for (const category of CATEGORIES) {
    // 카테고리 페이지
    urls.push({
      url: `${BASE_URL}/${category.key}`,
      priority: 0.9,
      changeFrequency: 'monthly',
    });

    // 변환 페이지
    for (const conv of getConversions(category)) {
      urls.push({
        url: `${BASE_URL}/${category.key}/${conv.slug}`,
        priority: 0.8,
        changeFrequency: 'monthly',
      });

      // 롱테일 (숫자 포함) 페이지
      for (const val of POPULAR_VALUES[category.key]) {
        urls.push({
          url: `${BASE_URL}/${category.key}/${conv.slug}/${val}`,
          priority: 0.6,
          changeFrequency: 'monthly',
        });
      }
    }
  }

  return urls;
}
