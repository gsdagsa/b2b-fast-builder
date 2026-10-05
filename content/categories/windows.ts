import type { Category } from "../types.js";

export const windowsCategory: Category = {
  slug: "windows",
  route: "/windows/",
  name: "Aluminum Windows",
  metaDescription:
    "Aluminum windows manufactured in Foshan and exported to North America, Australia and the Middle East: casement, sliding, awning, double hung and impact-rated systems.",
  intro:
    "Our aluminum window systems cover the openings most importers, contractors and developers ask for. Every system is made to project measurements, with glazing, finishes and hardware specified per market. Typical configurations below are our standard build ranges; final specifications are confirmed per project.",
  buyerTasks: [
    "Compare window systems by opening style and performance need",
    "Check glazing, finish and hardware options before requesting a quote",
    "Confirm that custom sizes and market-specific requirements are supported",
  ],
  products: [
    {
      slug: "casement-windows",
      name: "Casement Windows",
      keySpecs: [
        "Side-hinged, outward opening",
        "Single and double sash configurations",
        "Multi-point locking hardware",
      ],
      bestFor: "Maximum ventilation and a clean, secure opening for homes and villas.",
      detailRoute: "/windows/casement-windows/",
    },
    {
      slug: "sliding-windows",
      name: "Sliding Windows",
      keySpecs: [
        "Horizontal sliding sashes on rollers",
        "2-track and 3-track configurations",
        "Insect screen options",
      ],
      bestFor: "Wide openings and rooms where outward projection is not practical.",
      detailRoute: null,
    },
    {
      slug: "awning-windows",
      name: "Awning Windows",
      keySpecs: [
        "Top-hinged, outward opening",
        "Can stay open in light rain",
        "Commonly paired with fixed lights",
      ],
      bestFor: "Bathrooms, kitchens and higher walls where ventilation matters regardless of weather.",
      detailRoute: null,
    },
    {
      slug: "double-hung-windows",
      name: "Double Hung Windows",
      keySpecs: [
        "Two vertically sliding sashes",
        "Traditional look for North American homes",
        "Tilt-in cleaning options",
      ],
      bestFor: "Renovation and new-build projects that require a classic American window style.",
      detailRoute: null,
    },
    {
      slug: "hurricane-impact-windows",
      name: "Hurricane Impact Windows",
      keySpecs: [
        "Laminated impact glazing",
        "Reinforced frame profiles",
        "Built for coastal wind zones",
      ],
      bestFor: "Coastal US and Caribbean projects where wind-borne debris resistance is required.",
      detailRoute: null,
    },
    {
      slug: "picture-windows",
      name: "Fixed / Picture Windows",
      keySpecs: [
        "Non-opening, maximum glass area",
        "Combined into combinations with operable units",
        "Slim sightlines",
      ],
      bestFor: "Views and daylight where opening is not needed, often combined with casement or awning units.",
      detailRoute: null,
    },
  ],
};
