import Link from 'next/link';
import { ReactNode } from 'react';

export default function PageHeader({
  title,
  breadcrumbs,
  actions,
}: {
  title: string;
  breadcrumbs?: { label: string; href?: string }[];
  actions?: ReactNode;
}) {
  return (
    <div className="mb-8">
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
          {breadcrumbs.map((crumb, i) => (
            <div key={i} className="flex items-center gap-2">
              {i > 0 && <span className="text-gray-300">/</span>}
              {crumb.href ? (
                <Link 
                  href={crumb.href} 
                  className="hover:text-teal-600 hover:underline hover:decoration-teal-600/30 transition-all font-medium"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-gray-900 font-semibold">{crumb.label}</span>
              )}
            </div>
          ))}
        </nav>
      )}
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
    </div>
  );
}
