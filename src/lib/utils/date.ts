// UTC on both sides: a YYYY-MM-DD date must not shift a day between the server and the browser
const longDate = new Intl.DateTimeFormat('en-US', { dateStyle: 'long', timeZone: 'UTC' });

export function formatDate(date: string) {
	return longDate.format(new Date(date));
}
