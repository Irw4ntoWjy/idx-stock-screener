import { fetcher } from '@/lib/fetcher';
import { CompanyProfileSchema } from '../companny-profile-schema';

export const fetchCompanyProfile = async (
	code: string | undefined
) => {
	// default code when not provided
	if (!code) {
		code = 'BBCA';
	}

	return fetcher<CompanyProfileSchema>(
		`/idx-company-profile/${code}`
	);
};
