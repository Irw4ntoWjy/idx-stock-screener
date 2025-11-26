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
