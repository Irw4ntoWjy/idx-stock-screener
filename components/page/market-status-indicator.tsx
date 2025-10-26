'use client';

import { useEffect, useState } from 'react';

export function MarketStatusIndicator() {
	const [isMarketOpen, setIsMarketOpen] = useState(false);

	useEffect(() => {
		const checkMarketStatus = () => {
			const now = new Date();
			const local = new Date(
				now.toLocaleString('en-US', { timeZone: 'Asia/Jakarta' }) // default using WIB
			);
			const day = local.getDay();
			const hours = local.getHours();
			const minutes = local.getMinutes();
			const seconds = local.getSeconds();
			const currentTime = hours * 3600 + minutes * 60 + seconds;

			let open = false; //status indicator

			if (day >= 1 && day <= 4) {
				// for Mon–Thu work session
				const sesi1Start = 9 * 3600;
				const sesi1End = 12 * 3600;
				const sesi2Start = 13 * 3600 + 30 * 60;
				const sesi2End = 15 * 3600 + 49 * 60 + 59;

				if (
					(currentTime >= sesi1Start &&
						currentTime <= sesi1End) ||
					(currentTime >= sesi2Start && currentTime <= sesi2End)
				)
					open = true;
			} else if (day === 5) {
				// for Friday work session
				const sesi1Start = 9 * 3600;
				const sesi1End = 11 * 3600 + 30 * 60;
				const sesi2Start = 14 * 3600;
				const sesi2End = 15 * 3600 + 49 * 60 + 59;

				if (
					(currentTime >= sesi1Start &&
						currentTime <= sesi1End) ||
					(currentTime >= sesi2Start && currentTime <= sesi2End)
				)
					open = true;
			}

			setIsMarketOpen(open);
		};

		checkMarketStatus();
		const interval = setInterval(checkMarketStatus, 60 * 1000); // run every 1 minutes
		return () => clearInterval(interval);
	}, []);

	return (
		<div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
			<div
				className={`h-2 w-2 rounded-full animate-pulse ${
					isMarketOpen ? 'bg-green-500 ' : 'bg-destructive'
				}`}
			></div>
			IDX Market
		</div>
	);
}
