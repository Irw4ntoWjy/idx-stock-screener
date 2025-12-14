import z4 from 'zod/v4';

export const fundamentalPage = z4.object({
	sector: z4.string(),
	stockCode: z4.string(),
	name: z4.string(),
	suspend: z4.boolean(),
	marketCap: z4.number(),
	indexCode: z4.string(),
	volume: z4.number(),
	closePrice: z4.number(),
	bv: z4.number(),
	pbv: z4.number(),
	per: z4.number(),
	eps: z4.number(),
	der: z4.number(),
	roaPercent: z4.number(),
	roePercent: z4.number(),
	npmPercent: z4.number(),
});
export type FundamentalPageSchema = z4.infer<
	typeof fundamentalPage
>;
