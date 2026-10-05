import { site } from "../../content/site.js";
import { categories } from "../../content/index.js";
import { Layout } from "./Layout.js";
import { Placeholder, SectionHeading } from "./components/Placeholder.js";

export function Home(props: { assets: { css: string | null; js: string | null } }) {
  const totalSystems = categories.reduce((sum, category) => sum + category.products.length, 0);
  return (
    <Layout
      route="/"
      title={`Aluminum Windows & Doors Manufacturer | ${site.name}`}
      metaDescription="topaluminumwindow is an aluminum window, door, curtain wall and sunroom manufacturer in Foshan, China, exporting to North America, Australia and the Middle East."
      assets={props.assets}
      jsonLd={{
        "@context": "https://schema.org",
        "@type": "Organization",
        name: site.name,
        url: site.origin,
        foundingDate: String(site.founded),
        address: {
          "@type": "PostalAddress",
          addressLocality: "Foshan",
          addressRegion: "Guangdong",
          addressCountry: "CN",
        },
      }}
    >
      <section className="bg-brand text-surface">
        <div className="mx-auto max-w-page px-4 py-16 md:py-24">
          <p className="text-sm font-semibold uppercase tracking-widest text-gold">
            Aluminum systems manufacturer · Foshan, China · Est. {site.founded}
          </p>
          <h1 className="mt-4 max-w-3xl text-3xl font-bold leading-tight md:text-5xl">
            Aluminum windows, doors and façade systems — factory-direct for your market
          </h1>
          <p className="mt-4 max-w-2xl text-base text-surface/85 md:text-lg">
            topaluminumwindow builds custom aluminum windows, doors, curtain walls and sunrooms for
            importers, contractors and OEM brands — made to project measurements and
            exported to {site.exportCountries.length} countries across North America, Australia and the Middle East.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="/contact/"
              className="rounded-control bg-gold px-6 py-3 font-semibold text-brand-deep no-underline hover:bg-gold-strong"
            >
              Request a Quote
            </a>
            <a
              href="#systems"
              className="rounded-control border border-surface/40 px-6 py-3 font-semibold text-surface no-underline hover:border-surface"
            >
              Browse Systems
            </a>
          </div>
        </div>
      </section>

      <section id="systems" className="mx-auto max-w-page px-4 py-14">
        <SectionHeading>Four product systems, one factory</SectionHeading>
        <p className="mt-3 max-w-2xl text-ink-muted">
          {totalSystems} window, door and façade system families cover the openings most
          export projects need. Every system is made to order: sizes, glazing, hardware
          and finishes are specified per project.
        </p>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {categories.map((category) => (
            <a
              key={category.slug}
              href={category.route}
              className="block rounded-card border border-line bg-surface p-6 no-underline shadow-card transition hover:border-brand"
            >
              <h3 className="text-xl font-bold text-brand">{category.name}</h3>
              <ul className="mt-3 space-y-1 text-sm text-ink-muted">
                {category.products.slice(0, 3).map((product) => (
                  <li key={product.slug}>· {product.name}</li>
                ))}
                <li className="font-medium text-brand">
                  +{Math.max(category.products.length - 3, 0)} more in this system
                </li>
              </ul>
              <span className="mt-4 inline-block text-sm font-semibold text-ink underline decoration-gold decoration-2 underline-offset-4">
                View {category.name.toLowerCase()} →
              </span>
            </a>
          ))}
        </div>
      </section>

      <section className="bg-surface py-14">
        <div className="mx-auto grid max-w-page gap-10 px-4 md:grid-cols-2">
          <div>
            <SectionHeading>Built for export projects</SectionHeading>
            <ul className="mt-6 space-y-4">
              <li className="flex gap-3">
                <span className="font-bold text-ink">01</span>
                <p className="text-ink-muted">
                  <strong className="text-ink">Made to project measurements.</strong> Custom
                  sizes, opening directions, dual-color finishes and market-specific
                  glazing on every order.
                </p>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-ink">02</span>
                <p className="text-ink-muted">
                  <strong className="text-ink">Factory in Foshan since {site.founded}.</strong>{" "}
                  Aluminum window and door production under one roof, close to the
                  Guangdong profile and hardware supply chain.
                </p>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-ink">03</span>
                <p className="text-ink-muted">
                  <strong className="text-ink">OEM for brand owners.</strong> Hardware brands,
                  labeling and packaging arranged to your brand requirements.
                </p>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-ink">04</span>
                <p className="text-ink-muted">
                  <strong className="text-ink">Export packing as standard.</strong> Foam,
                  corner guards and export cartons or crates, adapted to your
                  destination port.
                </p>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <Placeholder label="Factory production line" height="h-64" />
            <Placeholder label="Finished windows packed for export" height="h-40" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-page px-4 py-14">
        <SectionHeading>Where our products ship</SectionHeading>
        <p className="mt-3 max-w-2xl text-ink-muted">
          We have supplied projects and orders across three regions. Tell us your
          destination market and we will confirm specifications that match local
          requirements.
        </p>
        <ul className="mt-6 flex flex-wrap gap-2">
          {site.exportCountries.map((country) => (
            <li
              key={country}
              className="rounded-full border border-line bg-surface px-4 py-1 text-sm text-brand"
            >
              {country}
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-brand text-surface">
        <div className="mx-auto max-w-page px-4 py-14 text-center">
          <h2 className="text-2xl font-bold md:text-3xl">Tell us what your project needs</h2>
          <p className="mx-auto mt-3 max-w-xl text-surface/85">
            Send product types, rough sizes or drawings. You get a factory quotation with
            specifications confirmed for your market.
          </p>
          <a
            href="/contact/"
            className="mt-6 inline-block rounded-control bg-gold px-8 py-3 font-semibold text-brand-deep no-underline hover:bg-gold-strong"
          >
            Request a Quote
          </a>
        </div>
      </section>
    </Layout>
  );
}
