import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-200 bg-white">
      <div className="max-w-4xl mx-auto px-4 py-8 text-sm text-gray-500">
        <div className="flex flex-wrap gap-x-6 gap-y-2 mb-4">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <Link href="/currency" className="hover:text-blue-600">Currency</Link>
          <Link href="/about" className="hover:text-blue-600">About</Link>
          <Link href="/contact" className="hover:text-blue-600">Contact</Link>
          <Link href="/privacy" className="hover:text-blue-600">Privacy Policy</Link>
        </div>
        <p>
          © {new Date().getFullYear()} CalcConvert. Free online unit and currency converter.
          Currency rates from the European Central Bank.
        </p>
      </div>
    </footer>
  );
}
