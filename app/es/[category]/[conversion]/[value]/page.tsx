import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  CATEGORIES, getCategoryByKey, parseConversionSlug,
  convert, formatNumber, getConversions, POPULAR_VALUES,
} from '@/lib/units';
import { t, LANG_META } from '@/lib/translations';

const lang = 'es';
const tr = t[lang];
const { prefix } = LANG_META[lang];
const BASE_URL = 'https://calcconvert.net';

interface Props {
  params: Promise<{ category: string; conversion: string; value: string }>;
}

export async function generateStaticParams() {
  const paths: { category: string; conversion: string; value: string }[] = [];
  for (const category of CATEGORIES) {
    const conversions = getConversions(category);
    const values = POPULAR_VALUES[category.key];
    for (const conv of conversions) {
      for (const val of values) {
        paths.push({ category: category.key, conversion: conv.slug, value: String(val) });
      }
    }
  }
  return paths;
}

export async function generateMetadata({ params }: Props) {
  const { category: catKey, conversion, value } = await params;
  const category = getCategoryByKey(catKey);
  if (!category) return {};
  const parsed = parseConversionSlug(conversion, category);
  if (!parsed) return {};
  const { from, to } = parsed;
  const numValue = parseFloat(value);
  const result = convert(numValue, from.key, to.key, category.key);
  return {
    title: tr.valueMetaTitle(value, from.symbol, to.symbol, formatNumber(result), to.symbol),
    description: tr.valueMetaDesc(value, from.label, formatNumber(result), to.label),
    robots: { index: false, follow: true },
    alternates: {
      canonical: `${BASE_URL}${prefix}/${catKey}/${conversion}/${value}`,
      languages: {
        'en': `${BASE_URL}/${catKey}/${conversion}/${value}`,
        'es': `${BASE_URL}/es/${catKey}/${conversion}/${value}`,
        'pt': `${BASE_URL}/pt/${catKey}/${conversion}/${value}`,
        'x-default': `${BASE_URL}/${catKey}/${conversion}/${value}`,
      },
    },
  };
}

export default async function ValuePageEs({ params }: Props) {
  const { category: catKey, conversion, value } = await params;
  const category = getCategoryByKey(catKey);
  if (!category) notFound();

  const parsed = parseConversionSlug(conversion, category!);
  if (!parsed) notFound();

  const { from, to } = parsed;
  const numValue = parseFloat(value);
  if (isNaN(numValue)) notFound();

  const result = convert(numValue, from.key, to.key, category!.key);
  const relatedValues = POPULAR_VALUES[category!.key].filter((v) => v !== numValue).slice(0, 8);
  const otherConversions = getConversions(category!).filter((c) => c.slug !== conversion).slice(0, 12);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    inLanguage: LANG_META[lang].hreflang,
    mainEntity: {
      '@type': 'Question',
      name: tr.howMany(to.label, value, from.label),
      acceptedAnswer: {
        '@type': 'Answer',
        text: tr.answerText(value, from.symbol, formatNumber(result), to.symbol),
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-3 flex-wrap">
          <Link href="/" className="text-blue-600 font-bold text-xl">CalcConvert</Link>
          <span className="text-gray-400">/</span>
          <Link href={`/${category!.key}`} className="text-gray-600 hover:text-blue-600">{category!.label}</Link>
          <span className="text-gray-400">/</span>
          <Link href={`${prefix}/${category!.key}/${conversion}`} className="text-gray-600 hover:text-blue-600">
            {from.label} → {to.label}
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-800">{value}</span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-blue-600 text-white rounded-2xl p-8 mb-8 text-center">
          <p className="text-blue-100 text-lg mb-2">{tr.xEquals(value, from.label)}</p>
          <p className="text-5xl font-bold mb-2">{formatNumber(result)} {to.symbol}</p>
          <p className="text-blue-200">{tr.answerText(value, from.symbol, formatNumber(result), to.symbol)}</p>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          {tr.howMany(to.label, value, from.label)}
        </h1>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">{tr.relatedConversions}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {relatedValues.map((v) => (
              <Link
                key={v}
                href={`${prefix}/${category!.key}/${conversion}/${v}`}
                className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-600 hover:border-blue-300 hover:text-blue-600 transition-colors text-center"
              >
                <div className="font-medium">{v} {from.symbol}</div>
                <div className="text-gray-400 text-xs">{formatNumber(convert(v, from.key, to.key, category!.key))} {to.symbol}</div>
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">{tr.tryConverterTitle}</h2>
          <Link
            href={`${prefix}/${category!.key}/${conversion}`}
            className="inline-block bg-blue-600 text-white rounded-xl px-6 py-3 font-medium hover:bg-blue-700 transition-colors"
          >
            {tr.tryConverter(from.label, to.label)}
          </Link>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">{tr.otherConversions(category!.label)}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {otherConversions.map((c) => {
              const fromUnit = category!.units.find((u) => u.key === c.from)!;
              const toUnit = category!.units.find((u) => u.key === c.to)!;
              return (
                <Link
                  key={c.slug}
                  href={`${prefix}/${category!.key}/${c.slug}`}
                  className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-600 hover:border-blue-300 hover:text-blue-600 transition-colors"
                >
                  {fromUnit.label} → {toUnit.label}
                </Link>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
