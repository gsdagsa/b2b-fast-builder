import type { Category } from "../types.js";

export const doorsCategory: Category = {
  slug: "doors",
  route: "/doors/",
  name: "Aluminum Doors",
  metaDescription:
    "Aluminum door systems for export projects: sliding patio doors, French doors, bi-fold doors, pivot doors, lift & slide and entrance doors, custom made to order.",
  intro:
    "Door openings carry the heaviest daily use in any project, so hardware class, track design and profile rigidity matter as much as appearance. Our door systems are engineered for repeated operation, large panels and coastal or high-traffic conditions. Typical configurations below are our standard build ranges; final specifications are confirmed per project.",
  buyerTasks: [
    "Choose a door system by opening size, traffic and view requirements",
    "Check panel weight limits and hardware classes",
    "Confirm thresholds, screens and accessibility options",
  ],
  products: [
    {
      slug: "sliding-patio-doors",
      name: "Sliding Patio Doors",
      keySpecs: [
        "2-panel to 4-panel configurations",
        "Stainless steel roller options",
        "Optional integrated insect screen",
      ],
      bestFor: "Terraces, balconies and backyard openings in residential projects.",
      detailRoute: null,
    },
    {
      slug: "french-doors",
      name: "French Doors",
      keySpecs: [
        "Inward or outward opening pairs",
        "Multi-point locking",
        "Simulated divided lite options",
      ],
      bestFor: "Classic entrances and interior-exterior transitions with a traditional look.",
      detailRoute: null,
    },
    {
      slug: "bi-fold-doors",
      name: "Bi-fold Doors",
      keySpecs: [
        "3-panel to 8-panel configurations",
        "Bottom-rolled or top-hung tracks",
        "Openings that fold almost fully clear",
      ],
      bestFor: "Openings that must disappear completely, common in sunrooms and modern extensions.",
      detailRoute: null,
    },
    {
      slug: "pivot-doors",
      name: "Pivot Doors",
      keySpecs: [
        "Oversized single panels",
        "Offset pivot hardware",
        "Statement entrance scales",
      ],
      bestFor: "Premium entrances where a very large, heavy panel is part of the design.",
      detailRoute: null,
    },
    {
      slug: "lift-and-slide-doors",
      name: "Lift & Slide Doors",
      keySpecs: [
        "Large panels with effortless operation",
        "Panel weights handled by lift hardware",
        "Superior sealing when closed",
      ],
      bestFor: "High-end projects combining very wide openings with weather performance.",
      detailRoute: null,
    },
    {
      slug: "entrance-doors",
      name: "Aluminum Entrance Doors",
      keySpecs: [
        "Thermal break options",
        "Access control and closer preparation",
        "Powder coated or wood-grain finishes",
      ],
      bestFor: "Building entrances and residential front doors needing security and durability.",
      detailRoute: null,
    },
  ],
};
