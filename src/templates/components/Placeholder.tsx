import type { ReactNode } from "react";

interface PlaceholderProps {
  label: string;
  height?: string;
  className?: string;
}

/**
 * Clearly-marked preview placeholder. Real product photos must replace these
 * before launch (see DESIGN.md image rules and media manifest).
 */
export function Placeholder({ label, height = "h-56", className = "" }: PlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={`Preview placeholder: ${label}`}
      className={`flex ${height} w-full flex-col items-center justify-center gap-1 rounded-card border border-line bg-canvas text-center ${className}`}
    >
      <span className="text-xs font-semibold uppercase tracking-widest text-ink-muted">
        Preview placeholder
      </span>
      <span className="px-4 text-sm text-ink-muted">{label}</span>
      <span className="px-4 text-xs text-ink-muted">Real project photo to be added</span>
    </div>
  );
}

export function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-2xl font-bold text-brand md:text-3xl">{children}</h2>
  );
}
