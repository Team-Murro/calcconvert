import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getCurrencyConversions, parseCurrencySlug, formatCurrency, POPULAR_CURRENCY_VALUES } from '@/lib/currencies';

export const revalidate = 3600;

interface Props {
  params: Promise<{ conversion: string; value: string }>;
}

export async function generateStaticParams() {
  return getCurrencyConversions().flatMap((c) =>
    POPULAR_CURRENCY_VALUES.map((v) => ({ conversion: c.slug, value: String(v) }))
  );
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

export async function generateMetadata({ params }: Props) {
  const { conversion, value } = await params;
  const parsed = parseCurrencySlug(conversion);
  if (!parsed) return {};
  const { from, to } = parsed;
  const { rates } = await getRates();
  const numValue = parseFloat(value);
  const result = rates ? (numValue / rates[from.code]) * rates[to.code] : null;
  return {
    title: `${value} ${from.code} to ${to.code}${result ? ` = ${formatCurrency(result, to.code)} ${to.code}` : ''} | CalcConvert`,
    description: `${value} ${from.name} equals ${result ? formatCurrency(result, to.code) : '—'} ${to.name}. Live exchange rate converter.`,
  };
}

export default async function CurrencyValuePage({ params }: Props) {
  const { conversion, value } = await params;
  const parsed = parseCurrencySlug(conversion);
  if (!parsed) notFound();

  const numValue = parseFloat(value);
  if (isNaN(numValue)) notFound();

  const { from, to } = parsed;
  const { rates, date } = await getRates();

  const convert = (amount: number) => {
    if (!rates) return null;
    return (amount / rates[from.code]) * rates[to.code];
  };

  const result = convert(numValue);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `${value} ${from.code} to ${to.code}`,
    mainEntity: {
      '@type': 'Question',
      name: `How much is ${value} ${from.code} in ${to.code}?`,
      acceptedAnswer: {
        '@type': 'Answer',
        text: result
          ? `${value} ${from.name} = ${formatCurrency(result, to.code)} ${to.name} (as of ${date})`
          : `Use our converter for the latest rate.`,
      },
    },
  };

  const relatedValues = POPULAR_CURRENCY_VALUES.filter((v) => v !== numValue).slice(0, 8);

  return (
    <div className="min-h-screen bg-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-3 flex-wrap">
          <Link href="/" className="text-blue-600 font-bold text-xl">CalcConvert</Link>
          <span className="text-gray-400">/</span>
          <Link href="/currency" className="text-gray-600 hover:text-blue-600">Currency</Link>
          <span className="text-gray-400">/</span>
          <Link href={`/currency/${conversion}`} className="text-gray-600 hover:text-blue-600">{from.code} to {to.code}</Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-800">{value}</span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Answer box */}
        <div className="bg-blue-600 text-white rounded-2xl p-8 mb-8 text-center">
          <p className="text-blue-100 text-lg mb-2">{value} {from.name} equals</p>
          <p className="text-5xl font-bold mb-2">
            {result !== null ? `${to.symbol}${formatCurrency(result, to.code)}` : '—'}
          </p>
          <p className="text-blue-200 text-sm">Rate as of {date} · Updated hourly</p>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          {value} {from.code} to {to.code}
        </h1>

        {/* Related values */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Related Conversions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {relatedValues.map((v) => {
              const r = convert(v);
              return (
                <Link
                  key={v}
                  href={`/currency/${conversion}/${v}`}
                  className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-600 hover:border-blue-300 hover:text-blue-600 transition-colors text-center"
                >
                  <div className="font-medium">{from.symbol}{v.toLocaleString()}</div>
                  <div className="text-gray-400 text-xs">
                    {r !== null ? `${to.symbol}${formatCurrency(r, to.code)}` : '—'}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Try the Full Converter</h2>
          <Link
            href={`/currency/${conversion}`}
            className="inline-block bg-blue-600 text-white rounded-xl px-6 py-3 font-medium hover:bg-blue-700 transition-colors"
          >
            Open {from.code} to {to.code} Converter →
          </Link>
        </div>
      </main>
    </div>
  );
}
