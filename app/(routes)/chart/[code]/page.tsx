import { ChartPageClient } from './chart-page';
import { fetchChartData } from './server/fetch-chart-data';

interface ChartPageProps {
	params: Promise<{ code: string }>;
}

export default async function ChartPage({
	params,
}: ChartPageProps) {
	const { code } = await params;
	const stocksData = await fetchChartData(code);

	return <ChartPageClient code={code} data={stocksData} />;
}
