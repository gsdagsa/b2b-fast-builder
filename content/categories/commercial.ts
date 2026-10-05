import type { Category } from "../types.js";

export const commercialCategory: Category = {
  slug: "commercial",
  route: "/commercial/",
  name: "Commercial Systems",
  metaDescription:
    "Curtain wall, storefront and window wall aluminum systems for commercial construction, engineered and supplied to contractors and developers worldwide.",
  intro:
    "For contractors and developers we supply engineered aluminum façade systems: stick-built curtain walls, storefront framing and window wall systems. Project engineering, shop drawings and glazing specifications are coordinated with your project team before production. Typical configurations below are our standard build ranges; final specifications are confirmed per project.",
  buyerTasks: [
    "Match a façade system to building height, wind load and glazing",
    "Understand drawing, engineering and delivery workflow",
    "Confirm finish and glass options at project scale",
  ],
  products: [
    {
      slug: "curtain-wall-systems",
      name: "Curtain Wall Systems",
      keySpecs: [
        "Stick-built framing systems",
        "Visible and hidden frame options",
        "Multi-storey span capability",
      ],
      bestFor: "Office buildings, hotels and façades where full-height glazing is designed in.",
      detailRoute: null,
    },
    {
      slug: "storefront-systems",
      name: "Storefront Systems",
      keySpecs: [
        "Ground-level framing for retail and lobbies",
        "Wide door integration options",
        "Hardware and access control ready",
      ],
      bestFor: "Retail fronts, lobbies and commercial ground floors with heavy daily use.",
      detailRoute: null,
    },
    {
      slug: "window-wall-systems",
      name: "Window Wall Systems",
      keySpecs: [
        "Floor-to-floor cladding systems",
        "Slab-edge anchoring",
        "Combined with operable windows",
      ],
      bestFor: "Residential towers and commercial buildings between curtain wall and punched windows.",
      detailRoute: null,
    },
  ],
};
