'use client';

import { useState } from 'react';

interface SubscribeFormProps {
  inputBg?: string;
}

const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export default function SubscribeForm({ inputBg = 'bg-surface' }: SubscribeFormProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmed = email.trim();

    if (!trimmed) {
      setStatus('error');
      setMessage('Please enter your email.');
      return;
    }

    if (!isValidEmail(trimmed)) {
      setStatus('error');
      setMessage('That doesn\'t look like a valid email.');
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmed }),
      });
      const data = await res.json();

      if (!res.ok) {
        setStatus('error');
        setMessage(data.error || 'Something went wrong. Try again.');
        return;
      }

      setStatus('success');
      setMessage(
        data.message === 'Already subscribed'
          ? 'You\'re already on the list!'
          : 'You\'re in! We\'ll notify you at launch.'
      );
      setEmail('');
    } catch {
      setStatus('error');
      setMessage('Could not connect. Check your internet and try again.');
    }
  };

  if (status === 'success') {
    return <p className="text-primary font-medium">{message}</p>;
  }

  return (
    <div>
      <form className="flex gap-2" onSubmit={handleSubmit} noValidate>
        <input
          type="text"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === 'error') setStatus('idle');
          }}
          className={`flex-1 px-4 py-3 rounded-full border ${
            status === 'error' ? 'border-red-400' : 'border-border'
          } ${inputBg} text-text text-sm focus:outline-none focus:ring-2 focus:ring-primary`}
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="bg-primary text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-primary-dark transition-colors disabled:opacity-50"
        >
          {status === 'loading' ? 'Sending...' : 'Notify me'}
        </button>
      </form>
      {status === 'error' && (
        <p className="text-red-500 text-sm mt-2 text-left">{message}</p>
      )}
    </div>
  );
}
