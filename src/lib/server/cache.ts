const success_ttl = 10 * 60 * 1000;
const failure_ttl = 60 * 1000;

type Entry<T> = { value: Promise<T | null>; expires: number };

export function cached<T>(load: () => Promise<T | null>) {
	let entry: Entry<T> | null = null;

	return () => {
		const now = Date.now();
		if (entry && entry.expires > now) return entry.value;

		const current: Entry<T> = { value: load(), expires: now + success_ttl };
		entry = current;
		current.value.then((result) => {
			if (result === null) current.expires = now + failure_ttl;
		});

		return current.value;
	};
}
