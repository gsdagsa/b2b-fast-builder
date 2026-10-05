export const site = {
  name: "topaluminumwindow",
  legalName: "topaluminumwindow",
  origin: "https://topaluminumwindows.com",
  founded: 2017,
  factoryLocation: "Foshan, Guangdong, China",
  exportCountries: [
    "United States",
    "Australia",
    "Canada",
    "Saudi Arabia",
    "United Kingdom",
    "France",
    "United Arab Emirates",
    "Israel",
    "Ireland",
  ] as const,
  /** Contact channels with verified values only; no invented email or phone. */
  contactEmail: null as string | null,
  contactPhone: null as string | null,
} as const;

export type Site = typeof site;
