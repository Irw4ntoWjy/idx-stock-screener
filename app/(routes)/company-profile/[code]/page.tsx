import CompanyProfilePage from './company-profile-page';
import { fetchCompanyProfile } from './server/fetch-company-profile';

interface CompanyProfileProps {
	params: Promise<{ code: string }>;
}

export default async function CompanyProfile({
	params,
}: CompanyProfileProps) {
	const { code } = await params;
	const profileData = await fetchCompanyProfile(code);

	return <CompanyProfilePage code={code} data={profileData} />;
}
