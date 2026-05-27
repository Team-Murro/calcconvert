import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getCurrencyConversions, parseCurrencySlug } from '@/lib/currencies';
import CurrencyClient from './CurrencyClient';

export const revalidate = 3600;

interface Props {
  params: Promise<{ conversion: string }>;
}

export async function generateStaticParams() {
  return getCurrencyConversions().map((c) => ({ conversion: c.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { conversion } = await params;
  const parsed = parseCurrencySlug(conversion);
  if (!parsed) return {};
  const { from, to } = parsed;
  return {
    title: `${from.code} to ${to.code} — ${from.name} to ${to.name} Converter | CalcConvert`,
    description: `Convert ${from.name} (${from.code}) to ${to.name} (${to.code}). Live exchange rates updated hourly.`,
  };
}

async function getRates() {
  try {
    const res = await fetch('https://api.frankfurter.app/latest?from=USD', {
      next: { revalidate: 3600 },
    });
    const data = await res.json();
    return { rates: { USD: 1, ...data.rates } as Record<string, number>, date: data.date as string };
  } catch {
    return { rates: null, date: '' };
  }
}

export default async function CurrencyPage({ params }: Props) {
  const { conversion } = await params;
  const parsed = parseCurrencySlug(conversion);
  if (!parsed) notFound();

  const { from, to } = parsed;
  const { rates, date } = await getRates();

  const rate = rates ? (rates[to.code] / rates[from.code]) : null;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: `${from.code} to ${to.code} Converter`,
    description: `Convert ${from.name} to ${to.name} with live exchange rates.`,
    applicationCategory: 'FinanceApplication',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-3 flex-wrap">
          <Link href="/" className="text-blue-600 font-bold text-xl">CalcConvert</Link>
          <span className="text-gray-400">/</span>
          <Link href="/currency" className="text-gray-600 hover:text-blue-600">Currency</Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-800">{from.code} to {to.code}</span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {from.code} to {to.code} Converter
        </h1>
        <p className="text-gray-500 mb-2">
          Convert {from.name} to {to.name} with live exchange rates.
        </p>
        {rate && (
          <p className="text-sm text-gray-400 mb-8">
            1 {from.code} = {rate.toFixed(4)} {to.code} · Updated {date}
          </p>
        )}

        <CurrencyClient from={from} to={to} initialRates={rates} rateDate={date} />
      </main>
    </div>
  );
}
