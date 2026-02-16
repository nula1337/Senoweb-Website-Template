import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import nested from "postcss-nested";
import postcss from "postcss";
import cssnano from "cssnano";
import fs from "fs/promises";
import path from "path";


/**
 * Builds the main CSS bundle using PostCSS and Tailwind CSS.
 *
 * Reads the source CSS file, processes it with Tailwind CSS (v4),
 * optionally minifies the output using cssnano, and writes the final
 * stylesheet to the public assets directory.
 *
 * @param {Object} options - Build options.
 * @param {boolean} [options.minify=false] - Whether to minify the output CSS using cssnano.
 * @returns {Promise<void>} Resolves when the CSS file has been successfully built and written.
 *
 *
 * @example
 * // Build with minification
 * await css({ minify: true });
 */
export default async ({ minify = false }) => {
    const inputPath = "./src/assets/css/input.css";
    const outputDir = "./public/assets/css";
    const outputPath = path.join(outputDir, "main.css");

    const css = await fs.readFile(inputPath, "utf8");

    // Setup PostCSS plugins
    const plugins = [tailwindcss, autoprefixer, nested];

    // Add minification if requested
    if (minify) {
        plugins.push(cssnano({ preset: 'default' }));
    }

    // Process with PostCSS + Tailwind 3
    const result = await postcss(plugins).process(css, {
        from: inputPath,
        to: outputPath
    });

    await fs.mkdir(outputDir, { recursive: true });
    await fs.writeFile(outputPath, result.css);
};