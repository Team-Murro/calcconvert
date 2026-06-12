import { Currency, formatCurrency } from '@/lib/currencies';
import { t, Lang } from '@/lib/translations';

const AMOUNTS = [1, 5, 10, 25, 50, 100, 500, 1000, 5000];

interface Props {
  from: Currency;
  to: Currency;
  rates: Record<string, number> | null;
  lang?: Lang;
}

// 환율 컨버터 페이지용 본문 콘텐츠: 설명 + 변환표 + FAQ (AdSense용 실콘텐츠)
export default function CurrencyInfo({ from, to, rates, lang = 'en' }: Props) {
  const tr = t[lang];
  const conv = (amt: number) =>
    rates ? (amt / rates[from.code]) * rates[to.code] : null;

  const oneRes = conv(1);
  const rateStr = oneRes !== null ? formatCurrency(oneRes, to.code) : '—';
  const hundredRes = conv(100);
  const hundredStr = hundredRes !== null ? formatCurrency(hundredRes, to.code) : '—';

  return (
    <section className="mt-12 space-y-10">
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          {tr.curInfoTitle(from.code, to.code)}
        </h2>
        <p className="text-gray-600 leading-relaxed">
          {tr.curInfoBody(from.code, to.code, rateStr)}
        </p>
      </div>

      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          {tr.tableTitle(from.code, to.code)}
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-50 text-gray-700">
              <tr>
                <th className="text-left px-4 py-2 font-semibold">{tr.colFrom}</th>
                <th className="text-left px-4 py-2 font-semibold">{tr.colTo}</th>
              </tr>
            </thead>
            <tbody>
              {AMOUNTS.map((v) => {
                const r = conv(v);
                return (
                  <tr key={v} className="border-t border-gray-100">
                    <td className="px-4 py-2 text-gray-700">
                      {from.symbol}
                      {v.toLocaleString()} {from.code}
                    </td>
                    <td className="px-4 py-2 text-gray-700">
                      {r !== null ? `${to.symbol}${formatCurrency(r, to.code)} ${to.code}` : '—'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">{tr.faqTitle}</h2>
        <div className="space-y-5">
          <Faq
            q={tr.curFaqHowMuchQ(from.code, to.code)}
            a={tr.curFaqHowMuchA(hundredStr, from.code, to.code)}
          />
          <Faq q={tr.curFaqUpdateQ} a={tr.curFaqUpdateA} />
          <Faq
            q={tr.curFaqAccurateQ(from.code, to.code)}
            a={tr.curFaqAccurateA}
          />
        </div>
      </div>
    </section>
  );
}

function Faq({ q, a }: { q: string; a: string }) {
  return (
    <div>
      <h3 className="font-semibold text-gray-800">{q}</h3>
      <p className="text-gray-600 mt-1 leading-relaxed">{a}</p>
    </div>
  );
}
