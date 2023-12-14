/**
 * Slice a text to a specified maximum length and add ellipsis if necessary.
 *
 * @param {string} text - The text to be sliced.
 * @param {number} [max=50] - The maximum length of the sliced text. Defaults to 50.
 * @returns {string} - The sliced text with ellipsis if necessary.
 */
export const textSlice = (text: string, max: number = 35) => {
  if (text.length > max) return `${text.slice(0, max)}...`;
  else return text;
};
