import z4 from 'zod/v4';

export const technicalPage = z4.object({
	sector: z4.string(),
	stockCode: z4.string(),
	marketCap: z4.number(),
	date: z4.string(),
	name: z4.string(),
	openPrice: z4.number(),
	closePrice: z4.number(),
	volume: z4.number(),
	movingAverage: z4.record(
		z4.string().regex(/^\d+$/),
		z4.number()
	),
});
export type TechnicalPageSchema = z4.infer<typeof technicalPage>;
