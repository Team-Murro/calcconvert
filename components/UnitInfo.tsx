import { CategoryConfig, Unit, convert, formatNumber } from '@/lib/units';
import { t, Lang } from '@/lib/translations';

const TABLE_VALUES = [1, 2, 5, 10, 25, 50, 100, 250, 500, 1000];

interface Props {
  category: CategoryConfig;
  from: Unit;
  to: Unit;
  lang?: Lang;
}

// 단위 컨버터 페이지용 본문 콘텐츠: 설명 + 변환표 + FAQ (AdSense용 실콘텐츠)
export default function UnitInfo({ category, from, to, lang = 'en' }: Props) {
  const tr = t[lang];
  const one = formatNumber(convert(1, from.key, to.key, category.key));

  return (
    <section className="mt-12 space-y-10">
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          {tr.unitInfoTitle(from.label, to.label)}
        </h2>
        <p className="text-gray-600 leading-relaxed">
          {tr.unitInfoBody(from.label, from.symbol, to.label, to.symbol, one)}
        </p>
      </div>

      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          {tr.tableTitle(from.label, to.label)}
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
              {TABLE_VALUES.map((v) => (
                <tr key={v} className="border-t border-gray-100">
                  <td className="px-4 py-2 text-gray-700">
                    {v.toLocaleString()} {from.symbol}
                  </td>
                  <td className="px-4 py-2 text-gray-700">
                    {formatNumber(convert(v, from.key, to.key, category.key))} {to.symbol}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">{tr.faqTitle}</h2>
        <div className="space-y-5">
          <Faq q={tr.faqConvertQ(from.label, to.label)} a={tr.faqConvertA(from.label, to.label)} />
          <Faq
            q={tr.faqOneQ(from.label.toLowerCase(), to.label.toLowerCase())}
            a={tr.faqOneA(from.symbol, one, to.symbol)}
          />
          <Faq q={tr.faqFreeQ} a={tr.faqFreeA} />
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
