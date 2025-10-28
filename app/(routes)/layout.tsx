import Navbar from '@/components/page/navbar';
import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import { Geist, Geist_Mono } from 'next/font/google';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'IDX Stocks Screener',
	description: 'IDX Stocks Watchlist',
};

export default function RoutesLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="h-full" suppressHydrationWarning>
			<body
				className={`${geistSans.variable} ${geistMono.variable} h-full flex flex-col antialiased p-6`}
			>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
				>
					<Navbar />
					<main className="flex-1 overflow-hidden">
						{children}
					</main>
				</ThemeProvider>
			</body>
		</html>
	);
}
