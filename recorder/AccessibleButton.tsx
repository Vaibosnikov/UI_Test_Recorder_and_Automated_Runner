import React from 'react';

interface AccessibleButtonProps {
  label: string;
  onClick: () => void;
}

export default function AccessibleButton({ label, onClick }: AccessibleButtonProps) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="px-4 py-2 bg-blue-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
    >
      {label}
    </button>
  );
}
