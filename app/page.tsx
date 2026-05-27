import Link from 'next/link';
import { CATEGORIES, getConversions } from '@/lib/units';

export const metadata = {
  title: 'CalcConvert — Free Online Unit Converter',
  description: 'Convert length, weight, temperature, area, and speed units instantly. Free online unit converter.',
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Free Online Unit Converter</h1>
          <p className="text-gray-500 text-lg">Convert length, weight, temperature, area, and speed — instantly.</p>
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
        </div>

        {/* Popular Conversions */}
        <div>
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
      </main>
    </div>
  );
}
