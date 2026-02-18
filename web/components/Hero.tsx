'use client';

import SubscribeForm from './SubscribeForm';

const isPreLaunch = process.env.NEXT_PUBLIC_LAUNCH_MODE !== 'launched';

export default function Hero() {
  return (
    <section className="pt-32 pb-20 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <p className="text-accent font-medium text-sm tracking-wide uppercase mb-4">
          Samajh ke Parho
        </p>
        <h1 className="text-4xl md:text-6xl font-bold text-text leading-tight mb-6">
          Understand what you hear
          <br />
          <span className="text-primary">in salah and Taraweeh</span>
        </h1>
        <p className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto mb-10">
          Learn 5 Quranic words a day. In 60 lessons, you&apos;ll understand words that
          appear in thousands of ayahs. No prior Arabic knowledge needed.
        </p>

        {isPreLaunch ? (
          <div className="max-w-md mx-auto">
            <p className="text-text-tertiary text-sm mb-3">
              Coming soon to App Store &amp; Google Play
            </p>
            <SubscribeForm />
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#"
              className="inline-flex items-center justify-center bg-text text-white px-8 py-4 rounded-xl text-base font-medium hover:opacity-90 transition-opacity"
            >
              <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              App Store
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center bg-text text-white px-8 py-4 rounded-xl text-base font-medium hover:opacity-90 transition-opacity"
            >
              <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 2.302a1 1 0 010 1.38l-2.302 2.302L15.396 13l2.302-2.492zM5.864 2.658L16.8 9.09l-2.302 2.203L5.864 2.658z" />
              </svg>
              Google Play
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
