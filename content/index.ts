import { site } from "./site.js";
import { windowsCategory } from "./categories/windows.js";
import { doorsCategory } from "./categories/doors.js";
import { commercialCategory } from "./categories/commercial.js";
import { sunroomsCategory } from "./categories/sunrooms.js";
import { casementWindows } from "./products/casement-windows.js";
import type { Category, ProductDetail } from "./types.js";

export const categories: Category[] = [
  windowsCategory,
  doorsCategory,
  commercialCategory,
  sunroomsCategory,
];

export const productDetails: ProductDetail[] = [casementWindows];

export function getCategory(slug: string): Category | undefined {
  return categories.find((category) => category.slug === slug);
}

export function getProductDetail(route: string): ProductDetail | undefined {
  return productDetails.find((product) => product.route === route);
}

export interface RouteEntry {
  route: string;
  title: string;
  metaDescription: string;
  noindex: boolean;
}

export const contactRoute = "/contact/";
export const thankYouRoute = "/thank-you/";

/** The single route resolver: every URL in nav, pages and sitemap comes from here. */
export function buildRouteManifest(): RouteEntry[] {
  const routes: RouteEntry[] = [
    {
      route: "/",
      title: `Aluminum Windows & Doors Manufacturer | ${site.name}`,
      metaDescription:
        "topaluminumwindow is an aluminum window, door, curtain wall and sunroom manufacturer in Foshan, China, exporting to North America, Australia and the Middle East.",
      noindex: false,
    },
    {
      route: "/about/",
      title: `About topaluminumwindow — Aluminum Windows & Doors Factory in Foshan`,
      metaDescription:
        "topaluminumwindow is a Foshan-based aluminum window and door factory founded in 2017, supplying importers, contractors and OEM brands across nine export countries.",
      noindex: false,
    },
  ];

  for (const category of categories) {
    routes.push({
      route: category.route,
      title: `${category.name} — Custom Aluminum Systems | ${site.name}`,
      metaDescription: category.metaDescription,
      noindex: false,
    });
    for (const product of category.products) {
      if (product.detailRoute) {
        const detail = getProductDetail(product.detailRoute);
        if (detail) {
          routes.push({
            route: detail.route,
            title: `${detail.name} — Specs & Options | ${site.name}`,
            metaDescription: detail.metaDescription,
            noindex: false,
          });
        }
      }
    }
  }

  routes.push({
    route: contactRoute,
    title: `Request a Quote — Aluminum Windows & Doors | ${site.name}`,
    metaDescription:
      "Request a quote for aluminum windows, doors, curtain walls or sunrooms. Tell us your project country, product type and specifications for a factory-direct quotation.",
    noindex: false,
  });

  routes.push({
    route: thankYouRoute,
    title: `Thank You — Inquiry Received | ${site.name}`,
    metaDescription: "Your inquiry has been received. Our team will review your project details and reply by email.",
    noindex: true,
  });

  return routes;
}
