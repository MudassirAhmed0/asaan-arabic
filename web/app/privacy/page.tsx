import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — Asaan Arabic',
};

export default function PrivacyPage() {
  return (
    <article className="pt-32 pb-20 px-6 max-w-3xl mx-auto prose prose-neutral">
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
      <p className="text-text-secondary mb-4">
        Last updated: February 18, 2026
      </p>

      <h2 className="text-xl font-bold mt-8 mb-4">What We Collect</h2>
      <p className="text-text-secondary leading-relaxed mb-4">
        Asaan Arabic collects the minimum data needed to provide you with a
        personalized learning experience:
      </p>
      <ul className="list-disc pl-6 text-text-secondary space-y-2 mb-6">
        <li>
          <strong>Account information:</strong> when you sign in with Google, we
          receive your Google account email, display name, and profile picture
        </li>
        <li>
          <strong>Learning progress:</strong> lessons completed, words learned,
          streak data, and quiz results
        </li>
        <li>
          <strong>Device information:</strong> device type and push notification
          token (if you enable notifications). We use Firebase Cloud Messaging
          to deliver push notifications.
        </li>
      </ul>

      <h2 className="text-xl font-bold mt-8 mb-4">What We Don&apos;t Collect</h2>
      <ul className="list-disc pl-6 text-text-secondary space-y-2 mb-6">
        <li>We do not collect location data</li>
        <li>We do not collect contacts or phone numbers</li>
        <li>We do not sell or share your data with third parties</li>
        <li>We do not serve ads or share data with ad networks</li>
      </ul>

      <h2 className="text-xl font-bold mt-8 mb-4">How We Use Your Data</h2>
      <p className="text-text-secondary leading-relaxed mb-6">
        Your data is used solely to provide and improve your learning
        experience — tracking your progress, sending you reminders (if you opt
        in), and improving the app based on aggregate usage patterns.
      </p>

      <h2 className="text-xl font-bold mt-8 mb-4">Third-Party Services</h2>
      <ul className="list-disc pl-6 text-text-secondary space-y-2 mb-6">
        <li>
          <strong>Google Sign-In:</strong> used for authentication. We receive
          your email, name, and profile picture from your Google account.
        </li>
        <li>
          <strong>Firebase Cloud Messaging:</strong> used to send push
          notifications if you opt in.
        </li>
        <li>
          <strong>RevenueCat:</strong> if you subscribe to premium features,
          purchase data is processed by RevenueCat. See RevenueCat&apos;s privacy
          policy at{' '}
          <a
            href="https://www.revenuecat.com/privacy"
            className="text-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            revenuecat.com/privacy
          </a>{' '}
          for details.
        </li>
      </ul>

      <h2 className="text-xl font-bold mt-8 mb-4">Data Storage</h2>
      <p className="text-text-secondary leading-relaxed mb-6">
        Your data is stored securely on servers hosted by Railway. We use
        industry-standard encryption for data in transit and at rest.
      </p>

      <h2 className="text-xl font-bold mt-8 mb-4">Your Rights</h2>
      <p className="text-text-secondary leading-relaxed mb-6">
        You can delete your account and all associated data directly in the app
        under Profile &gt; Account &gt; Delete Account. Deletion is immediate
        and permanent. You can also contact us at{' '}
        <a href="mailto:support@asaanarabic.com" className="text-primary">
          support@asaanarabic.com
        </a>{' '}
        for any data-related requests.
      </p>

      <h2 className="text-xl font-bold mt-8 mb-4">Contact</h2>
      <p className="text-text-secondary leading-relaxed">
        Questions about this policy? Email us at{' '}
        <a href="mailto:support@asaanarabic.com" className="text-primary">
          support@asaanarabic.com
        </a>
        .
      </p>
    </article>
  );
}
