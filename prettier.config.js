/** @type {import("prettier").Config} */
const config = {
	useTabs: true,
	trailingComma: "none",
	printWidth: 120,
	singleAttributePerLine: false,
	plugins: ["prettier-plugin-nunjucks"],
	overrides: [
		{
			files: ["*.njk", "*.nunjucks", "*.nunj"],
			options: {
				parser: "nunjucks",
				htmlWhitespaceSensitivity: "ignore",
				classAttributeLayout: "single-line"
			}
		}
	]
};

export default config;
