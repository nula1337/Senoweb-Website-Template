// ─────────────────────────────────────────────────────────────────────────────
// ELEVENTY CONFIGURATION
// This file configures how Eleventy builds your static site
// Documentation: https://www.11ty.dev/docs/config/
// ─────────────────────────────────────────────────────────────────────────────

// 📦 Plugin Imports
import pluginImages from "@codestitchofficial/eleventy-plugin-sharp-images";
import pluginMinifier from "@codestitchofficial/eleventy-plugin-minify";
import pluginNavigation from "@11ty/eleventy-navigation";
import { I18nPlugin } from "@11ty/eleventy";

// ⚙️ Configuration Files
import { configI18n, configImages } from "./src/config/plugins.js";

// 🔧 Processing Functions
import css from "./src/config/processors/css.js";
import javascript from "./src/config/processors/javascript.js";

// 🛠️ Utilities
import { isoDate, postDate } from "./src/config/filters.js";

const isProduction = process.env.ELEVENTY_ENV === "PROD";


/** @param {import('@11ty/eleventy/UserConfig').default} eleventyConfig*/
export default (eleventyConfig) => {
    // ═════════════════════════════════════════════════════════════════════════
    // LANGUAGES
    // Using Eleventy's build events to process non-template languages
    // Learn more: https://www.11ty.dev/docs/events/
    // ═════════════════════════════════════════════════════════════════════════

    /*
     * CSS Processing
     * These processors handle Tailwind CSS compilation and minification.
     * - CSS: Processed with Tailwind CSS v4 (Oxide engine) and PostCSS.
     * - Minification: Optimized via cssnano for production builds.
     */
    eleventyConfig.on("eleventy.before", async () => {
        // Only minify CSS on production
        const minify = isProduction ? true : false;
        await css({ minify: minify });
    });

    /*
     * JavaScript Processing
     * These processors handle bundling, transpiling, and minification
     * - JavaScript: Compiled with esbuild for modern bundling
     */
    eleventyConfig.on("eleventy.after", javascript);

    // ═════════════════════════════════════════════════════════════════════════
    // PLUGINS
    // Extend Eleventy with additional functionality
    // Learn more: https://www.11ty.dev/docs/plugins/
    // ═════════════════════════════════════════════════════════════════════════

    /*
     * 🖼️ Image Optimization
     * Resize and optimize images for better performance using {% getUrl %}
     * Documentation: https://github.com/CodeStitchOfficial/eleventy-plugin-sharp-images
     */
    eleventyConfig.addPlugin(pluginImages, configImages);

    /*
     * 🧭 Navigation Plugin
     * Enables hierarchical navigation structure via front matter
     * Documentation: https://www.11ty.dev/docs/plugins/navigation/
     */
    eleventyConfig.addPlugin(pluginNavigation);

    /*
     * 🌍 Internationalization (i18n) Plugin
     * Adds support for translating content and generating localized URLs
     * Documentation: https://www.11ty.dev/docs/plugins/i18n/
     */
    eleventyConfig.addPlugin(I18nPlugin, configI18n);

    /*
     * 📦 Production Minification
     * Minifies HTML, CSS, JSON, XML, XSL, and webmanifest files
     * Only runs during production builds (npm run build)
     * Documentation: https://github.com/CodeStitchOfficial/eleventy-plugin-minify
     */
    if (isProduction) {
        eleventyConfig.addPlugin(pluginMinifier);
    }

    // ═════════════════════════════════════════════════════════════════════════
    // PASSTHROUGH COPIES
    // Copy files directly to output without processing
    // Learn more: https://www.11ty.dev/docs/copy/
    // ═════════════════════════════════════════════════════════════════════════

    eleventyConfig.addPassthroughCopy("./src/assets"); // Static assets
    eleventyConfig.addPassthroughCopy("./src/admin"); // CMS admin files
    eleventyConfig.addPassthroughCopy("./src/_redirects"); // Redirect rules

    // ═════════════════════════════════════════════════════════════════════════
    // FILTERS
    // Transform data in templates at build time
    // Learn more: https://www.11ty.dev/docs/filters/
    // ═════════════════════════════════════════════════════════════════════════

    /*
     * 📅 Human-Readable Date Formatting Filter
     * Converts JavaScript dates to human-readable format
     * Usage: {{ "2023-12-02" | postDate }}
     * Powered by Luxon: https://moment.github.io/luxon/api-docs/
     */
    eleventyConfig.addFilter("postDate", postDate);

    /*
     * 📅 ISO Date Formatting Filter
     * Converts JavaScript dates to ISO 8601 format
     * Usage: {{ "2023-12-02" | isoDate }}
     * Powered by Luxon: https://moment.github.io/luxon/api-docs/
     */
    eleventyConfig.addFilter("isoDate", isoDate);

    /*
     * 🔢 Limit Filter
     * Returns a limited number of items from the beginning of an array
     * Usage: {{ collection | limit(5) }}
     * Useful for truncating lists, e.g. showing only the latest N items
     */
    eleventyConfig.addFilter("limit", function (array, limit) {
        return array.slice(0, limit);
    });

    /*
     * 🏷️ Page Language Filter
     * Filters collections by the current page language for i18n compatibility
     * Usage: {{ collections.all | pageLang | eleventyNavigation }}
     */
    eleventyConfig.addFilter("pageLang", function (value) {
        return value.filter(item => item.page.lang === this.page.lang)
    });

    /**
     * 🔍 Multi-Property Equality Filter
     * Filters a collection based on multiple property-value pairs.
     * Supports nested properties like "eleventyNavigation.parent".
     * Usage:
     *   {{ collections.all | whereAll({ category: "skola", "eleventyNavigation.parent": "Škola" }) }}
     */
    eleventyConfig.addFilter("whereAll", function (collection, conditions = {}) {
        if (!Array.isArray(collection)) return [];

        // Helper for nested props like "eleventyNavigation.parent"
        const getDeep = (obj, path) => {
            return path.split(".").reduce((acc, key) => acc && acc[key], obj);
        }

        return collection.filter((item) => {
            return Object.entries(conditions).every(([prop, expected]) => {
                const actual = getDeep(item.data, prop);
                return actual === expected;
            });
        });
    });

    // ═════════════════════════════════════════════════════════════════════════
    // SHORTCODES
    // Generate dynamic content with JavaScript
    // Learn more: https://www.11ty.dev/docs/shortcodes/
    // ═════════════════════════════════════════════════════════════════════════

    /*
     * 📆 Current Year Shortcode
     * Outputs the current year (useful for copyright notices)
     * Usage: {% year %}
     * Updates automatically with each build
     */
    eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

    // ═════════════════════════════════════════════════════════════════════════
    // BUILD CONFIGURATION
    // Define input/output directories and template engine
    // ═════════════════════════════════════════════════════════════════════════

    return {
        dir: {
            input: "src", // Source files directory
            output: "public", // Build output directory
            includes: "_includes", // Partial templates directory
            data: "_data", // Global data files directory
        },
        htmlTemplateEngine: "njk", // Nunjucks for HTML templates
    };
};
