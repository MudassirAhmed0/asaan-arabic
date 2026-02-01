'use client';

const isPreLaunch = process.env.NEXT_PUBLIC_LAUNCH_MODE !== 'launched';

export default function DownloadCTA() {
  return (
    <section id="download" className="py-20 px-6 bg-surface">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Start your journey today
        </h2>
        <p className="text-text-secondary text-lg mb-10">
          Free forever. No ads, ever. Every lesson, every word — yours to keep.
        </p>

        {isPreLaunch ? (
          <div className="max-w-md mx-auto">
            <p className="text-text-tertiary text-sm mb-3">
              Be the first to know when we launch
            </p>
            <form
              className="flex gap-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-full border border-border bg-bg text-text text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                className="bg-primary text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-primary-dark transition-colors"
              >
                Notify me
              </button>
            </form>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#"
              className="inline-flex items-center justify-center bg-text text-white px-8 py-4 rounded-xl text-base font-medium hover:opacity-90 transition-opacity"
            >
              Download for iOS
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center bg-text text-white px-8 py-4 rounded-xl text-base font-medium hover:opacity-90 transition-opacity"
            >
              Download for Android
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
