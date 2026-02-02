'use client';

import { useEffect, useRef } from 'react';
import { AlertTriangle } from 'lucide-react';
import Button from './Button';

export default function ConfirmDialog({
  open,
  onConfirm,
  onCancel,
  title = 'Are you sure?',
  message,
  confirmLabel = 'Confirm',
  variant = 'danger',
  loading = false,
}: {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title?: string;
  message?: string;
  confirmLabel?: string;
  variant?: 'danger' | 'default';
  loading?: boolean;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      onClose={onCancel}
      className="rounded-xl border-0 p-0 shadow-xl backdrop:bg-black/40 backdrop:backdrop-blur-sm max-w-sm w-full"
    >
      <div className="p-6">
        <div className="flex items-start gap-4">
          <div className={`rounded-full p-2 ${variant === 'danger' ? 'bg-red-50' : 'bg-gray-100'}`}>
            <AlertTriangle className={`h-5 w-5 ${variant === 'danger' ? 'text-red-500' : 'text-gray-500'}`} />
          </div>
          <div className="flex-1">
            <h3 className="text-base font-semibold text-gray-900">{title}</h3>
            {message && <p className="mt-1 text-sm text-gray-500">{message}</p>}
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <Button variant="secondary" size="sm" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            variant={variant === 'danger' ? 'danger' : 'primary'}
            size="sm"
            onClick={onConfirm}
            loading={loading}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </dialog>
  );
}
