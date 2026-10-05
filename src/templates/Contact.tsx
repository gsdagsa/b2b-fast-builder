import { site } from "../../content/site.js";
import { categories } from "../../content/index.js";
import { Layout } from "./Layout.js";

export function ContactPage(props: { assets: { css: string | null; js: string | null } }) {
  return (
    <Layout
      route="/contact/"
      title={`Request a Quote — Aluminum Windows & Doors | ${site.name}`}
      metaDescription="Request a quote for aluminum windows, doors, curtain walls or sunrooms. Tell us your project country, product type and specifications for a factory-direct quotation."
      assets={props.assets}
    >
      <section className="bg-brand text-surface">
        <div className="mx-auto max-w-page px-4 py-12 md:py-16">
          <h1 className="text-3xl font-bold md:text-4xl">Request a quote</h1>
          <p className="mt-3 max-w-2xl text-surface/85">
            Describe your project in a minute. The more you tell us about product types,
            rough sizes and destination country, the more precise the quotation.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-page gap-10 px-4 py-12 md:grid-cols-[3fr_2fr]">
        <div>
          <form
            id="rfq-form"
            action="/api/inquiry"
            method="post"
            data-inquiry-form
            className="rounded-card border border-line bg-surface p-6 shadow-card md:p-8"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-ink">
                  Name <span aria-hidden="true" className="text-gold-deep">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  maxLength={100}
                  autoComplete="name"
                  className="mt-1 w-full rounded-control border border-line bg-canvas px-3 py-2 text-ink focus:border-brand focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-ink">
                  Email <span aria-hidden="true" className="text-gold-deep">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  maxLength={200}
                  autoComplete="email"
                  className="mt-1 w-full rounded-control border border-line bg-canvas px-3 py-2 text-ink focus:border-brand focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="country" className="block text-sm font-semibold text-ink">
                  Country <span aria-hidden="true" className="text-gold-deep">*</span>
                </label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  required
                  maxLength={100}
                  autoComplete="country-name"
                  className="mt-1 w-full rounded-control border border-line bg-canvas px-3 py-2 text-ink focus:border-brand focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="product_interest" className="block text-sm font-semibold text-ink">
                  Product interest
                </label>
                <select
                  id="product_interest"
                  name="product_interest"
                  className="mt-1 w-full rounded-control border border-line bg-canvas px-3 py-2 text-ink focus:border-brand focus:outline-none"
                >
                  <option value="">Select a system</option>
                  {categories.map((category) => (
                    <option key={category.slug} value={category.slug}>
                      {category.name}
                    </option>
                  ))}
                  <option value="mixed">Multiple / not sure yet</option>
                </select>
              </div>
            </div>
            <div className="mt-4">
              <label htmlFor="message" className="block text-sm font-semibold text-ink">
                Project details <span aria-hidden="true" className="text-gold-deep">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                maxLength={5000}
                placeholder="Example: 20 sliding windows and 8 casement windows for a villa in Melbourne, aluminum grey outside / white inside."
                className="mt-1 w-full rounded-control border border-line bg-canvas px-3 py-2 text-ink focus:border-brand focus:outline-none"
              />
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="project_type" className="block text-sm font-semibold text-ink">
                  Project type <span className="font-normal text-ink-muted">(optional)</span>
                </label>
                <select
                  id="project_type"
                  name="project_type"
                  className="mt-1 w-full rounded-control border border-line bg-canvas px-3 py-2 text-ink focus:border-brand focus:outline-none"
                >
                  <option value="">Select</option>
                  <option value="new-construction">New construction</option>
                  <option value="renovation">Renovation</option>
                  <option value="distribution">Distribution / resale</option>
                  <option value="oem">OEM partnership</option>
                </select>
              </div>
              <div>
                <label htmlFor="quantity" className="block text-sm font-semibold text-ink">
                  Estimated quantity <span className="font-normal text-ink-muted">(optional)</span>
                </label>
                <input
                  type="text"
                  id="quantity"
                  name="quantity"
                  maxLength={100}
                  className="mt-1 w-full rounded-control border border-line bg-canvas px-3 py-2 text-ink focus:border-brand focus:outline-none"
                />
              </div>
            </div>
            {/* Honeypot: humans never see or fill this field. */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="company_website">Company website</label>
              <input type="text" id="company_website" name="company_website" tabIndex={-1} autoComplete="off" />
            </div>
            <div className="mt-6 flex items-center gap-4">
              <button
                type="submit"
                className="rounded-control bg-gold px-8 py-3 font-semibold text-brand-deep hover:bg-gold-strong"
              >
                Send inquiry
              </button>
              <p id="rfq-status" role="status" aria-live="polite" className="text-sm text-ink-muted" />
            </div>
            <p className="mt-4 text-xs text-ink-muted">
              We use your details only to answer this inquiry.
            </p>
          </form>
        </div>

        <aside className="space-y-6">
          <div className="rounded-card border border-line bg-surface p-6 shadow-card">
            <h2 className="text-lg font-bold text-brand">What to include</h2>
            <ul className="mt-3 space-y-2 text-sm text-ink-muted">
              <li>· Product types and approximate sizes or drawings</li>
              <li>· Quantity and project type</li>
              <li>· Destination country or port</li>
              <li>· Colors, glazing or certification requirements if known</li>
            </ul>
          </div>
          <div className="rounded-card border border-line bg-surface p-6 shadow-card">
            <h2 className="text-lg font-bold text-brand">Who you reach</h2>
            <p className="mt-2 text-sm text-ink-muted">
              {site.name} — aluminum window and door factory in {site.factoryLocation},
              established {site.founded}. Your inquiry goes directly to the team that
              prepares quotations and production.
            </p>
          </div>
        </aside>
      </section>
    </Layout>
  );
}
