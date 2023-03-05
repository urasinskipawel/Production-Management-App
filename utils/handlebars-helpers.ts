export const handlebarsHelpers = {
	showShortId: (a: string): string => `${a.substring(0, 8)}...`,
	getCurrentTime: (): string => {
		let date_ob = new Date();
		let hours: number = date_ob.getHours();
		let minutes: number = date_ob.getMinutes();
		let seconds: number = date_ob.getSeconds();
		return `${hours}:${minutes}:${seconds}`;
	},
	changeToUppercase: (a: string): string => a.toUpperCase(),
	firstCharToUppercase: (a: string): string => `${a.charAt(0).toUpperCase()}${a.slice(1).toLowerCase()}`,
	equals: (a: string, b: string): boolean => a === b,
};
