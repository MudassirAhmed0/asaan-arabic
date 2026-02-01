import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-bg/80 backdrop-blur-md border-b border-border">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/app-icon.png" alt="Asaan Arabic" width={32} height={32} className="rounded-lg" />
          <span className="text-xl font-bold text-primary">Asaan Arabic</span>
        </Link>
        <a
          href="#download"
          className="bg-primary text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-primary-dark transition-colors"
        >
          Get Early Access
        </a>
      </div>
    </header>
  );
}
