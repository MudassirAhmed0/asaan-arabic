'use client';

import { ReactNode } from 'react';

interface Column<T> {
  header: string;
  accessorKey?: keyof T;
  cell?: (item: T) => ReactNode;
  className?: string;
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  keyExtractor: (item: T) => string | number;
  onRowClick?: (item: T) => void;
}

export default function Table<T>({ data, columns, keyExtractor, onRowClick }: TableProps<T>) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead>
          <tr className="border-b border-gray-100 bg-gray-50/50">
            {columns.map((column, i) => (
              <th
                key={i}
                className={`px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider ${column.className || ''}`}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50 bg-white">
          {data.map((item) => (
            <tr
              key={keyExtractor(item)}
              onClick={() => onRowClick?.(item)}
              className={`group transition-colors ${onRowClick ? 'cursor-pointer hover:bg-gray-50/80' : ''}`}
            >
              {columns.map((column, i) => (
                <td key={i} className={`px-6 py-4 whitespace-nowrap ${column.className || ''}`}>
                  {column.cell ? column.cell(item) : (item[column.accessorKey as keyof T] as ReactNode)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
