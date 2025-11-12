'use server';

import { setTechnicalParams } from './fetch-technical-data';
import { revalidateTag } from 'next/cache';

export const getExportToExcelData = async () => {
	const backendUrl = process.env.IDX_STOCK_SCREENER_BE;
	if (!backendUrl) throw new Error('Backend URL not configured');

	const res = await fetch(
		`${backendUrl}/idx-stocks-ohlcv/get-export-excel-data`,
		{
			headers: { 'Content-Type': 'application/json' },
			cache: 'force-cache',
			next: { tags: ['export-technical-data'] },
		}
	);

	if (!res.ok)
		throw new Error(`Fetch failed: ${res.statusText}`);
	return res.json();
};

export async function updateTechnicalData(data: {
	page?: number;
	size?: number;
	filter?: string;
}) {
	await setTechnicalParams(data);
	revalidateTag('technical-data', { expire: 0 });
}
