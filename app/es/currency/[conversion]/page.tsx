import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getCurrencyConversions, parseCurrencySlug } from '@/lib/currencies';
import { t, LANG_META } from '@/lib/translations';
import CurrencyClient from '@/app/currency/[conversion]/CurrencyClient';
import CurrencyInfo from '@/components/CurrencyInfo';

export const revalidate = 86400;

const lang = 'es';
const tr = t[lang];
const { prefix } = LANG_META[lang];
const BASE_URL = 'https://calcconvert.net';

interface Props {
  params: Promise<{ conversion: string }>;
}

export async function generateStaticParams() {
  return getCurrencyConversions().map((c) => ({ conversion: c.slug }));
}

async function getRates() {
  try {
    const res = await fetch('https://api.frankfurter.app/latest?from=USD', {
      next: { revalidate: 86400 },
    });
    const data = await res.json();
    return { rates: { USD: 1, ...data.rates } as Record<string, number>, date: data.date as string };
  } catch {
    return { rates: null, date: '' };
  }
}

export async function generateMetadata({ params }: Props) {
  const { conversion } = await params;
  const parsed = parseCurrencySlug(conversion);
  if (!parsed) return {};
  const { from, to } = parsed;
  return {
    title: tr.metaTitle(from.code, from.code, to.code),
    description: tr.metaDesc(from.name, to.name),
    alternates: {
      canonical: `${BASE_URL}${prefix}/currency/${conversion}`,
      languages: {
        'en': `${BASE_URL}/currency/${conversion}`,
        'es': `${BASE_URL}/es/currency/${conversion}`,
        'pt': `${BASE_URL}/pt/currency/${conversion}`,
        'x-default': `${BASE_URL}/currency/${conversion}`,
      },
    },
  };
}

export default async function CurrencyPageEs({ params }: Props) {
  const { conversion } = await params;
  const parsed = parseCurrencySlug(conversion);
  if (!parsed) notFound();

  const { from, to } = parsed;
  const { rates, date } = await getRates();

  const rate = rates ? (rates[to.code] / rates[from.code]) : null;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: tr.convertXtoY(from.code, to.code),
    description: tr.convertDesc(from.name, from.code, to.name, to.code),
    applicationCategory: 'FinanceApplication',
    inLanguage: LANG_META[lang].hreflang,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-3 flex-wrap">
          <Link href="/" className="text-blue-600 font-bold text-xl">CalcConvert</Link>
          <span className="text-gray-400">/</span>
          <Link href="/currency" className="text-gray-600 hover:text-blue-600">{tr.currency}</Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-800">{from.code} → {to.code}</span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {tr.convertXtoY(from.code, to.code)}
        </h1>
        <p className="text-gray-500 mb-2">
          {tr.convertDesc(from.name, from.code, to.name, to.code)}
        </p>
        {rate && (
          <p className="text-sm text-gray-400 mb-8">
            1 {from.code} = {rate.toFixed(4)} {to.code} · {tr.rateAsOf(date)}
          </p>
        )}

        <CurrencyClient from={from} to={to} initialRates={rates} rateDate={date} lang={lang} />

        <CurrencyInfo from={from} to={to} rates={rates} lang={lang} />
      </main>
    </div>
  );
}
