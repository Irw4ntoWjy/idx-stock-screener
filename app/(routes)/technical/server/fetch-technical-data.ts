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
	return fetcher<Pagination<typeof technicalPage>>(
		`/idx-stocks-ohlcv/technical-data?${searchParams}`
	);
}

// get-export-excel
export const getTechnicalExportToExcel = async () => {
	return fetcher(`/idx-stocks-ohlcv/get-export-excel-data`);
};
