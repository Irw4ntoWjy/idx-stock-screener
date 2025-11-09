import type { technicalPage } from './technical-page-schema';
import TechnicalPage from './technical-page';
import { Pagination } from '@/lib/global-type';

const fetchTechnicalData = async (
	page: number = 0,
	size: number = 20
): Promise<Pagination<typeof technicalPage>> => {
	const backendUrl = process.env.IDX_STOCK_SCREENER_BE;

	// validate backend url
	if (!backendUrl) {
		throw new Error('Backend URL not configured');
	}

	// built in params
	const url = new URL(
		`${backendUrl}/idx-stocks-ohlcv/technical-data`
	);
	url.searchParams.append('page', page.toString());
	url.searchParams.append('size', size.toString());

	const response = await fetch(url, {
		headers: { 'Content-Type': 'application/json' },
		cache: 'no-store',
	});

	if (!response.ok) {
		throw new Error(`Fetch failed: ${response.statusText}`);
	}

	return response.json();
};

export default async function Technical() {
	const data = await fetchTechnicalData();
	return <TechnicalPage data={data} />;
}
