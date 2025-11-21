import { fetchTechnicalData } from './server/fetch-technical-data';
import TechnicalPage from './technical-page';

export default async function Technical() {
	const data = await fetchTechnicalData();
	return <TechnicalPage data={data} />;
}
