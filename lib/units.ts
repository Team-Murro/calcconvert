export type Category = "length" | "weight" | "temperature" | "area" | "speed";

export interface Unit {
  key: string;
  label: string;
  symbol: string;
}

export interface Conversion {
  from: string;
  to: string;
  slug: string; // "cm-to-feet"
}

export interface CategoryConfig {
  key: Category;
  label: string;
  units: Unit[];
}

export const CATEGORIES: CategoryConfig[] = [
  {
    key: "length",
    label: "Length",
    units: [
      { key: "mm", label: "Millimeters", symbol: "mm" },
      { key: "cm", label: "Centimeters", symbol: "cm" },
      { key: "m", label: "Meters", symbol: "m" },
      { key: "km", label: "Kilometers", symbol: "km" },
      { key: "in", label: "Inches", symbol: "in" },
      { key: "ft", label: "Feet", symbol: "ft" },
      { key: "yd", label: "Yards", symbol: "yd" },
      { key: "mi", label: "Miles", symbol: "mi" },
    ],
  },
  {
    key: "weight",
    label: "Weight",
    units: [
      { key: "mg", label: "Milligrams", symbol: "mg" },
      { key: "g", label: "Grams", symbol: "g" },
      { key: "kg", label: "Kilograms", symbol: "kg" },
      { key: "t", label: "Metric Tons", symbol: "t" },
      { key: "oz", label: "Ounces", symbol: "oz" },
      { key: "lb", label: "Pounds", symbol: "lb" },
      { key: "st", label: "Stones", symbol: "st" },
    ],
  },
  {
    key: "temperature",
    label: "Temperature",
    units: [
      { key: "c", label: "Celsius", symbol: "°C" },
      { key: "f", label: "Fahrenheit", symbol: "°F" },
      { key: "k", label: "Kelvin", symbol: "K" },
    ],
  },
  {
    key: "area",
    label: "Area",
    units: [
      { key: "mm2", label: "Square Millimeters", symbol: "mm²" },
      { key: "cm2", label: "Square Centimeters", symbol: "cm²" },
      { key: "m2", label: "Square Meters", symbol: "m²" },
      { key: "km2", label: "Square Kilometers", symbol: "km²" },
      { key: "in2", label: "Square Inches", symbol: "in²" },
      { key: "ft2", label: "Square Feet", symbol: "ft²" },
      { key: "ac", label: "Acres", symbol: "ac" },
      { key: "ha", label: "Hectares", symbol: "ha" },
    ],
  },
  {
    key: "speed",
    label: "Speed",
    units: [
      { key: "mps", label: "Meters per Second", symbol: "m/s" },
      { key: "kph", label: "Kilometers per Hour", symbol: "km/h" },
      { key: "mph", label: "Miles per Hour", symbol: "mph" },
      { key: "knot", label: "Knots", symbol: "kn" },
    ],
  },
];

// 기준값으로 변환하는 계수 (to base unit)
const LENGTH_TO_M: Record<string, number> = {
  mm: 0.001, cm: 0.01, m: 1, km: 1000,
  in: 0.0254, ft: 0.3048, yd: 0.9144, mi: 1609.344,
};

const WEIGHT_TO_KG: Record<string, number> = {
  mg: 0.000001, g: 0.001, kg: 1, t: 1000,
  oz: 0.0283495, lb: 0.453592, st: 6.35029,
};

const AREA_TO_M2: Record<string, number> = {
  mm2: 0.000001, cm2: 0.0001, m2: 1, km2: 1000000,
  in2: 0.00064516, ft2: 0.092903, ac: 4046.86, ha: 10000,
};

const SPEED_TO_MPS: Record<string, number> = {
  mps: 1, kph: 0.277778, mph: 0.44704, knot: 0.514444,
};

export function convert(value: number, from: string, to: string, category: Category): number {
  if (from === to) return value;

  if (category === "temperature") {
    // Celsius 기준으로 변환
    let celsius: number;
    if (from === "c") celsius = value;
    else if (from === "f") celsius = (value - 32) * 5 / 9;
    else celsius = value - 273.15; // kelvin

    if (to === "c") return celsius;
    if (to === "f") return celsius * 9 / 5 + 32;
    return celsius + 273.15; // kelvin
  }

  const tables: Record<Category, Record<string, number>> = {
    length: LENGTH_TO_M,
    weight: WEIGHT_TO_KG,
    area: AREA_TO_M2,
    speed: SPEED_TO_MPS,
    temperature: {},
  };

  const table = tables[category];
  const base = value * table[from];
  return base / table[to];
}

export function formatNumber(n: number): string {
  if (Math.abs(n) < 0.0001 && n !== 0) return n.toExponential(4);
  if (Math.abs(n) >= 1e9) return n.toExponential(4);
  const decimals = Math.abs(n) >= 100 ? 4 : Math.abs(n) >= 1 ? 6 : 8;
  return parseFloat(n.toPrecision(decimals)).toLocaleString("en-US", { maximumSignificantDigits: decimals });
}

export function getConversions(category: CategoryConfig): Conversion[] {
  const conversions: Conversion[] = [];
  for (const from of category.units) {
    for (const to of category.units) {
      if (from.key === to.key) continue;
      conversions.push({
        from: from.key,
        to: to.key,
        slug: `${from.key}-to-${to.key}`,
      });
    }
  }
  return conversions;
}

export function getCategoryByKey(key: string): CategoryConfig | undefined {
  return CATEGORIES.find((c) => c.key === key);
}

export function getUnitByKey(category: CategoryConfig, key: string): Unit | undefined {
  return category.units.find((u) => u.key === key);
}

// slug "cm-to-feet" → { from: "cm", to: "ft" }
export function parseConversionSlug(slug: string, category: CategoryConfig): { from: Unit; to: Unit } | null {
  const match = slug.match(/^(.+)-to-(.+)$/);
  if (!match) return null;
  const from = getUnitByKey(category, match[1]);
  const to = getUnitByKey(category, match[2]);
  if (!from || !to) return null;
  return { from, to };
}

// 자주 검색되는 값 (롱테일 페이지 생성용)
export const POPULAR_VALUES: Record<Category, number[]> = {
  length: [1, 5, 10, 15, 20, 25, 30, 50, 100, 150, 175, 180, 200, 500, 1000],
  weight: [1, 5, 10, 20, 50, 60, 70, 80, 90, 100, 150, 200, 500, 1000],
  temperature: [-40, -20, -10, 0, 10, 20, 25, 30, 37, 40, 50, 100, 200],
  area: [1, 5, 10, 20, 50, 100, 200, 500, 1000],
  speed: [1, 10, 30, 50, 60, 80, 100, 120, 150, 200, 300],
};
