import { ChartPageClient } from './chart-page';

interface ChartPageProps {
	params: Promise<{ code: string }>;
}

export default async function ChartPage({
	params,
}: ChartPageProps) {
	const { code } = await params;
	return <ChartPageClient code={code} />;
}
