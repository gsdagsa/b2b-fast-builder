import { site } from "../../content/site.js";
import { getCategory, getProductDetail } from "../../content/index.js";
import { Layout } from "./Layout.js";
import { Placeholder } from "./components/Placeholder.js";
import { CtaBand, SpecTable } from "./components/CtaBand.js";

export function ProductPage(props: {
  route: string;
  assets: { css: string | null; js: string | null };
}) {
  const product = getProductDetail(props.route);
  if (!product) throw new Error(`Unknown product route: ${props.route}`);
  const category = getCategory(product.categorySlug);
  if (!category) throw new Error(`Unknown category: ${product.categorySlug}`);

  return (
    <Layout
      route={product.route}
      title={`${product.name} — Specs & Options | ${site.name}`}
      metaDescription={product.metaDescription}
      assets={props.assets}
      jsonLd={{
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.name,
        description: product.metaDescription,
        brand: { "@type": "Brand", name: site.name },
        manufacturer: {
          "@type": "Organization",
          name: site.name,
          url: site.origin,
        },
        category: category.name,
      }}
    >
      <section className="bg-brand text-surface">
        <div className="mx-auto max-w-page px-4 py-12 md:py-16">
          <nav aria-label="Breadcrumb" className="text-sm text-surface/70">
            <a href="/" className="text-surface/70 no-underline hover:text-gold">
              Home
            </a>{" "}
            /{" "}
            <a href={category.route} className="text-surface/70 no-underline hover:text-gold">
              {category.name}
            </a>{" "}
            / <span>{product.name}</span>
          </nav>
          <h1 className="mt-3 text-3xl font-bold md:text-4xl">{product.name}</h1>
          <p className="mt-3 max-w-3xl text-surface/85">{product.intro}</p>
          <a
            href={`/contact/?product=${product.slug}`}
            className="mt-6 inline-block rounded-control bg-gold px-6 py-3 font-semibold text-brand-deep no-underline hover:bg-gold-strong"
          >
            Request a quote for {product.name.toLowerCase()}
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-page px-4 py-12">
        <div className="grid gap-8 md:grid-cols-[2fr_1fr]">
          <div className="space-y-10">
            {product.specGroups.map((group) => (
              <SpecTable key={group.heading} heading={group.heading} rows={group.rows} />
            ))}
          </div>
          <aside className="space-y-6">
            <Placeholder label={`${product.name} project photo`} height="h-48" />
            <div className="rounded-card border border-line bg-surface p-6 shadow-card">
              <h2 className="text-lg font-bold text-brand">{product.options.heading}</h2>
              <ul className="mt-3 space-y-2 text-sm text-ink-muted">
                {product.options.rows.map((option) => (
                  <li key={option.label}>
                    <strong className="text-ink">{option.label}:</strong> {option.value}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-surface py-12">
        <div className="mx-auto max-w-page px-4">
          <h2 className="text-2xl font-bold text-brand">Frequently asked questions</h2>
          <div className="mt-6 space-y-3">
            {product.faq.map((item) => (
              <details
                key={item.question}
                className="rounded-card border border-line bg-canvas px-5 py-4"
              >
                <summary className="cursor-pointer font-semibold text-ink">{item.question}</summary>
                <p className="mt-2 text-sm text-ink-muted">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        heading={`Get ${product.name.toLowerCase()} pricing for your project`}
        text="Include product type, rough dimensions, quantity and destination country. You get a factory-direct quotation with market-matched specifications."
      />
    </Layout>
  );
}
