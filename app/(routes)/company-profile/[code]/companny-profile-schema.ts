import z4 from 'zod/v4';

export const companyProfile = z4.object({});
export type CompanyProfileSchema = z4.infer<
	typeof companyProfile
>;
