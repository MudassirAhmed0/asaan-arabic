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
              Yes. All word learning content is completely free forever with no
              ads. Optional premium features are available for those who want
              more depth.
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-2">
              What premium features are available?
            </h3>
            <p className="text-text-secondary">
              Premium unlocks Arabic Insights (grammar patterns), extended
              Practice mode, and Weekly Reviews. All word learning is free
              forever. Premium is available at PKR 799/month, PKR 4,999/year,
              or PKR 7,999 lifetime.
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
              Go to Profile &gt; Account &gt; Delete Account in the app. This
              permanently deletes your account and all data.
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-2">What data do you collect?</h3>
            <p className="text-text-secondary">
              We collect your Google account email and name for authentication,
              and your learning progress. We never sell your data or show ads.
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
