const steps = [
  {
    number: '01',
    title: 'Learn 5 words daily',
    description:
      'Each lesson introduces 5 high-frequency Quranic words with meaning, pronunciation, and real ayah context.',
    icon: '📖',
  },
  {
    number: '02',
    title: 'Practice with the Quran',
    description:
      'Reinforce through activities — spot words in ayahs, quick-fire recall, and meaning matches. Not a test, just practice.',
    icon: '✨',
  },
  {
    number: '03',
    title: 'Track your vocabulary',
    description:
      'Watch your word count grow. Every word you learn appears in hundreds of ayahs. Your progress is real and permanent.',
    icon: '📊',
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          How it works
        </h2>
        <p className="text-text-secondary text-center text-lg mb-14 max-w-xl mx-auto">
          5 minutes a day. No prior Arabic knowledge needed.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div
              key={step.number}
              className="bg-surface rounded-2xl p-8 border border-border"
            >
              <span className="text-4xl mb-4 block">{step.icon}</span>
              <p className="text-primary font-bold text-sm mb-2">
                Step {step.number}
              </p>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-text-secondary leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
