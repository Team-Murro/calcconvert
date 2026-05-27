export interface Currency {
  code: string;
  name: string;
  symbol: string;
}

export const CURRENCIES: Currency[] = [
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
  { code: 'KRW', name: 'South Korean Won', symbol: '₩' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'Fr' },
  { code: 'HKD', name: 'Hong Kong Dollar', symbol: 'HK$' },
  { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$' },
  { code: 'MXN', name: 'Mexican Peso', symbol: 'MX$' },
  { code: 'BRL', name: 'Brazilian Real', symbol: 'R$' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
  { code: 'TRY', name: 'Turkish Lira', symbol: '₺' },
  { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ' },
  { code: 'THB', name: 'Thai Baht', symbol: '฿' },
  { code: 'MYR', name: 'Malaysian Ringgit', symbol: 'RM' },
  { code: 'IDR', name: 'Indonesian Rupiah', symbol: 'Rp' },
  { code: 'PHP', name: 'Philippine Peso', symbol: '₱' },
  { code: 'SEK', name: 'Swedish Krona', symbol: 'kr' },
  { code: 'NOK', name: 'Norwegian Krone', symbol: 'kr' },
  { code: 'NZD', name: 'New Zealand Dollar', symbol: 'NZ$' },
  { code: 'ZAR', name: 'South African Rand', symbol: 'R' },
];

export const CURRENCY_MAP = Object.fromEntries(CURRENCIES.map((c) => [c.code, c]));

export const POPULAR_CURRENCY_VALUES = [1, 5, 10, 50, 100, 500, 1000, 5000, 10000];

export interface CurrencyConversion {
  from: string;
  to: string;
  slug: string;
}

export function getCurrencyConversions(): CurrencyConversion[] {
  const result: CurrencyConversion[] = [];
  for (const from of CURRENCIES) {
    for (const to of CURRENCIES) {
      if (from.code === to.code) continue;
      result.push({
        from: from.code,
        to: to.code,
        slug: `${from.code.toLowerCase()}-to-${to.code.toLowerCase()}`,
      });
    }
  }
  return result;
}

// slug "usd-to-krw" → { from: "USD", to: "KRW" }
export function parseCurrencySlug(slug: string): { from: Currency; to: Currency } | null {
  const match = slug.match(/^([a-z]{3})-to-([a-z]{3})$/);
  if (!match) return null;
  const from = CURRENCY_MAP[match[1].toUpperCase()];
  const to = CURRENCY_MAP[match[2].toUpperCase()];
  if (!from || !to) return null;
  return { from, to };
}

export function formatCurrency(amount: number, code: string): string {
  if (Math.abs(amount) >= 1000000) return amount.toLocaleString('en-US', { maximumFractionDigits: 0 });
  if (Math.abs(amount) >= 1) return amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 4 });
  return amount.toLocaleString('en-US', { minimumFractionDigits: 4, maximumFractionDigits: 6 });
}
