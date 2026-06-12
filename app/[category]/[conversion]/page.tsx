import { notFound } from 'next/navigation';
import Link from 'next/link';
import { CATEGORIES, getCategoryByKey, parseConversionSlug, getConversions, convert, formatNumber } from '@/lib/units';
import ConversionClient from './ConversionClient';
import UnitInfo from '@/components/UnitInfo';

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

const BASE_URL = 'https://calcconvert.net';

export async function generateMetadata({ params }: Props) {
  const { category: catKey, conversion } = await params;
  const category = getCategoryByKey(catKey);
  if (!category) return {};
  const parsed = parseConversionSlug(conversion, category);
  if (!parsed) return {};
  const { from, to } = parsed;
  return {
    title: `${from.label} to ${to.label} Converter | CalcConvert`,
    description: `Free online ${from.label} to ${to.label} converter. Instantly convert ${from.symbol} to ${to.symbol} with a simple calculator.`,
    alternates: {
      canonical: `${BASE_URL}/${catKey}/${conversion}`,
      languages: {
        'en': `${BASE_URL}/${catKey}/${conversion}`,
        'es': `${BASE_URL}/es/${catKey}/${conversion}`,
        'pt': `${BASE_URL}/pt/${catKey}/${conversion}`,
        'x-default': `${BASE_URL}/${catKey}/${conversion}`,
      },
    },
  };
}

export default async function ConversionPage({ params }: Props) {
  const { category: catKey, conversion } = await params;
  const category = getCategoryByKey(catKey);
  if (!category) notFound();

  const parsed = parseConversionSlug(conversion, category!);
  if (!parsed) notFound();

  const { from, to } = parsed;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: `${from.label} to ${to.label} Converter`,
    url: `https://calcconvert.net/${category!.key}/${conversion}`,
    description: `Convert ${from.label} (${from.symbol}) to ${to.label} (${to.symbol}) instantly.`,
    applicationCategory: 'UtilitiesApplication',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    faq: {
      '@type': 'FAQPage',
      mainEntity: [1, 5, 10, 100].map((v) => ({
        '@type': 'Question',
        name: `How many ${to.label} is ${v} ${from.label}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `${v} ${from.symbol} = ${formatNumber(convert(v, from.key, to.key, category!.key))} ${to.symbol}`,
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
          <span className="text-gray-800">{from.label} to {to.label}</span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {from.label} to {to.label} Converter
        </h1>
        <p className="text-gray-500 mb-8">
          Convert {from.label} ({from.symbol}) to {to.label} ({to.symbol}) instantly.
        </p>

        <ConversionClient category={category!} from={from} to={to} />

        <UnitInfo category={category!} from={from} to={to} lang="en" />
      </main>
    </div>
  );
}
