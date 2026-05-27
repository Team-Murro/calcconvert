'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CategoryConfig, Unit, convert, formatNumber, getConversions } from '@/lib/units';
import { t, Lang, LANG_META } from '@/lib/translations';

interface Props {
  category: CategoryConfig;
  from: Unit;
  to: Unit;
  initialValue?: number;
  lang?: Lang;
}

export default function ConversionClient({ category, from, to, initialValue = 1, lang = 'en' }: Props) {
  const [inputValue, setInputValue] = useState(String(initialValue));
  const tr = t[lang];
  const prefix = LANG_META[lang].prefix;

  const numValue = parseFloat(inputValue) || 0;
  const result = convert(numValue, from.key, to.key, category.key);

  const otherConversions = getConversions(category).filter(
    (c) => c.slug !== `${from.key}-to-${to.key}`
  ).slice(0, 12);

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
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
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              {to.label} ({to.symbol})
            </label>
            <div className="w-full text-2xl font-semibold bg-blue-50 border-2 border-blue-100 rounded-xl px-4 py-3 text-blue-700">
              {formatNumber(result)}
            </div>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-100 text-sm text-gray-500">
          {numValue} {from.symbol} = {formatNumber(result)} {to.symbol}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          {tr.commonConversions(from.label, to.label)}
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
                    <Link href={`${prefix}/${category.key}/${from.key}-to-${to.key}/${v}`} className="hover:text-blue-600">
                      {v} {from.symbol}
                    </Link>
                  </td>
                  <td className="py-2 text-gray-600">
                    {formatNumber(convert(v, from.key, to.key, category.key))} {to.symbol}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">{tr.otherConversions(category.label)}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {otherConversions.map((c) => {
            const fromUnit = category.units.find((u) => u.key === c.from)!;
            const toUnit = category.units.find((u) => u.key === c.to)!;
            return (
              <Link
                key={c.slug}
                href={`${prefix}/${category.key}/${c.slug}`}
                className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-600 hover:border-blue-300 hover:text-blue-600 transition-colors"
              >
                {fromUnit.label} → {toUnit.label}
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
