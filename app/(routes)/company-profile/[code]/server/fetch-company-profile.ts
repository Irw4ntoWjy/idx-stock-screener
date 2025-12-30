import { fetcher } from '@/lib/fetcher';
import {
	companyProfileData,
	CompanyProfileSchema,
} from '../company-profile-schema';

export const fetchCompanyProfile = async (code: string) => {
	return fetcher<CompanyProfileSchema>(
		`/idx-company-profile/profile/${code}`,
		{ schema: companyProfileData }
	);
};

export const refetchNewestCompanyProfile = async (
	code: string
) => {
	const AUTOMATION_URL = process.env.IDX_STOCK_AUTOMATION;

	if (!AUTOMATION_URL) {
		throw new Error('Automation variable is not set');
	}

	return await fetcher(`/idx-stocks/company-profile/${code}`, {
		baseUrl: AUTOMATION_URL,
	});
};
