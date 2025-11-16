'use server';

import { Pagination } from '@/lib/global-type';
import { technicalPage } from '../technical-page-schema';

// default params
let params = { page: 1, size: 20, filter: '' };

// function to update table params
export async function setTechnicalParams(
	newParams: Partial<typeof params>
) {
	params = { ...params, ...newParams };
}

export const fetchTechnicalData = async (): Promise<
	Pagination<typeof technicalPage>
> => {
	const { page, size, filter } = params;

	const backendUrl = process.env.IDX_STOCK_SCREENER_BE;
	if (!backendUrl) throw new Error('Backend URL not configured');

	const url = new URL(
		`${backendUrl}/idx-stocks-ohlcv/technical-data`
	);
	url.searchParams.append('page', page.toString());
	url.searchParams.append('size', size.toString());
	if (filter) url.searchParams.append('filter', filter);

	const res = await fetch(url, {
		headers: { 'Content-Type': 'application/json' },
		cache: 'force-cache',
		next: { tags: ['technical-data'] },
	});

	if (!res.ok)
		throw new Error(`Fetch failed: ${res.statusText}`);
	return res.json();
};
