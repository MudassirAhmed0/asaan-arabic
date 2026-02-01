const stats = [
  { value: '50', label: 'Quranic words at launch' },
  { value: '10,000+', label: 'ayahs these words appear in' },
  { value: '5 min', label: 'per lesson' },
  { value: '40+', label: 'words you already know from Urdu' },
];

export default function Stats() {
  return (
    <section className="py-20 px-6 bg-primary">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-4">
          Small effort. Massive impact.
        </h2>
        <p className="text-white/70 text-center text-lg mb-14 max-w-xl mx-auto">
          These aren&apos;t random words. They&apos;re the most frequently used words in
          the Quran — chosen so every word you learn unlocks real understanding.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-12">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-4xl md:text-5xl font-bold text-accent mb-2">
                {stat.value}
              </p>
              <p className="text-white/80 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
