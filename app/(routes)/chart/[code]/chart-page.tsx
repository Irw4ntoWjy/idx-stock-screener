'use client';

import TradingViewWidget from '@/components/page/trading-view-widget';
import { Button } from '@/components/ui/button';
import { ArrowLeft, SquareArrowOutUpRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ChartPageClientProps {
	code: string;
}

export function ChartPageClient({ code }: ChartPageClientProps) {
	const router = useRouter();
	return (
		<div className="bg-card w-full h-full border border-t-0 rounded-b-lg px-4 py-4 gap-3 flex flex-col">
			<div className="flex justify-between">
				<Button
					variant="outline"
					onClick={() => router.back()}
					className="inline-flex w-fit gap-2 !bg-primary justify-start text-white hover:text-white/50 hover:bg-primary/50"
				>
					<ArrowLeft className="size-4" />
					<span className="font-bold">{code}</span>
				</Button>

				<Button
					variant="outline"
					onClick={() => {
						window.open(
							`https://www.tradingview.com/chart/?symbol=${code}`,
							'_blank'
						);
					}}
					className="inline-flex w-fit gap-2 !bg-primary justify-start text-white hover:text-white/50 hover:bg-primary/50"
				>
					<SquareArrowOutUpRight className="size-4" />
					View on Trading View
				</Button>
			</div>

			<div className="w-full h-[calc(100vh-15rem)]">
				<TradingViewWidget symbol={code} />
			</div>

			<div className="flex flex-col gap-2 text-sm text-center">
				<span className="text-slate-500">
					Real-time chart power by{' '}
					<span className="text-primary font-medium">
						TradingView
					</span>
				</span>

				<span className="text-slate-500">
					Click "View More Details" to access advanced charting
					tools and technical analysis on TradingView
				</span>
			</div>
		</div>
	);
}
