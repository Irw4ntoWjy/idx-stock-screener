import CompanyProfilePage from './company-profile-page';
import { fetchCompanyProfile } from './server/fetch-company-profile';

interface CompanyProfilePageProps {
	params: Promise<{ code: string }>;
}

export default async function CompanyProfile({
	params,
}: CompanyProfilePageProps) {
	const { code } = await params;
	const profile = await fetchCompanyProfile(code);

	return <CompanyProfilePage code={code} data={profile} />;
}
