'use server';

import { fetcher } from '@/lib/fetcher';
import { ChartPageSchema } from '../chart-page-schema';

export const fetchChartData = async (code: string) => {
	return fetcher<ChartPageSchema>(`/idx-stocks/${code}`);
};
