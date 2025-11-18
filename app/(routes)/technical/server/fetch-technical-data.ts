'use server';

import { fetcher } from '@/lib/fetcher';
import { Pagination } from '@/lib/global-type';
import { revalidateTag } from 'next/cache';
import { technicalPage } from '../technical-page-schema';

// default params
let params = { page: 1, size: 20, filter: '' };

// function to update table params
export async function setTechnicalParams(
	newParams: Partial<typeof params>
) {
	params = { ...params, ...newParams };
}

// fetch-technical-data
export const fetchTechnicalData = async (): Promise<
	Pagination<typeof technicalPage>
> => {
	const { page, size, filter } = params;

	const searchParams = new URLSearchParams({
		page: page.toString(),
		size: size.toString(),
		...(filter && { filter }),
	});

	return fetcher<Pagination<typeof technicalPage>>(
		`/idx-stocks-ohlcv/technical-data?${searchParams}`,
		{ tags: ['technical-data'] }
	);
};

// update-technical-data
export async function updateTechnicalData(data: {
	page?: number;
	size?: number;
	filter?: string;
}) {
	await setTechnicalParams(data);
	revalidateTag('technical-data', { expire: 0 });
}

//get-export-excel
export const getExportToExcelData = async () => {
	return fetcher(`/idx-stocks-ohlcv/get-export-excel-data`, {
		tags: ['export-technical-data'],
	});
};
