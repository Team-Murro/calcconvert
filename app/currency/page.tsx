import Link from 'next/link';
import { CURRENCIES } from '@/lib/currencies';

export const metadata = {
  title: 'Currency Converter — Live Exchange Rates | CalcConvert',
  description: 'Convert between 24 currencies with live exchange rates updated hourly. USD, EUR, GBP, JPY, KRW and more.',
};

const POPULAR_PAIRS = [
  { slug: 'usd-to-eur', label: 'USD → EUR' },
  { slug: 'usd-to-krw', label: 'USD → KRW' },
  { slug: 'usd-to-jpy', label: 'USD → JPY' },
  { slug: 'eur-to-usd', label: 'EUR → USD' },
  { slug: 'gbp-to-usd', label: 'GBP → USD' },
  { slug: 'usd-to-cny', label: 'USD → CNY' },
  { slug: 'usd-to-gbp', label: 'USD → GBP' },
  { slug: 'eur-to-krw', label: 'EUR → KRW' },
];

export default function CurrencyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-3">
          <Link href="/" className="text-blue-600 font-bold text-xl">CalcConvert</Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-800">Currency</span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Currency Converter</h1>
        <p className="text-gray-500 mb-8">Live exchange rates updated hourly. 24 currencies supported.</p>

        <div className="mb-10">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Popular Pairs</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {POPULAR_PAIRS.map((p) => (
              <Link
                key={p.slug}
                href={`/currency/${p.slug}`}
                className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 hover:border-blue-300 hover:text-blue-600 transition-colors text-center"
              >
                {p.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">All Currencies</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {CURRENCIES.map((c) => (
              <Link
                key={c.code}
                href={`/currency/${c.code.toLowerCase()}-to-usd`}
                className="bg-white border border-gray-200 rounded-xl px-4 py-3 hover:border-blue-300 hover:shadow-sm transition-all group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-800 group-hover:text-blue-600">{c.code}</span>
                  <span className="text-gray-400 text-sm">{c.symbol}</span>
                </div>
                <div className="text-xs text-gray-400 mt-1">{c.name}</div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
