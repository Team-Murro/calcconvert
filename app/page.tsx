import Link from 'next/link';
import { CATEGORIES, getConversions } from '@/lib/units';
import { getCurrencyConversions } from '@/lib/currencies';

export const metadata = {
  title: 'CalcConvert — Free Unit & Currency Converter',
  description:
    'Convert length, weight, temperature, area, speed, and world currencies instantly. Free online converter with reference tables — no sign-up required.',
};

const POPULAR_CONVERSIONS = [
  { category: 'length', slug: 'cm-to-ft', label: 'cm to Feet' },
  { category: 'length', slug: 'km-to-mi', label: 'km to Miles' },
  { category: 'weight', slug: 'kg-to-lb', label: 'kg to Pounds' },
  { category: 'temperature', slug: 'c-to-f', label: 'Celsius to Fahrenheit' },
  { category: 'length', slug: 'in-to-cm', label: 'Inches to cm' },
  { category: 'weight', slug: 'lb-to-kg', label: 'Pounds to kg' },
  { category: 'length', slug: 'm-to-ft', label: 'Meters to Feet' },
  { category: 'speed', slug: 'kph-to-mph', label: 'km/h to mph' },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <span className="text-blue-600 font-bold text-xl">CalcConvert</span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Free Unit &amp; Currency Converter</h1>
          <p className="text-gray-500 text-lg">
            Convert length, weight, temperature, area, speed, and world currencies — instantly.
          </p>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
          {CATEGORIES.map((category) => {
            const count = getConversions(category).length;
            return (
              <Link
                key={category.key}
                href={`/${category.key}`}
                className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-blue-300 hover:shadow-sm transition-all group text-center"
              >
                <div className="text-2xl mb-2">
                  {category.key === 'length' ? '📏' :
                   category.key === 'weight' ? '⚖️' :
                   category.key === 'temperature' ? '🌡️' :
                   category.key === 'area' ? '📐' : '💨'}
                </div>
                <div className="font-semibold text-gray-800 group-hover:text-blue-600">{category.label}</div>
                <div className="text-sm text-gray-400 mt-1">{count} conversions</div>
              </Link>
            );
          })}
          <Link
            href="/currency"
            className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-blue-300 hover:shadow-sm transition-all group text-center"
          >
            <div className="text-2xl mb-2">💱</div>
            <div className="font-semibold text-gray-800 group-hover:text-blue-600">Currency</div>
            <div className="text-sm text-gray-400 mt-1">{getCurrencyConversions().length} conversions</div>
          </Link>
        </div>

        {/* Popular Conversions */}
        <div className="mb-16">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Popular Conversions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {POPULAR_CONVERSIONS.map((item) => (
              <Link
                key={item.slug}
                href={`/${item.category}/${item.slug}`}
                className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-600 hover:border-blue-300 hover:text-blue-600 transition-colors text-center font-medium"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* About / content */}
        <section className="max-w-3xl text-gray-700 leading-relaxed space-y-5">
          <h2 className="text-2xl font-bold text-gray-900">A fast, accurate converter for everyday questions</h2>
          <p>
            CalcConvert is a free online tool that answers everyday conversion questions in a single
            tap — how many feet are in a meter, what 100 dollars is in euros, or how fast 60 miles per
            hour is in kilometers. Instead of digging through search results, you get the number you
            need right away, along with a reference table and a short explanation on every page.
          </p>
          <p>
            We cover five everyday measurement categories — <strong>length, weight, temperature,
            area, and speed</strong> — built on standard, internationally recognized conversion
            factors. For money, our <Link href="/currency" className="text-blue-600 hover:underline">currency
            converter</Link> uses official European Central Bank reference rates, refreshed every
            business day, so the figures you see reflect real market values.
          </p>
          <p>
            Everything on CalcConvert is free, works instantly in your browser, and needs no account
            or download. To learn more about the project and our data sources, visit the{' '}
            <Link href="/about" className="text-blue-600 hover:underline">About</Link> page.
          </p>
        </section>
      </main>
    </div>
  );
}
