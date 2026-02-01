import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-border">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <span className="font-bold text-primary">Asaan Arabic</span>
          <span className="text-text-tertiary text-sm">
            &copy; {new Date().getFullYear()}
          </span>
        </div>
        <div className="flex gap-6 text-sm text-text-secondary">
          <Link href="/privacy" className="hover:text-primary transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-primary transition-colors">
            Terms of Service
          </Link>
          <Link href="/support" className="hover:text-primary transition-colors">
            Support
          </Link>
        </div>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-text-secondary hover:text-primary transition-colors text-sm"
        >
          Instagram
        </a>
      </div>
    </footer>
  );
}
