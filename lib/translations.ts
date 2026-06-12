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
    // --- content sections ---
    unitInfoTitle: (x: string, y: string) => `Understanding ${x} to ${y}`,
    unitInfoBody: (x: string, xs: string, y: string, ys: string, one: string) =>
      `${x} and ${y} are units that measure the same physical quantity, so any value in ${x.toLowerCase()} can be expressed in ${y.toLowerCase()}. For reference, 1 ${xs} equals ${one} ${ys}. Type any number into the calculator above to convert it instantly, or use the table below for the most commonly searched ${x.toLowerCase()}-to-${y.toLowerCase()} values.`,
    tableTitle: (x: string, y: string) => `${x} to ${y} conversion table`,
    colFrom: 'Value',
    colTo: 'Result',
    faqTitle: 'Frequently asked questions',
    faqConvertQ: (x: string, y: string) => `How do I convert ${x} to ${y}?`,
    faqConvertA: (x: string, y: string) =>
      `Enter the ${x.toLowerCase()} value in the converter above and the equivalent in ${y.toLowerCase()} appears instantly. You can also read off the most common values from the conversion table on this page.`,
    faqOneQ: (xl: string, yl: string) => `How many ${yl} are in one ${xl}?`,
    faqOneA: (xs: string, one: string, ys: string) => `1 ${xs} is equal to ${one} ${ys}.`,
    faqFreeQ: 'Is this converter free to use?',
    faqFreeA:
      'Yes. CalcConvert is completely free, runs in your browser, and requires no sign-up or installation.',
    curInfoTitle: (xc: string, yc: string) => `Converting ${xc} to ${yc}`,
    curInfoBody: (xc: string, yc: string, rate: string) =>
      `The ${xc}/${yc} exchange rate tells you how many ${yc} you receive for one ${xc}. Currently, 1 ${xc} is worth about ${rate} ${yc}. Exchange rates move continuously with the global currency market, so the converter above always uses the latest available rate. Use the table below for quick reference on common amounts.`,
    curFaqHowMuchQ: (xc: string, yc: string) => `How much is 100 ${xc} in ${yc}?`,
    curFaqHowMuchA: (r: string, xc: string, yc: string) =>
      `100 ${xc} is approximately ${r} ${yc} at the current exchange rate. Enter any amount above for an exact, up-to-date figure.`,
    curFaqUpdateQ: 'How often are the exchange rates updated?',
    curFaqUpdateA:
      'Rates are sourced from the European Central Bank (ECB), which publishes official reference rates once every business day.',
    curFaqAccurateQ: (xc: string, yc: string) => `Is the ${xc} to ${yc} rate accurate?`,
    curFaqAccurateA:
      'We display official ECB reference rates. Banks, cards, and money-transfer services may apply slightly different rates and fees for actual transactions.',
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
    // --- content sections ---
    unitInfoTitle: (x: string, y: string) => `Entender ${x} a ${y}`,
    unitInfoBody: (x: string, xs: string, y: string, ys: string, one: string) =>
      `${x} y ${y} son unidades que miden la misma magnitud física, por lo que cualquier valor en ${x.toLowerCase()} puede expresarse en ${y.toLowerCase()}. Como referencia, 1 ${xs} equivale a ${one} ${ys}. Escribe cualquier número en la calculadora de arriba para convertirlo al instante, o usa la tabla siguiente con los valores de ${x.toLowerCase()} a ${y.toLowerCase()} más buscados.`,
    tableTitle: (x: string, y: string) => `Tabla de conversión de ${x} a ${y}`,
    colFrom: 'Valor',
    colTo: 'Resultado',
    faqTitle: 'Preguntas frecuentes',
    faqConvertQ: (x: string, y: string) => `¿Cómo convierto ${x} a ${y}?`,
    faqConvertA: (x: string, y: string) =>
      `Introduce el valor en ${x.toLowerCase()} en el conversor de arriba y el equivalente en ${y.toLowerCase()} aparece al instante. También puedes consultar los valores más comunes en la tabla de conversión de esta página.`,
    faqOneQ: (xl: string, yl: string) => `¿Cuántos ${yl} hay en un ${xl}?`,
    faqOneA: (xs: string, one: string, ys: string) => `1 ${xs} equivale a ${one} ${ys}.`,
    faqFreeQ: '¿El conversor es gratuito?',
    faqFreeA:
      'Sí. CalcConvert es completamente gratis, funciona en tu navegador y no requiere registro ni instalación.',
    curInfoTitle: (xc: string, yc: string) => `Convertir ${xc} a ${yc}`,
    curInfoBody: (xc: string, yc: string, rate: string) =>
      `El tipo de cambio ${xc}/${yc} indica cuántos ${yc} recibes por un ${xc}. Actualmente, 1 ${xc} vale aproximadamente ${rate} ${yc}. Los tipos de cambio varían continuamente con el mercado global de divisas, por lo que el conversor de arriba siempre usa el último tipo disponible. Usa la tabla siguiente como referencia rápida.`,
    curFaqHowMuchQ: (xc: string, yc: string) => `¿Cuánto son 100 ${xc} en ${yc}?`,
    curFaqHowMuchA: (r: string, xc: string, yc: string) =>
      `100 ${xc} son aproximadamente ${r} ${yc} al tipo de cambio actual. Introduce cualquier cantidad arriba para obtener una cifra exacta y actualizada.`,
    curFaqUpdateQ: '¿Con qué frecuencia se actualizan los tipos de cambio?',
    curFaqUpdateA:
      'Los tipos provienen del Banco Central Europeo (BCE), que publica tipos de referencia oficiales una vez por día hábil.',
    curFaqAccurateQ: (xc: string, yc: string) => `¿Es preciso el tipo de ${xc} a ${yc}?`,
    curFaqAccurateA:
      'Mostramos los tipos de referencia oficiales del BCE. Los bancos, tarjetas y servicios de transferencia pueden aplicar tipos y comisiones algo distintos en las transacciones reales.',
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
    // --- content sections ---
    unitInfoTitle: (x: string, y: string) => `Entender ${x} para ${y}`,
    unitInfoBody: (x: string, xs: string, y: string, ys: string, one: string) =>
      `${x} e ${y} são unidades que medem a mesma grandeza física, portanto qualquer valor em ${x.toLowerCase()} pode ser expresso em ${y.toLowerCase()}. Para referência, 1 ${xs} equivale a ${one} ${ys}. Digite qualquer número na calculadora acima para converter na hora, ou use a tabela abaixo com os valores de ${x.toLowerCase()} para ${y.toLowerCase()} mais procurados.`,
    tableTitle: (x: string, y: string) => `Tabela de conversão de ${x} para ${y}`,
    colFrom: 'Valor',
    colTo: 'Resultado',
    faqTitle: 'Perguntas frequentes',
    faqConvertQ: (x: string, y: string) => `Como converto ${x} para ${y}?`,
    faqConvertA: (x: string, y: string) =>
      `Digite o valor em ${x.toLowerCase()} no conversor acima e o equivalente em ${y.toLowerCase()} aparece na hora. Você também pode consultar os valores mais comuns na tabela de conversão desta página.`,
    faqOneQ: (xl: string, yl: string) => `Quantos ${yl} há em um ${xl}?`,
    faqOneA: (xs: string, one: string, ys: string) => `1 ${xs} equivale a ${one} ${ys}.`,
    faqFreeQ: 'O conversor é gratuito?',
    faqFreeA:
      'Sim. O CalcConvert é totalmente gratuito, funciona no seu navegador e não exige cadastro nem instalação.',
    curInfoTitle: (xc: string, yc: string) => `Converter ${xc} para ${yc}`,
    curInfoBody: (xc: string, yc: string, rate: string) =>
      `A taxa de câmbio ${xc}/${yc} indica quantos ${yc} você recebe por um ${xc}. Atualmente, 1 ${xc} vale cerca de ${rate} ${yc}. As taxas de câmbio mudam continuamente com o mercado global de moedas, por isso o conversor acima sempre usa a taxa mais recente disponível. Use a tabela abaixo como referência rápida.`,
    curFaqHowMuchQ: (xc: string, yc: string) => `Quanto é 100 ${xc} em ${yc}?`,
    curFaqHowMuchA: (r: string, xc: string, yc: string) =>
      `100 ${xc} equivale a aproximadamente ${r} ${yc} pela taxa de câmbio atual. Digite qualquer valor acima para obter um número exato e atualizado.`,
    curFaqUpdateQ: 'Com que frequência as taxas de câmbio são atualizadas?',
    curFaqUpdateA:
      'As taxas vêm do Banco Central Europeu (BCE), que publica taxas de referência oficiais uma vez por dia útil.',
    curFaqAccurateQ: (xc: string, yc: string) => `A taxa de ${xc} para ${yc} é precisa?`,
    curFaqAccurateA:
      'Exibimos as taxas de referência oficiais do BCE. Bancos, cartões e serviços de transferência podem aplicar taxas e tarifas ligeiramente diferentes nas transações reais.',
  },
} as const;
