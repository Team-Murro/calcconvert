export const metadata = {
  title: 'Privacy Policy | CalcConvert',
  description: 'Privacy Policy for CalcConvert — Free Online Unit Converter.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <a href="/" className="text-blue-600 font-bold text-xl">CalcConvert</a>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
        <p className="text-gray-400 text-sm mb-10">Last updated: May 27, 2025</p>

        <div className="prose prose-gray max-w-none space-y-8 text-gray-700 leading-relaxed">

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">1. Overview</h2>
            <p>
              CalcConvert (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) operates the website calcconvert.net (the &quot;Service&quot;).
              This page informs you of our policies regarding the collection, use, and disclosure
              of personal information when you use our Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">2. Information We Collect</h2>
            <p>
              CalcConvert is a free unit conversion tool. We do not require you to create an account
              or provide any personal information to use our Service.
            </p>
            <p className="mt-3">
              We may collect non-personally identifiable information automatically when you visit our
              website, including:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Browser type and version</li>
              <li>Pages visited and time spent</li>
              <li>Referring URL</li>
              <li>General geographic location (country/region)</li>
            </ul>
            <p className="mt-3">
              This information is collected via third-party analytics and advertising services
              (see Section 4).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">3. Cookies</h2>
            <p>
              We use cookies and similar tracking technologies to track activity on our Service.
              Cookies are small data files stored on your device.
            </p>
            <p className="mt-3">
              You can instruct your browser to refuse all cookies or to indicate when a cookie is
              being sent. However, if you do not accept cookies, some portions of our Service may
              not function properly.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">4. Third-Party Services</h2>
            <p>We use the following third-party services that may collect information:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>
                <strong>Google AdSense</strong> — displays advertisements. Google may use cookies
                to serve ads based on your prior visits to our website or other websites.
                You may opt out of personalized advertising by visiting{' '}
                <a href="https://www.google.com/settings/ads" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                  Google Ads Settings
                </a>.
              </li>
              <li>
                <strong>Google Analytics</strong> — tracks and reports website traffic anonymously.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">5. Data Retention</h2>
            <p>
              We do not store any personal data on our servers. Any data collected by third-party
              services is governed by their respective privacy policies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">6. Children&apos;s Privacy</h2>
            <p>
              Our Service does not address anyone under the age of 13. We do not knowingly collect
              personally identifiable information from children under 13.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">7. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes
              by posting the new Privacy Policy on this page with an updated date.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">8. Contact</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:{' '}
              <a href="mailto:saroo815@gmail.com" className="text-blue-600 hover:underline">
                saroo815@gmail.com
              </a>
            </p>
          </section>

        </div>
      </main>

      <footer className="border-t border-gray-200 mt-16">
        <div className="max-w-4xl mx-auto px-4 py-6 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} CalcConvert. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
