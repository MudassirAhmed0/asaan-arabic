import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Support — Asaan Arabic',
};

export default function SupportPage() {
  return (
    <article className="pt-32 pb-20 px-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Support</h1>
      <p className="text-text-secondary text-lg leading-relaxed mb-8">
        Have a question, found a bug, or noticed a content error? We&apos;re here to
        help.
      </p>

      <div className="bg-surface rounded-2xl border border-border p-8 mb-8">
        <h2 className="text-xl font-bold mb-4">Email Us</h2>
        <p className="text-text-secondary mb-4">
          The fastest way to reach us. We respond within 24 hours.
        </p>
        <a
          href="mailto:support@asaanarabic.com"
          className="text-primary font-medium text-lg hover:underline"
        >
          support@asaanarabic.com
        </a>
      </div>

      <div className="bg-surface rounded-2xl border border-border p-8 mb-8">
        <h2 className="text-xl font-bold mb-4">Report a Content Error</h2>
        <p className="text-text-secondary">
          Quranic accuracy is our top priority. If you notice an incorrect word
          meaning, translation, or ayah reference, please email us with the
          lesson number and word. We take every report seriously and will review
          it with our content team.
        </p>
      </div>

      <div className="bg-surface rounded-2xl border border-border p-8">
        <h2 className="text-xl font-bold mb-4">FAQs</h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-bold mb-2">Is the app free?</h3>
            <p className="text-text-secondary">
              Yes. Module 1 (10 lessons, 50 words) is completely free with no
              ads. Premium content may be offered in the future.
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-2">
              Do I need to know Arabic to start?
            </h3>
            <p className="text-text-secondary">
              Not at all. Asaan Arabic is designed for complete beginners. Many
              of the first words are ones you already know from Urdu.
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-2">How do I delete my account?</h3>
            <p className="text-text-secondary">
              Email{' '}
              <a
                href="mailto:support@asaanarabic.com"
                className="text-primary"
              >
                support@asaanarabic.com
              </a>{' '}
              with your request and we&apos;ll process it within 48 hours.
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
