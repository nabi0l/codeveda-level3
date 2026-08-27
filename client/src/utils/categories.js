/**
 * Shared category definitions and lookup utilities for Design Journal / Atelier Journal
 */

export const STUDIO_CATEGORIES = [
  { name: 'UI Design', slug: 'ui-design', count: '03' },
  { name: 'UX Research', slug: 'ux-research', count: '02' },
  { name: 'Case Study', slug: 'case-study', count: '02' },
  { name: 'Tutorial', slug: 'tutorial', count: '02' },
  { name: 'Notes', slug: 'notes', count: '02' },
];

export const CATEGORY_NAMES = STUDIO_CATEGORIES.map(c => c.name);

export const CATEGORY_FILTER_NAMES = ['All', ...CATEGORY_NAMES];

const CATEGORY_SLUG_MAP = STUDIO_CATEGORIES.reduce((acc, cat) => {
  acc[cat.slug] = cat.name;
  return acc;
}, {});

/**
 * Resolve human-readable category name from slug or return raw category
 * @param {string} slug 
 * @returns {string}
 */
export const getCategoryNameFromSlug = (slug) => {
  return CATEGORY_SLUG_MAP[slug] || slug;
};
