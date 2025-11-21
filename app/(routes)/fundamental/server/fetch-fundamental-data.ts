'use server';

import { fetcher } from '@/lib/fetcher';
import { Pagination } from '@/lib/global-type';
import { revalidateTag } from 'next/cache';
import { fundamentalPage } from '../fundamental-page-schema';

// default params
let params = { page: 1, size: 20, filter: '' };

// function to update table params
export async function setFundamentalParams(
	newParams: Partial<typeof params>
) {
	params = { ...params, ...newParams };
}

// fetch-technical-data
export const fetchFundamentalData = async (): Promise<
	Pagination<typeof fundamentalPage>
> => {
	const { page, size, filter } = params;

	const searchParams = new URLSearchParams({
		page: page.toString(),
		size: size.toString(),
		...(filter && { filter }),
	});

	return fetcher<Pagination<typeof fundamentalPage>>(
		`/idx-stock-fundamentals/fundamental-data?${searchParams}`,
		{ tags: ['fundamental-data'] }
	);
};

// update-technical-data
export async function updateFundamentalData(data: {
	page?: number;
	size?: number;
	filter?: string;
}) {
	await setFundamentalParams(data);
	revalidateTag('fundamental-data', { expire: 0 });
}

// get-export-excel
export const getFundamentalExportToExcel = async () => {
	return fetcher(
		`/idx-stock-fundamentals/get-export-excel-data`
	);
};
