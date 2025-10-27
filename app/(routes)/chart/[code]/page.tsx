import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface ChartPageProps {
	params: Promise<{
		code: string;
	}>;
}

export default async function ChartPage({
	params,
}: ChartPageProps) {
	const { code } = await params;

	return (
		<div className="bg-card w-full h-full border border-t-0 rounded-b-lg px-4 py-4">
			<Button
				variant="outline"
				className="flex gap-2 !bg-primary text-white hover:text-white/50 hover:bg-primary/50"
			>
				<ArrowLeft className="size-4" />
				<span className="font-bold">{code}</span>
			</Button>
		</div>
	);
}
