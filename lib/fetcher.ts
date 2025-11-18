'use server';

const BACKEND_URL = process.env.IDX_STOCK_SCREENER_BE;

if (!BACKEND_URL) {
	throw new Error('Backend variable is not set');
}

type FetchOptions = Omit<RequestInit, 'method'> & {
	tags?: string[];
	revalidate?: number | false;
};

export const fetcher = async <T>(
	endpoint: string,
	options: FetchOptions = {}
) => {
	const {
		tags = [],
		revalidate = false,
		...fetchOptions
	} = options;

	const base = BACKEND_URL.endsWith('/')
		? BACKEND_URL
		: BACKEND_URL + '/';
	const path = endpoint.startsWith('/')
		? endpoint.slice(1)
		: endpoint;
	const url = new URL(path, base);

	const response = await fetch(url, {
		...fetchOptions,
		headers: {
			'Content-Type': 'application/json',
			...fetchOptions.headers,
		},
		cache: 'force-cache',
		next: {
			tags: ['idx-stocks', ...tags],
			revalidate,
		},
	});

	if (!response.ok) {
		const text = await response.text().catch(() => '');
		throw new Error(
			`API fetch failed [${response.status}]: ${
				response.statusText
			}${text ? ` - ${text}` : ''}`
		);
	}

	return response.json() as Promise<T>;
};
