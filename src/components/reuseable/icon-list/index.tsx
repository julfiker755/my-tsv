import { cn } from '@/lib/utils';
import { ArrowLeft } from 'lucide-react';
import React from 'react';

interface BackBtnProps {
  onClick?: () => void;
  className?:string,
  iconStyle?:string
  
}

export const BackBtn= ({
  onClick,
  className,
  iconStyle
}:BackBtnProps) => (
  <button
    type="button"
    onClick={onClick}
    className={cn("flex items-center cursor-pointer gap-x-2 text-blacks font-medium text-base bg-transparent border-none outline-none", className)}
    aria-label={"Back"}
  >
    <span className={cn("bg-white rounded-full p-1 flex items-center justify-center",iconStyle)}>
      <ArrowLeft size={20} />
    </span>
    <span>{"Back"}</span>
  </button>
);


