import Navbar from '@/components/page/navbar';
import { ThemeProvider } from 'next-themes';

export default function RoutesLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ThemeProvider
			attribute="class"
			defaultTheme="system"
			enableSystem
		>
			<Navbar />
			<main className="flex-1 overflow-hidden">{children}</main>
		</ThemeProvider>
	);
}
