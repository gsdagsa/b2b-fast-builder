import type { ReactNode } from "react";

export function CtaBand({ heading, text }: { heading: string; text: string }) {
  return (
    <section className="bg-brand text-surface">
      <div className="mx-auto max-w-page px-4 py-12 text-center">
        <h2 className="text-2xl font-bold md:text-3xl">{heading}</h2>
        <p className="mx-auto mt-3 max-w-xl text-surface/85">{text}</p>
        <a
          href="/contact/"
          className="mt-6 inline-block rounded-control bg-gold px-8 py-3 font-semibold text-brand-deep no-underline hover:bg-gold-strong"
        >
          Request a Quote
        </a>
      </div>
    </section>
  );
}

export function SpecTable({ heading, rows }: { heading: string; rows: { label: string; value: string }[] }): ReactNode {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <caption className="text-left text-lg font-bold text-brand">{heading}</caption>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label} className="border-b border-line">
              <th scope="row" className="w-56 py-3 pr-4 text-left align-top font-semibold text-ink">
                {row.label}
              </th>
              <td className="py-3 align-top text-ink-muted">{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
