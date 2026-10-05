import { site } from "../../content/site.js";
import { categories } from "../../content/index.js";
import { Layout } from "./Layout.js";
import { Placeholder } from "./components/Placeholder.js";
import { CtaBand } from "./components/CtaBand.js";

export function AboutPage(props: { assets: { css: string | null; js: string | null } }) {
  return (
    <Layout
      route="/about/"
      title={`About Aoslon — Aluminum Windows & Doors Factory in Foshan`}
      metaDescription="Aoslon Windows & Doors is a Foshan-based aluminum window and door factory founded in 2017, supplying importers, contractors and OEM brands across nine export countries."
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
        knowsAbout: categories.map((category) => category.name),
      }}
    >
      <section className="bg-brand text-surface">
        <div className="mx-auto max-w-page px-4 py-12 md:py-16">
          <h1 className="text-3xl font-bold md:text-4xl">
            A Foshan factory built around aluminum systems
          </h1>
          <p className="mt-3 max-w-3xl text-surface/85">
            {site.name} has manufactured aluminum windows, doors and façade systems in{" "}
            {site.factoryLocation} since {site.founded}. We supply importers, contractors,
            developers and OEM brands — every order made to project measurements and
            packed for international shipping.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-page gap-10 px-4 py-12 md:grid-cols-2">
        <div>
          <h2 className="text-2xl font-bold text-brand">What we make</h2>
          <ul className="mt-4 space-y-3 text-ink-muted">
            {categories.map((category) => (
              <li key={category.slug} className="border-b border-line pb-3">
                <a href={category.route} className="font-semibold text-brand no-underline hover:text-gold-strong">
                  {category.name}
                </a>
                <p className="text-sm">{category.products.length} system families, custom sized per project.</p>
              </li>
            ))}
          </ul>
          <h2 className="mt-10 text-2xl font-bold text-brand">Export experience</h2>
          <p className="mt-3 text-ink-muted">
            Orders shipped to {site.exportCountries.length} countries:
          </p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {site.exportCountries.map((country) => (
              <li
                key={country}
                className="rounded-full border border-line bg-surface px-4 py-1 text-sm text-brand"
              >
                {country}
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-4">
          <Placeholder label="Factory workshop and fabrication" height="h-56" />
          <Placeholder label="Quality inspection before packing" height="h-44" />
          <div className="rounded-card border border-line bg-surface p-6 shadow-card">
            <h2 className="text-lg font-bold text-brand">Certifications</h2>
            <p className="mt-2 text-sm text-ink-muted">
              Our product and system certification list is being prepared for publication.
              Ask us directly and we will share the current certificates for the systems
              you need.
            </p>
          </div>
        </div>
      </section>

      <CtaBand
        heading="Work with the factory directly"
        text="Tell us your market and product requirements. You get specifications and pricing from the team that runs production."
      />
    </Layout>
  );
}
