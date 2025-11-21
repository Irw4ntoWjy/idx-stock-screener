import FundamentalPage from './fundamental-page';
import { fetchFundamentalData } from './server/fetch-fundamental-data';

export default async function Fundamental() {
	const data = await fetchFundamentalData();
	return <FundamentalPage data={data} />;
}
