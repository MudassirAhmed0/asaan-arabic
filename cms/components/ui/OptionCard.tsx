'use client';

import { Check } from 'lucide-react';

export interface OptionCardProps {
  index: number;
  value: string;
  selected: boolean;
  onChange: (value: string) => void;
  onSelect: () => void;
  placeholder?: string;
}

export default function OptionCard({ index, value, selected, onChange, onSelect, placeholder }: OptionCardProps) {
  return (
    <div
      onClick={onSelect}
      className={`relative flex items-center gap-3 p-3 border rounded-xl transition-all cursor-pointer group ${
        selected
          ? 'border-teal-500 bg-teal-50/50 ring-1 ring-teal-500 shadow-[0_2px_8px_rgba(20,184,166,0.15)]'
          : 'border-gray-200 bg-white hover:border-teal-300 hover:shadow-md'
      }`}
    >
      <div className={`
        flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold transition-colors shrink-0
        ${selected ? 'bg-teal-500 text-white' : 'bg-gray-100 text-gray-500 group-hover:bg-teal-100 group-hover:text-teal-600'}
      `}>
        {String.fromCharCode(65 + index)}
      </div>

      <input
        value={value}
        onChange={(e) => { e.stopPropagation(); onChange(e.target.value); }}
        onClick={(e) => e.stopPropagation()}
        className="flex-1 bg-transparent border-none text-sm focus:ring-0 p-0 placeholder:text-gray-400 font-medium text-gray-900"
        placeholder={placeholder || `Option ${index + 1}`}
      />

      {selected && (
        <div className="text-teal-600 shrink-0">
          <Check className="h-4 w-4" strokeWidth={3} />
        </div>
      )}
    </div>
  );
}
