import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact CalcConvert',
  description:
    'Get in touch with CalcConvert. Report an error, request a new unit or currency, or send general feedback.',
  alternates: { canonical: 'https://calcconvert.net/contact' },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-3">
          <Link href="/" className="text-blue-600 font-bold text-xl">CalcConvert</Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-800">Contact</span>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Contact Us</h1>

        <div className="space-y-6 text-gray-700 leading-relaxed">
          <p>
            We&apos;re always happy to hear from people who use CalcConvert. Whether you&apos;ve
            spotted an incorrect result, want a new unit or currency added, or just have a suggestion
            to make the tools better, please get in touch.
          </p>

          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Email</h2>
            <p className="text-gray-700">
              <a href="mailto:saroo815@gmail.com" className="text-blue-600 hover:underline">
                saroo815@gmail.com
              </a>
            </p>
            <p className="text-sm text-gray-500 mt-2">
              We read every message and typically respond within a few days.
            </p>
          </div>

          <h2 className="text-xl font-bold text-gray-900">Before you write</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>Reporting a wrong result?</strong> Let us know the exact conversion (for
              example, &ldquo;100 USD to EUR&rdquo;) so we can reproduce it.
            </li>
            <li>
              <strong>Requesting a unit or currency?</strong> Tell us which one and where you&apos;d
              expect to find it.
            </li>
            <li>
              For questions about how we handle data, see our{' '}
              <Link href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>.
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}
