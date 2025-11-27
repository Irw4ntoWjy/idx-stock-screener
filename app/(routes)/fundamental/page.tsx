import FundamentalPage from './fundamental-page';
import { getFundamentalData } from './server/fetch-fundamental-data';

export default async function Fundamental() {
	const data = await getFundamentalData();
	return <FundamentalPage initialData={data} />;
}
