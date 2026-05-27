import { notFound } from 'next/navigation';
import Link from 'next/link';
import { CATEGORIES, getCategoryByKey, parseConversionSlug, getConversions, convert, formatNumber } from '@/lib/units';
import { t, LANG_META } from '@/lib/translations';
import ConversionClient from '@/app/[category]/[conversion]/ConversionClient';

const lang = 'es';
const tr = t[lang];
const { prefix } = LANG_META[lang];
const BASE_URL = 'https://calcconvert.net';

interface Props {
  params: Promise<{ category: string; conversion: string }>;
}

export async function generateStaticParams() {
  const paths: { category: string; conversion: string }[] = [];
  for (const category of CATEGORIES) {
    for (const conv of getConversions(category)) {
      paths.push({ category: category.key, conversion: conv.slug });
    }
  }
  return paths;
}

export async function generateMetadata({ params }: Props) {
  const { category: catKey, conversion } = await params;
  const category = getCategoryByKey(catKey);
  if (!category) return {};
  const parsed = parseConversionSlug(conversion, category);
  if (!parsed) return {};
  const { from, to } = parsed;
  return {
    title: tr.metaTitle(from.label, from.symbol, to.label),
    description: tr.metaDesc(from.label, to.label),
    alternates: {
      canonical: `${BASE_URL}${prefix}/${catKey}/${conversion}`,
      languages: {
        'en': `${BASE_URL}/${catKey}/${conversion}`,
        'es': `${BASE_URL}/es/${catKey}/${conversion}`,
        'pt': `${BASE_URL}/pt/${catKey}/${conversion}`,
        'x-default': `${BASE_URL}/${catKey}/${conversion}`,
      },
    },
  };
}

export default async function ConversionPageEs({ params }: Props) {
  const { category: catKey, conversion } = await params;
  const category = getCategoryByKey(catKey);
  if (!category) notFound();

  const parsed = parseConversionSlug(conversion, category!);
  if (!parsed) notFound();

  const { from, to } = parsed;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: tr.convertXtoY(from.label, to.label),
    url: `${BASE_URL}${prefix}/${category!.key}/${conversion}`,
    description: tr.convertDesc(from.label, from.symbol, to.label, to.symbol),
    applicationCategory: 'UtilitiesApplication',
    inLanguage: LANG_META[lang].hreflang,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    faq: {
      '@type': 'FAQPage',
      mainEntity: [1, 5, 10, 100].map((v) => ({
        '@type': 'Question',
        name: tr.howMany(to.label, String(v), from.label),
        acceptedAnswer: {
          '@type': 'Answer',
          text: tr.answerText(String(v), from.symbol, formatNumber(convert(v, from.key, to.key, category!.key)), to.symbol),
        },
      })),
    },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-3">
          <Link href="/" className="text-blue-600 font-bold text-xl">CalcConvert</Link>
          <span className="text-gray-400">/</span>
          <Link href={`/${category!.key}`} className="text-gray-600 hover:text-blue-600">{category!.label}</Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-800">{from.label} → {to.label}</span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {tr.convertXtoY(from.label, to.label)}
        </h1>
        <p className="text-gray-500 mb-8">
          {tr.convertDesc(from.label, from.symbol, to.label, to.symbol)}
        </p>

        <ConversionClient category={category!} from={from} to={to} lang={lang} />
      </main>
    </div>
  );
}
