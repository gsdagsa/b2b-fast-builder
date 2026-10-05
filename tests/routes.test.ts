import { test } from "node:test";
import assert from "node:assert/strict";
import { buildRouteManifest, categories, productDetails, getCategory } from "../content/index.js";
import { site } from "../content/site.js";

test("route manifest covers all categories and their detail pages exactly once", () => {
  const manifest = buildRouteManifest();
  const routes = manifest.map((entry) => entry.route);
  assert.equal(new Set(routes).size, routes.length, "routes must be unique");
  for (const category of categories) {
    assert.ok(routes.includes(category.route), `missing ${category.route}`);
  }
  for (const product of productDetails) {
    assert.ok(routes.includes(product.route), `missing ${product.route}`);
  }
  assert.ok(routes.includes("/contact/"));
  assert.ok(routes.includes("/thank-you/"));
});

test("thank-you page is noindex and every indexable route has unique title and description", () => {
  const manifest = buildRouteManifest();
  const thankYou = manifest.find((entry) => entry.route === "/thank-you/");
  assert.equal(thankYou?.noindex, true);
  const indexable = manifest.filter((entry) => !entry.noindex);
  const titles = indexable.map((entry) => entry.title.toLowerCase());
  assert.equal(new Set(titles).size, titles.length, "titles must be unique");
  for (const entry of indexable) {
    assert.ok(entry.metaDescription.length >= 20, `short description on ${entry.route}`);
    assert.ok(entry.title.length >= 3, `short title on ${entry.route}`);
  }
});

test("every category route resolves and product detail routes match their category", () => {
  for (const category of categories) {
    assert.equal(getCategory(category.slug)?.route, category.route);
  }
  for (const product of productDetails) {
    assert.ok(getCategory(product.categorySlug), `unknown category ${product.categorySlug}`);
    assert.ok(product.route.startsWith(getCategory(product.categorySlug)!.route));
  }
});

test("verified company facts are present and contact channels stay null until confirmed", () => {
  assert.equal(site.factoryLocation.includes("Foshan"), true);
  assert.equal(site.founded, 2017);
  assert.ok(site.exportCountries.length >= 9);
  assert.equal(site.contactEmail, null, "no invented contact email");
  assert.equal(site.contactPhone, null, "no invented contact phone");
});
