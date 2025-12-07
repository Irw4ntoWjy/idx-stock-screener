import {
	getMaConfig,
	getTechnicalData,
} from './server/fetch-technical-data';
import TechnicalPage from './technical-page';

export default async function Technical() {
	const data = await getTechnicalData({
		page: 1,
		size: 20,
		filter: undefined,
	});
	const maConfig = await getMaConfig();

	return (
		<TechnicalPage initialData={data} maConfig={maConfig} />
	);
}
