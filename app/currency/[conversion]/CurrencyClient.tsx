'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Currency, CURRENCIES, formatCurrency, POPULAR_CURRENCY_VALUES } from '@/lib/currencies';
import { t, Lang, LANG_META } from '@/lib/translations';

interface Props {
  from: Currency;
  to: Currency;
  initialRates: Record<string, number> | null;
  rateDate: string;
  lang?: Lang;
}

export default function CurrencyClient({ from, to, initialRates, rateDate, lang = 'en' }: Props) {
  const [rates, setRates] = useState<Record<string, number> | null>(initialRates);
  const [inputValue, setInputValue] = useState('1');
  const [loading, setLoading] = useState(!initialRates);
  const tr = t[lang];
  const prefix = LANG_META[lang].prefix;

  useEffect(() => {
    if (!rates) {
      fetch('/api/rates').then(r => r.json()).then(d => {
        setRates(d.rates);
        setLoading(false);
      });
    }
  }, [rates]);

  const convert = (amount: number) => {
    if (!rates) return null;
    const inUsd = amount / rates[from.code];
    return inUsd * rates[to.code];
  };

  const numValue = parseFloat(inputValue) || 0;
  const result = convert(numValue);

  const otherPairs = CURRENCIES
    .filter((c) => c.code !== from.code)
    .slice(0, 8)
    .map((c) => ({ code: c.code, name: c.name, slug: `${from.code.toLowerCase()}-to-${c.code.toLowerCase()}` }));

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              {from.name} ({from.code})
            </label>
            <div className="flex items-center border-2 border-blue-500 rounded-xl overflow-hidden">
              <span className="px-3 text-gray-400 font-medium">{from.symbol}</span>
              <input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1 text-2xl font-semibold px-2 py-3 outline-none"
                placeholder="1"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              {to.name} ({to.code})
            </label>
            <div className="flex items-center bg-blue-50 border-2 border-blue-100 rounded-xl overflow-hidden">
              <span className="px-3 text-blue-400 font-medium">{to.symbol}</span>
              <div className="flex-1 text-2xl font-semibold px-2 py-3 text-blue-700">
                {loading ? '...' : result !== null ? formatCurrency(result, to.code) : '—'}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-100 text-sm text-gray-400">
          {tr.rateAsOf(rateDate)} · {tr.updatedHourly}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          {tr.commonConversions(from.code, to.code)}
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 pr-4 text-gray-500 font-medium">{from.code}</th>
                <th className="text-left py-2 text-gray-500 font-medium">{to.code}</th>
              </tr>
            </thead>
            <tbody>
              {POPULAR_CURRENCY_VALUES.map((v) => {
                const r = convert(v);
                return (
                  <tr key={v} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="py-2 pr-4 font-medium text-gray-700">
                      <Link
                        href={`${prefix}/currency/${from.code.toLowerCase()}-to-${to.code.toLowerCase()}/${v}`}
                        className="hover:text-blue-600"
                      >
                        {from.symbol}{v.toLocaleString()}
                      </Link>
                    </td>
                    <td className="py-2 text-gray-600">
                      {loading || r === null ? '...' : `${to.symbol}${formatCurrency(r, to.code)}`}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">{tr.otherConversions(from.code)}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {otherPairs.map((p) => (
            <Link
              key={p.slug}
              href={`${prefix}/currency/${p.slug}`}
              className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-600 hover:border-blue-300 hover:text-blue-600 transition-colors text-center"
            >
              {from.code} → {p.code}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
