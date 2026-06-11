export type Lang = 'en' | 'es' | 'pt';

export const LANG_META = {
  en: { label: 'English', hreflang: 'en', prefix: '' },
  es: { label: 'Español', hreflang: 'es', prefix: '/es' },
  pt: { label: 'Português', hreflang: 'pt', prefix: '/pt' },
};

export const t = {
  en: {
    siteName: 'CalcConvert',
    siteDesc: 'Free Online Unit Converter',
    converter: 'Converter',
    convertXtoY: (x: string, y: string) => `${x} to ${y} Converter`,
    convertDesc: (x: string, xs: string, y: string, ys: string) =>
      `Convert ${x} (${xs}) to ${y} (${ys}) instantly.`,
    commonConversions: (x: string, y: string) => `Common ${x} to ${y} Conversions`,
    otherConversions: (cat: string) => `Other ${cat} Conversions`,
    relatedConversions: 'Related Conversions',
    tryConverter: (x: string, y: string) => `Open ${x} to ${y} Converter →`,
    tryConverterTitle: 'Try the Full Converter',
    xEquals: (val: string, unit: string) => `${val} ${unit} equals`,
    metaTitle: (x: string, xs: string, y: string) => `${x} to ${y} — ${xs} Converter | CalcConvert`,
    metaDesc: (x: string, y: string) =>
      `Free online ${x} to ${y} converter. Instantly convert with a simple calculator.`,
    valueMetaTitle: (val: string, xs: string, ys: string, result: string, yr: string) =>
      `${val} ${xs} to ${ys} = ${result} ${yr} | CalcConvert`,
    valueMetaDesc: (val: string, x: string, result: string, y: string) =>
      `${val} ${x} = ${result} ${y}. Free online converter.`,
    howMany: (y: string, val: string, x: string) => `How many ${y} is ${val} ${x}?`,
    answerText: (val: string, xs: string, result: string, ys: string) =>
      `${val} ${xs} = ${result} ${ys}`,
    updatedHourly: 'Updated daily',
    rateAsOf: (date: string) => `Rate as of ${date}`,
    currency: 'Currency',
    popularPairs: 'Popular Pairs',
    allCurrencies: 'All Currencies',
    liveRates: 'Live exchange rates updated daily.',
  },
  es: {
    siteName: 'CalcConvert',
    siteDesc: 'Conversor de Unidades Gratuito',
    converter: 'Conversor',
    convertXtoY: (x: string, y: string) => `Conversor de ${x} a ${y}`,
    convertDesc: (x: string, xs: string, y: string, ys: string) =>
      `Convierte ${x} (${xs}) a ${y} (${ys}) al instante.`,
    commonConversions: (x: string, y: string) => `Conversiones comunes de ${x} a ${y}`,
    otherConversions: (cat: string) => `Otras conversiones de ${cat}`,
    relatedConversions: 'Conversiones relacionadas',
    tryConverter: (x: string, y: string) => `Abrir conversor de ${x} a ${y} →`,
    tryConverterTitle: 'Usar el conversor completo',
    xEquals: (val: string, unit: string) => `${val} ${unit} equivale a`,
    metaTitle: (x: string, xs: string, y: string) => `${x} a ${y} — Conversor de ${xs} | CalcConvert`,
    metaDesc: (x: string, y: string) =>
      `Conversor gratuito de ${x} a ${y}. Convierte al instante con una calculadora simple.`,
    valueMetaTitle: (val: string, xs: string, ys: string, result: string, yr: string) =>
      `${val} ${xs} a ${ys} = ${result} ${yr} | CalcConvert`,
    valueMetaDesc: (val: string, x: string, result: string, y: string) =>
      `${val} ${x} = ${result} ${y}. Conversor gratuito en línea.`,
    howMany: (y: string, val: string, x: string) => `¿Cuántos ${y} son ${val} ${x}?`,
    answerText: (val: string, xs: string, result: string, ys: string) =>
      `${val} ${xs} = ${result} ${ys}`,
    updatedHourly: 'Actualizado a diario',
    rateAsOf: (date: string) => `Tasa al ${date}`,
    currency: 'Divisas',
    popularPairs: 'Pares populares',
    allCurrencies: 'Todas las divisas',
    liveRates: 'Tipos de cambio en vivo actualizados a diario.',
  },
  pt: {
    siteName: 'CalcConvert',
    siteDesc: 'Conversor de Unidades Gratuito',
    converter: 'Conversor',
    convertXtoY: (x: string, y: string) => `Conversor de ${x} para ${y}`,
    convertDesc: (x: string, xs: string, y: string, ys: string) =>
      `Converta ${x} (${xs}) para ${y} (${ys}) instantaneamente.`,
    commonConversions: (x: string, y: string) => `Conversões comuns de ${x} para ${y}`,
    otherConversions: (cat: string) => `Outras conversões de ${cat}`,
    relatedConversions: 'Conversões relacionadas',
    tryConverter: (x: string, y: string) => `Abrir conversor de ${x} para ${y} →`,
    tryConverterTitle: 'Usar o conversor completo',
    xEquals: (val: string, unit: string) => `${val} ${unit} equivale a`,
    metaTitle: (x: string, xs: string, y: string) => `${x} para ${y} — Conversor de ${xs} | CalcConvert`,
    metaDesc: (x: string, y: string) =>
      `Conversor gratuito de ${x} para ${y}. Converta instantaneamente com uma calculadora simples.`,
    valueMetaTitle: (val: string, xs: string, ys: string, result: string, yr: string) =>
      `${val} ${xs} para ${ys} = ${result} ${yr} | CalcConvert`,
    valueMetaDesc: (val: string, x: string, result: string, y: string) =>
      `${val} ${x} = ${result} ${y}. Conversor gratuito online.`,
    howMany: (y: string, val: string, x: string) => `Quantos ${y} são ${val} ${x}?`,
    answerText: (val: string, xs: string, result: string, ys: string) =>
      `${val} ${xs} = ${result} ${ys}`,
    updatedHourly: 'Atualizado diariamente',
    rateAsOf: (date: string) => `Taxa em ${date}`,
    currency: 'Moedas',
    popularPairs: 'Pares populares',
    allCurrencies: 'Todas as moedas',
    liveRates: 'Taxas de câmbio ao vivo atualizadas diariamente.',
  },
} as const;
