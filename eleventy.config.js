// ─────────────────────────────────────────────────────────────────────────────
// ELEVENTY CONFIGURATION
// This file configures how Eleventy builds your static site
// Documentation: https://www.11ty.dev/docs/config/
// ─────────────────────────────────────────────────────────────────────────────

// 📦 Plugin Imports
import pluginMinifier from "@codestitchofficial/eleventy-plugin-minify";
import { I18nPlugin } from "@11ty/eleventy";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";

// ⚙️ Configuration Files
import { configI18n } from "./src/config/plugins.js";

// 🔧 Processing Functions
import css from "./src/config/processors/css.js";
import javascript from "./src/config/processors/javascript.js";

// 🛠️ Utilities
import { isoDate, postDate } from "./src/config/filters.js";

// 🔗 Dependencies
import fs from "fs/promises";

const isProduction = process.env.ELEVENTY_ENV === "PROD";


/**
 * Helper to safely access nested properties
 */
const getDeep = (obj, path) => {
    return path.split('.').reduce((acc, part) => acc && acc[part] !== undefined ? acc[part] : undefined, obj);
};

/**
 * Helper to normalize a string value to lower-case
 */
const normalize = (v) => {
    if (v === undefined || v === null) return v;
    return String(v).trim().toLowerCase().replace(/\s+/g, '');
};


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
     * Resize and optimize images for better performance using the official eleventy-img plugin.
     * Documentation: https://www.11ty.dev/docs/plugins/image/
     */
    let configImages = {
        urlPath: "/assets/images/",
        outputDir: "public/assets/images/",
        formats: ["avif", "webp", "jpeg", "svg"],
        widths: [600, 1200, 1920, 2880, "auto"], // Generates these sizes - 1.5 * 400 (mobile), 1.5 * 800 (tablet), 1.5 * 1280 (small desktop), 1.5 * 1920 (desktop)
        svgShortCircuit: true, // Skip optimizing SVG images to raster formats
        defaultAttributes: {
            loading: "lazy",
            decoding: "async",
            "aria-hidden": "true",
            draggable: "false"
        }
    };

    if (isProduction) {
        // On production set the output path to .cache folder which is preserved between builds on Cloudflare
        configImages.outputDir = ".cache/images/";

        // After eleventy processing is done, copy the images to live website
        eleventyConfig.on("eleventy.after", async () => {
            try {
                await fs.access(".cache/images");
                await fs.cp(".cache/images", "public/assets/images", {
                    recursive: true,
                    force: false,           // don't overwrite existing files
                    errorOnExist: false     // silently skip if destination exists
                });
            } catch {
                // .cache/images doesn't exist yet, nothing to copy
            }
        });
    }

    eleventyConfig.addPlugin(eleventyImageTransformPlugin, configImages);

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
        if (!Array.isArray(array)) {
            return [];
        }

        return array.slice(0, limit);
    });

    /*
     * 🏷️ Page Language Filter
     * Filters collections by the current page language for i18n compatibility
     * Usage: {{ collections.all | pageLang }}
     */
    eleventyConfig.addFilter("pageLang", function (value) {
        return value.filter(item => item.page.lang === this.page.lang)
    });

    /*
     * 🔡 String Normalization Filter
     * Converts strings to lowercase and removes all internal/external whitespace.
     * Usage: {{ phone | normalize }} or {{ email | normalize }}
     */
    eleventyConfig.addFilter("normalize", function (value) {
        return normalize(value);
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

        return collection.filter((item) => {
            if (!item) return false;

            return Object.entries(conditions).every(([prop, expected]) => {
                // Check item.data first (for Eleventy collections), fallback to the item itself (for flat data)
                const target = item.data && typeof item.data === 'object' ? item.data : item;
                const actual = getDeep(target, prop);

                // If the value in the file is an array, check if it contains the expected value
                if (Array.isArray(actual)) {
                    return actual.includes(expected);
                }

                // Fallback to strict equality for strings/booleans
                return actual === expected;
            });
        });
    });

    /**
     * 🎯 Find Single Item Filter
     * Finds the first item in a collection that matches multiple property-value pairs.
     * Supports nested properties and performs lenient (case-insensitive) matching.
     * Usage:
     *   {{ collections.zamestnanci | findWhere({ "data.firstName": "Jan", "data.lastName": "Novák" }) }}
     */
    eleventyConfig.addFilter("findWhere", function (collection, conditions = {}, useLenientMatch = true) {
        if (!Array.isArray(collection) || Object.keys(conditions).length === 0) {
            return undefined;
        }

        return collection.find((item) => {
            return Object.entries(conditions).every(([prop, expectedValue]) => {
                // We check the root of the item. 
                // In 11ty, most things are in item.data (frontmatter) or item (system)
                let actualValue = getDeep(item, prop);

                // Fallback: If not found on root, check in .data (common 11ty use case)
                if (actualValue === undefined && !prop.startsWith('data.')) {
                    actualValue = getDeep(item.data, prop);
                }

                if (useLenientMatch) {
                    return normalize(actualValue) === normalize(expectedValue);
                }

                return actualValue === expectedValue;
            });
        });
    });

    /**
     * ↕️ Sorting Filter
     * Sorts an array of objects by a specified key.
     * Supports nested properties (e.g., "data.lastName") and Czech locale-aware sorting.
     * Usage:
     *   {{ collections.zamestnanci | sortBy("data.lastName", "asc") }}
     */
    eleventyConfig.addFilter("sortBy", function (array, key, order = 'asc') {
        if (!Array.isArray(array)) return array;

        const direction = order.toLowerCase() === 'desc' ? -1 : 1;

        return [...array].sort((a, b) => {
            let valA = getDeep(a, key);
            let valB = getDeep(b, key);

            // Push null/undefined to the end
            if (valA == null) return 1;
            if (valB == null) return -1;

            // Try to parse both values as dates
            const dateA = valA instanceof Date ? valA : new Date(valA);
            const dateB = valB instanceof Date ? valB : new Date(valB);

            // If both are valid dates, compare via timestamp
            if (!isNaN(dateA.getTime()) && !isNaN(dateB.getTime())) {
                return (dateA.getTime() - dateB.getTime()) * direction;
            }

            // Numeric handling
            if (typeof valA === 'number' && typeof valB === 'number') {
                return (valA - valB) * direction;
            }

            // String/locale handling
            return String(valA).localeCompare(String(valB), { sensitivity: 'base' }) * direction;
        });
    });

    /**
     * 🗂️ Group by Property Filter
     * Groups an array of objects by a key, with optional custom sort order for groups.
     * Supports nested properties and handles values that are arrays (multi-grouping).
     * Usage:
     *   {{ collections.zamestnanci | groupBy("data.group", ["Vedení školy", "Třídní učitelé 1. stupně"]) }}
     */
    eleventyConfig.addFilter("groupBy", (array, key, order = 'asc') => {
        if (!Array.isArray(array)) return [];

        const ungroupedKey = "_ungrouped";
        const grouped = {};

        // 1. Group the items
        array.forEach(item => {
            const groupValue = getDeep(item, key);
            if (Array.isArray(groupValue)) {
                if (groupValue.length === 0) {
                    (grouped[ungroupedKey] = grouped[ungroupedKey] || []).push(item);
                } else {
                    groupValue.forEach(val => {
                        (grouped[val] = grouped[val] || []).push(item);
                    });
                }
            } else {
                const groupKey = groupValue ?? ungroupedKey;
                (grouped[groupKey] = grouped[groupKey] || []).push(item);
            }
        });

        const allKeys = Object.keys(grouped);
        let sortedKeys;

        // Determine Sort Logic
        if (Array.isArray(order)) {
            // Custom Array Order (e.g., ["Vedení", "Učitelé"])
            const orderedKeys = order.filter(k => allKeys.includes(k));
            const remainingKeys = allKeys
                .filter(k => !order.includes(k))
                .sort((a, b) => a.localeCompare(b, 'cs'));
            sortedKeys = [...orderedKeys, ...remainingKeys];
        } else {
            // Directional String (e.g., "asc" or "desc")
            const direction = (typeof order === 'string' && order.toLowerCase() === 'desc') ? -1 : 1;
            sortedKeys = allKeys.sort((a, b) => a.localeCompare(b, 'cs') * direction);
        }

        // Map to the final structure
        return sortedKeys.map(groupKey => ({
            key: groupKey,
            items: grouped[groupKey]
        }));
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