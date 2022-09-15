export const slugify = (value: string) => {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

export const isNumeric = (value: string) => {
  return /^\d+$/.test(value);
};
