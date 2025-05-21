
import React from 'react';
import { cn } from '@/lib/utils';

interface SectionContainerProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

const SectionContainer: React.FC<SectionContainerProps> = ({ 
  children, 
  className,
  id
}) => {
  return (
    <section id={id} className={cn('py-16 md:py-24', className)}>
      <div className="container mx-auto px-4">
        {children}
      </div>
    </section>
  );
};

export const SectionTitle: React.FC<{
  title: string;
  subtitle?: string;
  className?: string;
}> = ({ title, subtitle, className }) => {
  return (
    <div className={cn('text-center mb-12', className)}>
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black">
        <span className="border-b-2 border-black pb-1">{title}</span>
      </h2>
      {subtitle && (
        <p className="text-gray-600 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionContainer;
