import z4 from 'zod/v4';

export const pagination = <T extends z4.ZodType>(data: T) =>
	z4.object({
		content: z4.array(data),
		page: z4.object({
			totalElements: z4.number(),
			totalPages: z4.number(),
			size: z4.number(),
			number: z4.number(),
		}),
	});

export type Pagination<T extends z4.ZodType> = z4.infer<
	ReturnType<typeof pagination<T>>
>;
