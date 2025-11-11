import TechnicalPage from './technical-page';
import { fetchTechnicalData } from './server/fetch-technical-data';

export default async function Technical() {
	const data = await fetchTechnicalData();
	return <TechnicalPage data={data} />;
}
