export const handlebarsHelpers = {
	showShortId: (a: string): any => {
		return `${a.substring(0, 8)}...`;
	},
};
