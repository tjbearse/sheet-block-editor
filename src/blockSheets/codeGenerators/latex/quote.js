const quoteSymb = '"';
export const quote = (string) =>
	quoteSymb + string.replace(/"/g, '""') + quoteSymb

export default quote;
