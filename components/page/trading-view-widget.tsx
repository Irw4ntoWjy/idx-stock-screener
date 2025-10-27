import { useEffect } from 'react';

declare global {
	interface Window {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		TradingView: any;
	}
}

export default function TradingViewWidget({
	symbol,
}: {
	symbol: string;
}) {
	useEffect(() => {
		const script = document.createElement('script');
		script.id = 'tradingview-script';
		script.src = 'https://s3.tradingview.com/tv.js';
		script.async = true;
		script.onload = () => {
			new window.TradingView.widget({
				container_id: 'trading-view-widget',
				width: '100%',
				height: '100%',
				symbol: `IDX:${symbol}`,
				timezone: 'Asia/Jakarta',
				style: '1',
				locale: 'en',
				interval: 'D',
				theme: 'light',
			});
		};
		document.body.appendChild(script);
	}, [symbol]);

	return <div id="trading-view-widget"></div>;
}
