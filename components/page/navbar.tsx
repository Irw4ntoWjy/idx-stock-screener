'use client';

import { BarChart3, FileText, Search } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
	const pathname = usePathname();

	const navItems = [
		{ path: '/technical', icon: Search, label: 'Technical' },
		{
			path: '/fundamental',
			icon: FileText,
			label: 'Fundamental',
		},
	];

	return (
		<header className="bg-card backdrop-blur supports-[backdrop-filter]:bg-card rounded-lg border-b-muted border-b-3">
			<div className="container mx-auto px-4">
				<div className="flex h-16 items-center justify-between">
					<div className="flex items-center gap-8">
						<Link
							href="/technical"
							className="flex items-center gap-2 font-bold text-xl"
						>
							<BarChart3 className="h-6 w-6 text-primary" />
							<span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
								Stocks Tracker
							</span>
						</Link>

						<nav className="hidden md:flex items-center gap-6">
							{navItems.map((item) => {
								const isActive = pathname === item.path;
								return (
									<Link
										key={item.path}
										href={item.path}
										className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
											isActive
												? 'bg-primary text-primary-foreground'
												: 'text-muted-foreground hover:text-foreground hover:bg-muted'
										}`}
									>
										<item.icon className="h-4 w-4" />
										{item.label}
									</Link>
								);
							})}
						</nav>
					</div>

					<div className="flex items-center gap-4">
						<div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
							<div className="h-2 w-2 rounded-full bg-success animate-pulse"></div>
							IDX Market
						</div>
					</div>
				</div>
			</div>
		</header>
	);
}
