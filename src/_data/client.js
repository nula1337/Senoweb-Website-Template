export default {
	name: "Senoweb",
	email: "info@senoweb.cz",
	ico: "19538685",
	phoneForTel: "+420731736631",
	phoneFormatted: "+420 731 736 631",
	address: {
		lineOne: "Třebovská 123",
		city: "Ústí nad Orlicí",
		zip: "56203",
		state: "Pardubický kraj",
		country: "CZ",
		mapLink: "https://maps.app.goo.gl/GQmwqUWKd6JMZi8Y7"
	},
	geo: {
		latitude: 49.707127956310046,
		longitude: 16.519943548031982,
	},
	areaServed: "Česká republika",
  	openingHours: [
  	  "Mo-Fr 07:00-16:00",
  	],
	socials: {
		facebook: "https://www.facebook.com/",
		instagram: "https://www.instagram.com/",
		youtube: "https://www.youtube.com/",
		tiktok: "https://www.tiktok.com/",
		whatsapp: "https://wa.me/"
	},
	//! Make sure you include the file protocol (e.g. https://) and that NO TRAILING SLASH is included
	domain: "https://www.senoweb.cz",
	// The default language of the website (used for hreflang and as a fallback)
	defaultLanguage: "cs",
	// Passing the isProduction variable for use in HTML templates
	isProduction: process.env.ELEVENTY_ENV === "PROD"
};
