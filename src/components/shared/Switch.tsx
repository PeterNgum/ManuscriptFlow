import React from 'react';

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
}

export function Switch({ checked, onChange, label, disabled = false }: SwitchProps) {
  return (
    <label className="inline-flex items-center cursor-pointer">
      {label && (
        <span className="mr-3 text-sm font-medium text-gray-900">{label}</span>
      )}
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
        />
        <div className={`
          w-11 h-6 bg-gray-200 rounded-full peer 
          peer-checked:after:translate-x-full peer-checked:bg-indigo-600
          after:content-[''] after:absolute after:top-0.5 after:left-[2px] 
          after:bg-white after:rounded-full after:h-5 after:w-5 
          after:transition-all peer-disabled:opacity-50
        `}></div>
      </div>
    </label>
  );
}