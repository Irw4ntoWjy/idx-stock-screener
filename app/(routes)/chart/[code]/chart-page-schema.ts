import z4 from 'zod/v4';

export const chartPage = z4.object({
	code: z4.string(),
	name: z4.string(),
	sector: z4.string(),
	active: z4.number(),
	listingDate: z4.number(),
	delistingDate: z4.number(),
	type: z4.number(),
	source: z4.record(z4.string().regex(/^\d+$/), z4.number()),
});
export type ChartPageSchema = z4.infer<typeof chartPage>;
