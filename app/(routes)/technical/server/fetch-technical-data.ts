'use server';

import { fetcher } from '@/lib/fetcher';
import { Pagination } from '@/lib/global-type';
import { technicalPage } from '../technical-page-schema';

// fetch-technical-data
export async function getTechnicalData({
	page = 1,
	size = 20,
	filter = undefined,
}: { page?: number; size?: number; filter?: string } = {}) {
	const searchParams = new URLSearchParams({
		page: page.toString(),
		size: size.toString(),
		...(filter && { filter }),
	});
	return await fetcher<Pagination<typeof technicalPage>>(
		`/idx-stocks-ohlcv/technical-data?${searchParams}`
	);
}

// get-export-excel
export const getTechnicalExportToExcel = async () => {
	return await fetcher(
		`/idx-stocks-ohlcv/get-export-excel-data`
	);
};

// get-current-ma-config
export const getMaConfig = async () => {
	return await fetcher<number[]>(
		`/moving-average/current-config`
	);
};

// post new ma config
export const postNewMaConfig = async (config: number[]) => {
	const AUTOMATION_URL = process.env.IDX_STOCK_AUTOMATION;

	if (!AUTOMATION_URL) {
		throw new Error('Automation variable is not set');
	}

	const params = new URLSearchParams();
	params.append('new_ma', config.join(','));

	return await fetcher(
		`/idx-screeners/moving-average?` + params,
		{
			baseUrl: AUTOMATION_URL,
		}
	);
};
