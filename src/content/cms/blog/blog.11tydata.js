export default {
	layout: "layouts/post.njk",
	tags: "blog",
	eleventyComputed: {
		preloadImg: data => data.image ? data.image.url : null,
		permalink: data => `/aktuality/${data.page.fileSlug}/index.html`,
	}
};