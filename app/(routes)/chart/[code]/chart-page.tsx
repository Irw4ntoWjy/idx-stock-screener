'use client';

import TradingViewWidget from '@/components/page/trading-view-widget';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ChartPageClientProps {
	code: string;
}

export function ChartPageClient({ code }: ChartPageClientProps) {
	const router = useRouter();
	return (
		<div className="bg-card w-full h-full border border-t-0 rounded-b-lg px-4 py-4">
			<Button
				variant="outline"
				onClick={() => router.back()}
				className="flex gap-2 !bg-primary text-white hover:text-white/50 hover:bg-primary/50"
			>
				<ArrowLeft className="size-4" />
				<span className="font-bold">{code}</span>
			</Button>

			<TradingViewWidget symbol={code} />
		</div>
	);
}
