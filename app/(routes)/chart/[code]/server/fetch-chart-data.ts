'use server';

import { ChartPageSchema } from '../chart-page-schema';

export const fetchChartData = async (
	code: string
): Promise<ChartPageSchema> => {
	const backendUrl = process.env.IDX_STOCK_SCREENER_BE;
	if (!backendUrl) throw new Error('Backend URL not configured');

	const res = await fetch(`${backendUrl}/idx-stocks/${code}`, {
		headers: { 'Content-Type': 'application/json' },
		cache: 'force-cache',
	});

	if (!res.ok)
		throw new Error(`Fetch failed: ${res.statusText}`);

	return res.json();
};
