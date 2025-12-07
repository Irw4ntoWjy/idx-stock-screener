'use server';

import z4 from 'zod/v4';

const BACKEND_URL = process.env.IDX_STOCK_SCREENER_BE;

if (!BACKEND_URL) {
	throw new Error('Backend variable is not set');
}

if (!BACKEND_URL && process.env.NODE_ENV === 'production') {
	throw new Error('env is required in production');
}

type HttpMethod = 'GET' | 'POST';

type CacheMode =
	| 'default'
	| 'no-store'
	| 'reload'
	| 'force-cache'
	| 'only-if-cached';

type FetchOptions<T> = Omit<RequestInit, 'method'> & {
	method?: HttpMethod;
	tags?: string[];
	revalidate?: number | false;
	cache?: CacheMode | 'no-cache';
	responseType?: 'JSON' | 'TEXT';
	schema?: z4.ZodType<T>;
	baseUrl?: string;
};

export const fetcher = async <T>(
	endpoint: string,
	options: FetchOptions<T> = {}
) => {
	const {
		method = 'GET',
		tags = [],
		revalidate = false,
		baseUrl,
		...fetchOptions
	} = options;

	const effectiveBaseUrl = baseUrl || BACKEND_URL;
	if (!effectiveBaseUrl) {
		throw new Error('No base URL provided');
	}

	const base = effectiveBaseUrl.endsWith('/')
		? effectiveBaseUrl
		: effectiveBaseUrl + '/';
	const path = endpoint.startsWith('/')
		? endpoint.slice(1)
		: endpoint;
	const url = new URL(path, base);

	const response = await fetch(url, {
		method,
		...fetchOptions,
		headers: {
			'Content-Type': 'application/json',
			...fetchOptions.headers,
		},
		cache: 'no-cache',
		next: {
			tags: [...tags],
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

	if (options.schema && data) {
		return options.schema.parse(data);
	}
	return data as T;
};
