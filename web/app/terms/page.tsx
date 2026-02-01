import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service — Asaan Arabic',
};

export default function TermsPage() {
  return (
    <article className="pt-32 pb-20 px-6 max-w-3xl mx-auto prose prose-neutral">
      <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
      <p className="text-text-secondary mb-4">
        Last updated: February 1, 2026
      </p>

      <h2 className="text-xl font-bold mt-8 mb-4">Acceptance of Terms</h2>
      <p className="text-text-secondary leading-relaxed mb-6">
        By downloading or using Asaan Arabic, you agree to these terms. If you
        do not agree, please do not use the app.
      </p>

      <h2 className="text-xl font-bold mt-8 mb-4">The Service</h2>
      <p className="text-text-secondary leading-relaxed mb-6">
        Asaan Arabic is a Quranic Arabic vocabulary learning app. We provide
        educational content to help users understand frequently used words in the
        Quran. The app is not a substitute for formal Islamic education or
        scholarly tafsir.
      </p>

      <h2 className="text-xl font-bold mt-8 mb-4">Your Account</h2>
      <p className="text-text-secondary leading-relaxed mb-6">
        You are responsible for maintaining the security of your account. You
        must provide accurate information when creating your account.
      </p>

      <h2 className="text-xl font-bold mt-8 mb-4">Content Accuracy</h2>
      <p className="text-text-secondary leading-relaxed mb-6">
        We strive for accuracy in all Quranic content, including word meanings,
        transliterations, and ayah references. If you notice an error, please
        report it to{' '}
        <a href="mailto:support@asaanarabic.com" className="text-primary">
          support@asaanarabic.com
        </a>{' '}
        and we will review and correct it promptly.
      </p>

      <h2 className="text-xl font-bold mt-8 mb-4">Free &amp; Premium Content</h2>
      <p className="text-text-secondary leading-relaxed mb-6">
        Module 1 is free and will remain free. Premium features (Module 2 and
        beyond) may be offered as paid subscriptions in the future. Pricing will
        be clearly communicated before any purchase.
      </p>

      <h2 className="text-xl font-bold mt-8 mb-4">Termination</h2>
      <p className="text-text-secondary leading-relaxed mb-6">
        You may delete your account at any time. We reserve the right to
        suspend accounts that violate these terms.
      </p>

      <h2 className="text-xl font-bold mt-8 mb-4">Contact</h2>
      <p className="text-text-secondary leading-relaxed">
        Questions? Email us at{' '}
        <a href="mailto:support@asaanarabic.com" className="text-primary">
          support@asaanarabic.com
        </a>
        .
      </p>
    </article>
  );
}
