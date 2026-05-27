import { NextResponse } from 'next/server';

export const revalidate = 3600; // 1시간 캐싱

export async function GET() {
  try {
    const res = await fetch('https://api.frankfurter.app/latest?from=USD', {
      next: { revalidate: 3600 },
    });
    const data = await res.json();
    // USD 자신도 포함
    const rates: Record<string, number> = { USD: 1, ...data.rates };
    return NextResponse.json({ rates, date: data.date }, {
      headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=300' },
    });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch rates' }, { status: 500 });
  }
}
