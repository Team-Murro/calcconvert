import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CATEGORIES, getCategoryByKey, getConversions } from '@/lib/units';

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.key }));
}

export async function generateMetadata({ params }: Props) {
  const { category: catKey } = await params;
  const category = getCategoryByKey(catKey);
  if (!category) return {};
  return {
    title: `${category.label} Converter — Convert ${category.units.map((u) => u.symbol).join(', ')} | CalcConvert`,
    description: `Free online ${category.label.toLowerCase()} converter. Convert between ${category.units.map((u) => u.label).join(', ')}.`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category: catKey } = await params;
  const category = getCategoryByKey(catKey);
  if (!category) notFound();

  const conversions = getConversions(category!);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-3">
          <Link href="/" className="text-blue-600 font-bold text-xl">CalcConvert</Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-800">{category!.label}</span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{category!.label} Converter</h1>
        <p className="text-gray-500 mb-8">
          Convert between {category!.units.map((u) => u.label).join(', ')}.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {conversions.map((c) => {
            const fromUnit = category!.units.find((u) => u.key === c.from)!;
            const toUnit = category!.units.find((u) => u.key === c.to)!;
            return (
              <Link
                key={c.slug}
                href={`/${category!.key}/${c.slug}`}
                className="bg-white border border-gray-200 rounded-xl px-5 py-4 hover:border-blue-300 hover:shadow-sm transition-all group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 group-hover:text-blue-600 font-medium">
                    {fromUnit.label} to {toUnit.label}
                  </span>
                  <span className="text-gray-400 text-sm">
                    {fromUnit.symbol} → {toUnit.symbol}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}
