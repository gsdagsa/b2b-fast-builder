import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { createElement } from "react";
import { site } from "../content/site.js";
import { buildRouteManifest, categories, getProductDetail } from "../content/index.js";
import { Home } from "../src/templates/Home.js";
import { CategoryPage } from "../src/templates/Category.js";
import { ProductPage } from "../src/templates/Product.js";
import { AboutPage } from "../src/templates/About.js";
import { ContactPage } from "../src/templates/Contact.js";
import { NotFoundPage, ThankYouPage } from "../src/templates/NotFound.js";

interface ViteManifestEntry {
  file: string;
  css?: string[];
}

interface ViteManifest {
  [entry: string]: ViteManifestEntry;
}

type Assets = { css: string | null; js: string | null };

/** Each page component renders its own full document; the generator adds the doctype. */
async function writeDocument(distDir: string, route: string, node: React.ReactElement): Promise<void> {
  const html = `<!doctype html>${renderToStaticMarkup(node)}`;
  const targetDir = join(distDir, route.replace(/^\//, "").replace(/\/$/, ""));
  await mkdir(targetDir, { recursive: true });
  await writeFile(join(targetDir, "index.html"), html, "utf8");
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function readAssetPaths(distDir: string): Promise<Assets> {
  try {
    const manifestPath = join(distDir, ".vite", "manifest.json");
    const manifest = JSON.parse(await readFile(manifestPath, "utf8")) as ViteManifest;
    const entry = manifest["src/client/main.ts"];
    if (!entry) return { css: null, js: null };
    return {
      css: entry.css?.[0] ? `/${entry.css[0]}` : null,
      js: `/${entry.file}`,
    };
  } catch {
    return { css: null, js: null };
  }
}

async function main(): Promise<void> {
  const distDir = join(process.cwd(), "dist");
  const assets = await readAssetPaths(distDir);
  const manifest = buildRouteManifest();

  for (const entry of manifest) {
    switch (entry.route) {
      case "/":
        await writeDocument(distDir, entry.route, createElement(Home, { assets }));
        break;
      case "/about/":
        await writeDocument(distDir, entry.route, createElement(AboutPage, { assets }));
        break;
      case "/contact/":
        await writeDocument(distDir, entry.route, createElement(ContactPage, { assets }));
        break;
      case "/thank-you/":
        await writeDocument(distDir, entry.route, createElement(ThankYouPage, { assets }));
        break;
      default: {
        const product = getProductDetail(entry.route);
        if (product) {
          await writeDocument(
            distDir,
            entry.route,
            createElement(ProductPage, { route: entry.route, assets }),
          );
        } else if (categories.some((category) => category.route === entry.route)) {
          const category = categories.find((item) => item.route === entry.route)!;
          await writeDocument(
            distDir,
            entry.route,
            createElement(CategoryPage, { slug: category.slug, assets }),
          );
        } else {
          throw new Error(`No template handles route ${entry.route}`);
        }
      }
    }
  }

  await writeFile(
    join(distDir, "404.html"),
    `<!doctype html>${renderToStaticMarkup(createElement(NotFoundPage, { assets }))}`,
    "utf8",
  );

  const indexable = manifest.filter((entry) => !entry.noindex);
  const sitemap = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...indexable.map(
      (entry) =>
        `  <url><loc>${escapeXml(`${site.origin}${entry.route}`)}</loc><changefreq>monthly</changefreq></url>`,
    ),
    "</urlset>",
    "",
  ].join("\n");
  await writeFile(join(distDir, "sitemap.xml"), sitemap, "utf8");

  await writeFile(
    join(process.cwd(), "routes.json"),
    `${JSON.stringify({ routes: manifest.map((entry) => entry.route) }, null, 2)}\n`,
    "utf8",
  );

  process.stdout.write(
    `Generated ${manifest.length} routes + 404.html, sitemap with ${indexable.length} indexable URLs.\n`,
  );
}

main().catch((error) => {
  process.stderr.write(`${error instanceof Error ? error.stack : String(error)}\n`);
  process.exit(1);
});
