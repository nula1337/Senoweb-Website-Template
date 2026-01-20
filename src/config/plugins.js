/**
 * Internationalization (i18n) configuration for Eleventy
 * @typedef {Object} I18nConfig
 * @property {string} defaultLanguage - Any valid BCP 47-compatible language tag is supported (e.g., "cs", "en").
 * @property {Object} [filters] - Rename the default universal filter names.
 * @property {string} [filters.url] - Transform a URL with the current page’s locale code. Default: "locale_url".
 * @property {string} [filters.links] - Find the other localized content for a specific input file. Default: "locale_links".
 * @property {"strict"|"allow-fallback"|"never"} [errorMode] - When to throw errors for missing localized content files.
 * - "strict": Throw an error if content is missing at /locale/slug.
 * - "allow-fallback": Only throw when content is missing at both /locale/slug and root /slug.
 * - "never": Don’t throw errors for missing content.
 */

/** @type {I18nConfig} */
export const configI18n = {
    defaultLanguage: "cs"
};


/**
 * Configuration for Eleventy Sharp Image plugin
 * @typedef {Object} ImageConfig
 * @property {string} urlPath - The web-accessible path prefix for images (e.g., "/assets/images").
 * @property {string} outputDir - The physical file system directory where images will be saved.
 * @property {"auto"|"content"|"stats"} [cacheStrategy] - When to re-run the image processing. 
 * - "auto": Re-run when the input file changes.
 * - "content": Re-run only when the image content actually changes.
 * - "stats": Re-run when the file stats (size/date) change.
 * @property {boolean} [autoRotate] - Automatically apply EXIF orientation correction. Default: true.
 */

/** @type {ImageConfig} */
export const configImages = {
    urlPath: "/assets/images",
    outputDir: "public/assets/images"
};