'use server';

import { fetcher } from '@/lib/fetcher';
import { Pagination } from '@/lib/global-type';
import { fundamentalPage } from '../fundamental-page-schema';

// fetch-fundamental-data
export async function getFundamentalData({
	page = 1,
	size = 20,
	filter = undefined,
}: { page?: number; size?: number; filter?: string } = {}) {
	const searchParams = new URLSearchParams({
		page: page.toString(),
		size: size.toString(),
		...(filter && { filter }),
	});

	return fetcher<Pagination<typeof fundamentalPage>>(
		`/idx-stock-fundamentals/fundamental-data?${searchParams}`
	);
}

// get-export-excel
export const getFundamentalExportToExcel = async () => {
	return fetcher(
		`/idx-stock-fundamentals/get-export-excel-data`
	);
};
