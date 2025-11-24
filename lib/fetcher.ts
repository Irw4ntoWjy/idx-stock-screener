'use server';

import z4 from 'zod/v4';

const BACKEND_URL = process.env.IDX_STOCK_SCREENER_BE;

if (!BACKEND_URL) {
	throw new Error('Backend variable is not set');
}

type CacheMode =
	| 'default'
	| 'no-store'
	| 'reload'
	| 'force-cache'
	| 'only-if-cached';

type FetchOptions<T> = Omit<RequestInit, 'method'> & {
	tags?: string[];
	revalidate?: number | false;
	cache?: CacheMode | 'no-cache';
	responseType?: 'JSON' | 'TEXT';
	schema?: z4.ZodType<T>;
};

export const fetcher = async <T>(
	endpoint: string,
	options: FetchOptions<T> = {}
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
		cache: 'no-cache',
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

	let data: any;
	if (options.responseType === 'TEXT') {
		data = await response.text();
	} else {
		data = await response.json();
	}

	if (options.schema) {
		return options.schema.parse(data);
	}
	return data as T;
};
