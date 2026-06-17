import React from 'react';

interface ButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({ text, onClick, className = '' }) => {
  const handleClick = onClick || (() => window.open('https://t.me/swensi17', '_blank'));

  return (
    <button onClick={handleClick} className={`inline-flex items-center gap-3 px-7 py-3 rounded-[100px] border border-[#fffce1] text-[#fffce1] text-[16px] tracking-[-0.01em] hover:bg-[#fffce1] hover:text-[#0e100f] transition-all duration-300 ${className}`}>
      {text}
      <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center">
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1 9L9 1M9 1H3M9 1V7"/></svg>
      </span>
    </button>
  );
};
