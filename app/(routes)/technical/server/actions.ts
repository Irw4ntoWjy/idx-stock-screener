'use server';

import { setTechnicalParams } from './fetch-technical-data';
import { revalidateTag } from 'next/cache';

export async function updateTechnicalData(data: {
	page?: number;
	size?: number;
	filter?: string;
}) {
	await setTechnicalParams(data);
	revalidateTag('technical-data', { expire: 0 });
}
