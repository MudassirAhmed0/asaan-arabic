import { ReactNode } from 'react';

export default function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      {icon && <div className="text-gray-300 mb-4">{icon}</div>}
      <h3 className="text-sm font-semibold text-gray-900 mb-1">{title}</h3>
      {description && <p className="text-sm text-gray-500 mb-4 text-center max-w-sm">{description}</p>}
      {action}
    </div>
  );
}
