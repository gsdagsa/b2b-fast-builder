import type { ReactNode } from "react";
import { site } from "../../content/site.js";
import { categories } from "../../content/index.js";

export interface Crumb {
  label: string;
  href: string | null;
}

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface">
      <div className="mx-auto flex max-w-page items-center justify-between gap-4 px-4 py-3">
        <a href="/" className="flex items-center gap-2 no-underline">
          <span className="flex h-9 w-9 items-center justify-center rounded-card bg-brand font-bold text-gold">
            A
          </span>
          <span className="text-base font-bold text-brand md:text-lg">{site.name}</span>
        </a>
        <nav aria-label="Main" id="site-nav" className="hidden md:block">
          <ul className="flex items-center gap-6 text-sm font-medium text-ink">
            {categories.map((category) => (
              <li key={category.slug}>
                <a href={category.route} className="text-ink no-underline hover:text-brand">
                  {category.name}
                </a>
              </li>
            ))}
            <li>
              <a href="/about/" className="text-ink no-underline hover:text-brand">
                About
              </a>
            </li>
            <li>
              <a
                href="/contact/"
                className="inline-flex rounded-control bg-brand px-4 py-2 text-surface no-underline hover:bg-brand-deep"
              >
                Request a Quote
              </a>
            </li>
          </ul>
        </nav>
        <button
          type="button"
          id="nav-toggle"
          aria-expanded="false"
          aria-controls="site-nav"
          className="rounded-control border border-line px-3 py-2 text-sm text-ink md:hidden"
        >
          Menu
        </button>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-16 border-t border-line bg-brand text-surface">
      <div className="mx-auto grid max-w-page gap-10 px-4 py-12 md:grid-cols-3">
        <div>
          <p className="text-lg font-bold">{site.name}</p>
          <p className="mt-2 text-sm text-surface/80">
            Aluminum windows, doors, commercial systems and sunrooms, manufactured in {site.factoryLocation} since {site.founded}.
          </p>
        </div>
        <nav aria-label="Products">
          <p className="text-sm font-semibold uppercase tracking-widest text-gold">Products</p>
          <ul className="mt-3 space-y-2 text-sm">
            {categories.map((category) => (
              <li key={category.slug}>
                <a href={category.route} className="text-surface/90 no-underline hover:text-gold">
                  {category.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Company">
          <p className="text-sm font-semibold uppercase tracking-widest text-gold">Company</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a href="/about/" className="text-surface/90 no-underline hover:text-gold">
                About & Factory
              </a>
            </li>
            <li>
              <a href="/contact/" className="text-surface/90 no-underline hover:text-gold">
                Request a Quote
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="border-t border-surface/15">
        <p className="mx-auto max-w-page px-4 py-4 text-xs text-surface/70">
          © {new Date().getFullYear()} {site.name}. Exporting to {site.exportCountries.slice(0, 4).join(", ")} and more.
        </p>
      </div>
    </footer>
  );
}

export interface LayoutProps {
  route: string;
  title: string;
  metaDescription: string;
  noindex?: boolean;
  assets: { css: string | null; js: string | null };
  jsonLd?: Record<string, unknown> | null;
  children: ReactNode;
}

export function Layout({
  route,
  title,
  metaDescription,
  noindex = false,
  assets,
  jsonLd = null,
  children,
}: LayoutProps) {
  const canonical = `${site.origin}${route}`;
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{title}</title>
        <meta name="description" content={metaDescription} />
        {noindex ? <meta name="robots" content="noindex, follow" /> : null}
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={canonical} />
        <meta property="og:type" content="website" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        {assets.css ? <link rel="stylesheet" href={assets.css} /> : null}
        {jsonLd ? (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        ) : null}
      </head>
      <body className="bg-canvas font-sans text-ink antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
        {assets.js ? <script type="module" src={assets.js} defer /> : null}
      </body>
    </html>
  );
}
