'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  CATEGORIES, getCategoryByKey, parseConversionSlug,
  convert, formatNumber, getConversions,
} from '@/lib/units';

interface Props {
  params: Promise<{ category: string; conversion: string }>;
}

export default function ConversionPage({ params }: Props) {
  const [resolvedParams, setResolvedParams] = useState<{ category: string; conversion: string } | null>(null);
  const [inputValue, setInputValue] = useState('1');

  useEffect(() => {
    params.then(setResolvedParams);
  }, [params]);

  if (!resolvedParams) return null;

  const category = getCategoryByKey(resolvedParams.category);
  if (!category) return <div className="p-8 text-center text-gray-500">Category not found</div>;

  const parsed = parseConversionSlug(resolvedParams.conversion, category);
  if (!parsed) return <div className="p-8 text-center text-gray-500">Conversion not found</div>;

  const { from, to } = parsed;
  const numValue = parseFloat(inputValue) || 0;
  const result = convert(numValue, from.key, to.key, category.key);

  const otherConversions = getConversions(category).filter(
    (c) => c.slug !== resolvedParams.conversion
  ).slice(0, 12);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-3">
          <Link href="/" className="text-blue-600 font-bold text-xl">CalcConvert</Link>
          <span className="text-gray-400">/</span>
          <Link href={`/${category.key}`} className="text-gray-600 hover:text-blue-600 capitalize">{category.label}</Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-800">{from.label} to {to.label}</span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {from.label} to {to.label} Converter
        </h1>
        <p className="text-gray-500 mb-8">
          Convert {from.label} ({from.symbol}) to {to.label} ({to.symbol}) instantly.
        </p>

        {/* Calculator */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* Input */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                {from.label} ({from.symbol})
              </label>
              <input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full text-2xl font-semibold border-2 border-blue-500 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200"
                placeholder="Enter value"
              />
            </div>

            {/* Arrow */}
            <div className="hidden md:flex justify-center text-gray-400 text-2xl">→</div>

            {/* Result */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                {to.label} ({to.symbol})
              </label>
              <div className="w-full text-2xl font-semibold bg-blue-50 border-2 border-blue-100 rounded-xl px-4 py-3 text-blue-700">
                {formatNumber(result)}
              </div>
            </div>
          </div>

          {/* Formula */}
          <div className="mt-4 pt-4 border-t border-gray-100 text-sm text-gray-500">
            {numValue} {from.symbol} = {formatNumber(result)} {to.symbol}
          </div>
        </div>

        {/* Common Values Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Common {from.label} to {to.label} Conversions
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-2 pr-4 text-gray-500 font-medium">{from.label} ({from.symbol})</th>
                  <th className="text-left py-2 text-gray-500 font-medium">{to.label} ({to.symbol})</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 5, 10, 20, 50, 100, 200, 500, 1000].map((v) => (
                  <tr key={v} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="py-2 pr-4 font-medium text-gray-700">
                      <Link href={`/${category.key}/${resolvedParams.conversion}/${v}`} className="hover:text-blue-600">
                        {v} {from.symbol}
                      </Link>
                    </td>
                    <td className="py-2 text-gray-600">{formatNumber(convert(v, from.key, to.key, category.key))} {to.symbol}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Other Conversions */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Other {category.label} Conversions</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {otherConversions.map((c) => {
              const fromUnit = category.units.find((u) => u.key === c.from)!;
              const toUnit = category.units.find((u) => u.key === c.to)!;
              return (
                <Link
                  key={c.slug}
                  href={`/${category.key}/${c.slug}`}
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
