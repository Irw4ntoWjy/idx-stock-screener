'use client';

import {
	BarChart3,
	Building,
	FileText,
	Search,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MarketStatusIndicator } from './market-status-indicator';
import { ThemeSwitch } from './theme-switch';

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
		<header className="bg-card backdrop-blur supports-[backdrop-filter]:bg-card rounded-t-lg border border-b">
			<div className="container max-w-full px-4">
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

						<nav className="hidden md:flex items-center gap-2">
							{navItems.map((item) => {
								const isActive = pathname === item.path;
								return (
									<Link
										key={item.path}
										href={item.path}
										className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
											isActive
												? 'bg-primary text-primary-foreground'
												: 'text-muted-foreground hover:text-primary-foreground hover:bg-primary/80'
										}`}
									>
										<item.icon className="size-4" />
										{item.label}
									</Link>
								);
							})}
						</nav>
					</div>

					<div className="flex gap-6">
						<div className="flex items-center gap-4">
							<MarketStatusIndicator />
							<ThemeSwitch />
						</div>
					</div>
				</div>
			</div>
		</header>
	);
}
