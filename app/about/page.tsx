import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About CalcConvert',
  description:
    'CalcConvert is a free online unit and currency converter. Learn about our mission, data sources, and how the converters work.',
  alternates: { canonical: 'https://calcconvert.net/about' },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-3">
          <Link href="/" className="text-blue-600 font-bold text-xl">CalcConvert</Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-800">About</span>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-10 prose-gray">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">About CalcConvert</h1>

        <div className="space-y-6 text-gray-700 leading-relaxed">
          <p>
            <strong>CalcConvert</strong> is a free online toolkit for converting between units of
            measurement and world currencies. It was built to do one thing well: give you a fast,
            accurate answer to everyday conversion questions — without ads getting in the way of the
            tool, pop-ups, or a sign-up wall.
          </p>

          <h2 className="text-xl font-bold text-gray-900">What you can do here</h2>
          <p>
            CalcConvert covers five common measurement categories — <strong>length, weight,
            temperature, area, and speed</strong> — and live <strong>currency conversion</strong> for
            major world currencies. Every converter works instantly in your browser as you type, and
            each page includes a reference conversion table and answers to common questions about that
            specific conversion.
          </p>

          <h2 className="text-xl font-bold text-gray-900">Where our data comes from</h2>
          <p>
            Unit conversions are based on standard, internationally recognized conversion factors
            (for example, 1 inch = 2.54 centimeters). Currency rates are sourced from the{' '}
            <strong>European Central Bank (ECB)</strong> reference rates, which are published once per
            business day, and are refreshed automatically. For real financial transactions, your bank
            or payment provider may apply a slightly different rate, so we always recommend confirming
            with them before transferring money.
          </p>

          <h2 className="text-xl font-bold text-gray-900">Free and privacy-friendly</h2>
          <p>
            CalcConvert is completely free to use and requires no account. We don&apos;t ask for
            personal information to use the converters. You can read more about how we handle data on
            our <Link href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>{' '}
            page.
          </p>

          <h2 className="text-xl font-bold text-gray-900">Get in touch</h2>
          <p>
            Found an error, or want a unit or currency added? We&apos;d love to hear from you — see
            the <Link href="/contact" className="text-blue-600 hover:underline">Contact</Link> page.
          </p>
        </div>
      </main>
    </div>
  );
}
