export const normalizeKey = (name: string): string =>
  name.trim().toLowerCase().replace(/\s+/g, "_");
