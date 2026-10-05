import type { ProductDetail } from "../types.js";

export const casementWindows: ProductDetail = {
  slug: "casement-windows",
  route: "/windows/casement-windows/",
  categorySlug: "windows",
  name: "Aluminum Casement Windows",
  metaDescription:
    "Aluminum casement windows custom made for export projects: multi-point locking, double glazing and thermal break options, powder coated or wood-grain finishes.",
  intro:
    "Casement windows open outward on side hinges and seal by compression, which makes them one of the weathertight window types you can specify. They suit bedrooms, living rooms and any opening where ventilation, security and clean operation matter. Aoslon builds casement windows to project measurements for importers, contractors and OEM brands, with glazing, hardware and finishes specified per market.",
  specGroups: [
    {
      heading: "Frame & Profile",
      rows: [
        { label: "Material", value: "Aluminum alloy 6063-T5 / 6061-T6, depending on structural need" },
        { label: "Profile wall thickness", value: "1.2 mm – 2.0 mm typical, confirmed by wind load calculation" },
        { label: "Thermal break", value: "Non-thermal or polyamide thermal break profiles" },
        { label: "Frame depth", value: "Typical series from 55 mm to 90 mm frame depth" },
      ],
    },
    {
      heading: "Glazing",
      rows: [
        { label: "Standard option", value: "5 mm + 12A + 5 mm insulated glass" },
        { label: "Upgrades", value: "Low-E coatings, argon fill, laminated glass, tinted or obscure glass" },
        { label: "Impact option", value: "Laminated impact glazing in reinforced frame for coastal zones" },
        { label: "Mesh", value: "Retractable or fixed insect screen options" },
      ],
    },
    {
      heading: "Hardware & Operation",
      rows: [
        { label: "Locking", value: "Multi-point locking handles as standard" },
        { label: "Hinges", value: "Friction stay hinges, corrosion-protected" },
        { label: "Configurations", value: "Single sash, double sash, and combinations with fixed lights" },
      ],
    },
    {
      heading: "Finishes",
      rows: [
        { label: "Powder coating", value: "Standard RAL colors, matte or gloss" },
        { label: "Wood grain", value: "Wood-effect sublimation finishes" },
        { label: "Anodizing", value: "Silver, bronze and custom anodized finishes" },
      ],
    },
  ],
  options: {
    heading: "Options to specify in your quote request",
    rows: [
      { label: "Opening direction", value: "Left, right, or combination of sashes" },
      { label: "Glazing performance", value: "Double glazing level, Low-E, laminated or impact glass" },
      { label: "Color", value: "Exterior and interior colors can differ (dual-color finish)" },
      { label: "Screen", value: "None, fixed, or retractable insect screen" },
      { label: "Compliance", value: "Tell us your market so specifications match local requirements" },
    ],
  },
  faq: [
    {
      question: "What is the minimum order quantity?",
      answer:
        "Projects are quoted per order; sample orders and mixed-product orders for a single project are both workable. Tell us your project scope in the quote request and we will confirm the commercial terms.",
    },
    {
      question: "Can I order custom sizes and colors?",
      answer:
        "Yes. Every window is made to project measurements. Sizes, opening directions, glazing and dual-color finishes are all specified per order.",
    },
    {
      question: "How are windows packed for shipping?",
      answer:
        "Windows are protected with foam and corner guards, then packed in export cartons or crates for container shipping. Packing can be adapted to your destination port.",
    },
    {
      question: "Do you support OEM branding?",
      answer:
        "Yes, we produce under OEM arrangements for brand owners. Discuss hardware brands, labeling and packaging during quotation.",
    },
  ],
};
