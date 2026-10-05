import type { Category } from "../types.js";

export const sunroomsCategory: Category = {
  slug: "sunrooms",
  route: "/sunrooms/",
  name: "Sunrooms & Extensions",
  metaDescription:
    "Aluminum sunrooms, pergolas and glass railings for villas, terraces and outdoor living projects, engineered for export markets.",
  intro:
    "Outdoor living products extend a project's usable space. Our sunroom, pergola and railing systems share profiles, finishes and glazing options with our window and door systems, so colors and sightlines stay consistent across the whole building. Typical configurations below are our standard build ranges; final specifications are confirmed per project.",
  buyerTasks: [
    "Choose a structure type for the terrace, roof or garden space",
    "Check glazing and shading options",
    "Confirm drainage, wind and snow load handling",
  ],
  products: [
    {
      slug: "aluminum-sunrooms",
      name: "Aluminum Sunrooms",
      keySpecs: [
        "Glass roof or insulated roof options",
        "Integrated door and window openings",
        "Gutter and drainage built in",
      ],
      bestFor: "Year-round enclosed living space added to villas and homes.",
      detailRoute: null,
    },
    {
      slug: "aluminum-pergolas",
      name: "Aluminum Pergolas",
      keySpecs: [
        "Louvered or fixed roof options",
        "Freestanding and wall-mounted builds",
        "Optional lighting and screening",
      ],
      bestFor: "Shaded outdoor areas that stay usable in sun and light rain.",
      detailRoute: null,
    },
    {
      slug: "glass-railings",
      name: "Glass Railings",
      keySpecs: [
        "Frameless and framed options",
        "Laminated safety glass",
        "Balcony, stair and pool applications",
      ],
      bestFor: "Balconies and terraces where protection must not block the view.",
      detailRoute: null,
    },
  ],
};
