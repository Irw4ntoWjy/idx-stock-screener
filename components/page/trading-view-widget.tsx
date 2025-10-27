import { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';

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
	const containerRef = useRef<HTMLDivElement | null>(null);
	const { resolvedTheme } = useTheme(); // get user theme

	useEffect(() => {
		const scriptId = 'tradingview-script';

		const initWidget = () => {
			if (!containerRef.current || !window.TradingView) return;
			containerRef.current.innerHTML = ''; // clear state
			new window.TradingView.widget({
				container_id: containerRef.current.id,
				autosize: true,
				symbol: `IDX:${symbol}`,
				timezone: 'Asia/Jakarta',
				style: '1',
				locale: 'en',
				interval: 'D',
				theme: resolvedTheme,
				borderColor: 'transparent',
			});
		};

		// If the script already exists, just init
		const existScript = document.getElementById(scriptId);
		if (existScript) {
			if (window.TradingView) initWidget();
			else existScript.addEventListener('load', initWidget);
			return;
		}

		const script = document.createElement('script');
		script.id = scriptId;
		script.src = 'https://s3.tradingview.com/tv.js';
		script.async = true;
		script.onload = initWidget;
		document.body.appendChild(script);

		return () => {
			script.removeEventListener('load', initWidget); // cleanup
		};
	}, [symbol, resolvedTheme]);

	return (
		<>
			<div
				id="trading-view-widget"
				ref={containerRef}
				className="h-full rounded-lg border border-slate-300 overflow-hidden"
			></div>

			<style jsx>{`
				#trading-view-widget iframe,
				#trading-view-widget > div,
				#trading-view-widget
					.tradingview-widget-container__widget {
					border: none !important;
					box-shadow: none !important;
					background: transparent !important;
				}
			`}</style>
		</>
	);
}
