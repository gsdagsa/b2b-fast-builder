import { site } from "../../content/site.js";
import { getCategory } from "../../content/index.js";
import { Layout } from "./Layout.js";
import { CtaBand } from "./components/CtaBand.js";

export function CategoryPage(props: {
  slug: string;
  assets: { css: string | null; js: string | null };
}) {
  const category = getCategory(props.slug);
  if (!category) throw new Error(`Unknown category: ${props.slug}`);
  return (
    <Layout
      route={category.route}
      title={`${category.name} — Custom Aluminum Systems | ${site.name}`}
      metaDescription={category.metaDescription}
      assets={props.assets}
      jsonLd={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: site.origin },
          {
            "@type": "ListItem",
            position: 2,
            name: category.name,
            item: `${site.origin}${category.route}`,
          },
        ],
      }}
    >
      <section className="bg-brand text-surface">
        <div className="mx-auto max-w-page px-4 py-12 md:py-16">
          <nav aria-label="Breadcrumb" className="text-sm text-surface/70">
            <a href="/" className="text-surface/70 no-underline hover:text-gold">
              Home
            </a>{" "}
            / <span>{category.name}</span>
          </nav>
          <h1 className="mt-3 text-3xl font-bold md:text-4xl">{category.name}</h1>
          <p className="mt-3 max-w-3xl text-surface/85">{category.intro}</p>
        </div>
      </section>

      <section className="mx-auto max-w-page px-4 py-12">
        <h2 className="sr-only">{category.name} systems</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {category.products.map((product) => (
            <article
              key={product.slug}
              className="flex flex-col rounded-card border border-line bg-surface p-6 shadow-card"
            >
              <h3 className="text-xl font-bold text-brand">{product.name}</h3>
              <ul className="mt-3 space-y-1 text-sm text-ink-muted">
                {product.keySpecs.map((spec) => (
                  <li key={spec}>· {spec}</li>
                ))}
              </ul>
              <p className="mt-3 text-sm text-ink-muted">
                <strong className="text-ink">Best for:</strong> {product.bestFor}
              </p>
              <div className="mt-4 flex-1" />
              {product.detailRoute ? (
                <a
                  href={product.detailRoute}
                  className="inline-block rounded-control bg-brand px-5 py-2 text-center font-semibold text-surface no-underline hover:bg-brand-deep"
                >
                  View specifications
                </a>
              ) : (
                <a
                  href="/contact/"
                  className="inline-block rounded-control border border-brand px-5 py-2 text-center font-semibold text-brand no-underline hover:bg-canvas"
                >
                  Ask for details & pricing
                </a>
              )}
            </article>
          ))}
        </div>
      </section>

      <CtaBand
        heading={`Request ${category.name.toLowerCase()} pricing`}
        text="Send project country, product types and rough sizes. Quotations include specifications matched to your market."
      />
    </Layout>
  );
}
