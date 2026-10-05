import { site } from "../../content/site.js";
import { Layout } from "./Layout.js";

export function ThankYouPage(props: { assets: { css: string | null; js: string | null } }) {
  return (
    <Layout
      route="/thank-you/"
      title={`Thank You — Inquiry Received | ${site.name}`}
      metaDescription="Your inquiry has been received. Our team will review your project details and reply by email."
      noindex
      assets={props.assets}
    >
      <section className="mx-auto max-w-page px-4 py-20 text-center">
        <p className="text-5xl" aria-hidden="true">
          ✓
        </p>
        <h1 className="mt-4 text-3xl font-bold text-brand">Thank you — your inquiry has been received</h1>
        <p className="mx-auto mt-4 max-w-xl text-ink-muted">
          Your request is saved with the reference{" "}
          <span data-inquiry-id className="font-semibold text-brand">
            (loading reference)
          </span>
          . Our team will review your project details and reply by email. If you have
          drawings or photos ready, you can send them in your next reply.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a
            href="/"
            className="rounded-control bg-brand px-6 py-3 font-semibold text-surface no-underline hover:bg-brand-deep"
          >
            Back to home
          </a>
          <a
            href="/windows/"
            className="rounded-control border border-brand px-6 py-3 font-semibold text-brand no-underline hover:bg-canvas"
          >
            Browse windows
          </a>
        </div>
      </section>
    </Layout>
  );
}

export function NotFoundPage(props: { assets: { css: string | null; js: string | null } }) {
  return (
    <Layout
      route="/404.html"
      title="Page Not Found | topaluminumwindow"
      metaDescription="This page does not exist. Browse our aluminum window, door and façade systems or return to the home page."
      noindex
      assets={props.assets}
    >
      <section className="mx-auto max-w-page px-4 py-20 text-center">
        <h1 className="text-3xl font-bold text-brand">Page not found</h1>
        <p className="mx-auto mt-4 max-w-xl text-ink-muted">
          The page you requested does not exist or has moved. Start from the home page or
          browse our product systems.
        </p>
        <nav aria-label="Recovery" className="mt-8 flex flex-wrap justify-center gap-3">
          <a
            href="/"
            className="rounded-control bg-brand px-6 py-3 font-semibold text-surface no-underline hover:bg-brand-deep"
          >
            Home
          </a>
          <a
            href="/windows/"
            className="rounded-control border border-brand px-6 py-3 font-semibold text-brand no-underline hover:bg-canvas"
          >
            Aluminum Windows
          </a>
          <a
            href="/doors/"
            className="rounded-control border border-brand px-6 py-3 font-semibold text-brand no-underline hover:bg-canvas"
          >
            Aluminum Doors
          </a>
          <a
            href="/contact/"
            className="rounded-control border border-brand px-6 py-3 font-semibold text-brand no-underline hover:bg-canvas"
          >
            Request a Quote
          </a>
        </nav>
      </section>
    </Layout>
  );
}
