import esbuild from "esbuild";
import { glob } from "glob";

const isProduction = process.env.ELEVENTY_ENV === "PROD";

// Files to exclude from esbuild processing - Cookie Consent by default
const excludeFiles = ["cookieconsent-config.js", "cookieconsent.umd.js", "fslightbox.js"];


/**
 * JavaScript Asset Processor
 * 
 * Scans the source directory for JavaScript files, filters out excluded third-party 
 * libraries, and uses esbuild to bundle and transpile them into the public directory.
 * 
 * - **Source:** `src/assets/js/**\/*.js`
 * - **Output:** `./public/assets/js`
 * - **Exclusions:** Defined in `excludeFiles` (e.g., `fslightbox.js`)
 * 
 * @async
 * @function processJs
 * @returns {Promise<void>} A promise that resolves when the build process is complete.
 */
export default async () => {
    let files = await glob("src/assets/js/**/*.js");

    // Filter out excluded files
    files = files.filter(file => {
        return !excludeFiles.some(excluded =>
            file.endsWith(`/` + excluded) ||
            file.endsWith(`\\` + excluded) ||
            file.endsWith(excluded)
        );
    });

    // Skip if no files are found to avoid esbuild error
    if (files.length === 0) return;

    await esbuild.build({
        entryPoints: files,
        outdir: "./public/assets/js",
        write: true,
        bundle: true,
        minify: isProduction,
        sourcemap: !isProduction,
        target: isProduction ? "es6" : "esnext",
    });
};