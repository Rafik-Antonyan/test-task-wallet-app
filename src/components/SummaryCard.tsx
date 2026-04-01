import type { ReactNode } from 'react';

type SummaryCardProps = {
  title: string;
  children: ReactNode;
  className?: string;
};

export function SummaryCard({ title, children, className }: SummaryCardProps) {
  return (
    <section className={`summary-card ${className ?? ''}`.trim()}>
      <p className="summary-title">{title}</p>
      {children}
    </section>
  );
}
