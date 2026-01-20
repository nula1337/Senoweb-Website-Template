import { DateTime } from "luxon";


/**
 * Converts a date into a machine-readable ISO 8601 string.
 * Useful for <time datetime="..."> attributes.
 * 
 * @example "2024-03-24T12:00:00.000Z"
 * @param {Date|string|number} dateObj - The date to convert.
 * @returns {string|null} The ISO formatted date string.
 */
export const isoDate = (dateObj) => {
    const date = new Date(dateObj);

    return DateTime.fromJSDate(date).toISO();
};


/**
 * Formats a date into a localized Czech string using medium date format.
 * 
 * @example "24. 3. 2024"
 * @param {Date|string|number} dateObj - The date to format.
 * @returns {string} The localized date string in 'cs' locale.
 */
export const postDate = (dateObj) => {
    const date = new Date(dateObj);

    return DateTime.fromJSDate(date).setLocale("cs").toLocaleString(DateTime.DATE_MED);
};