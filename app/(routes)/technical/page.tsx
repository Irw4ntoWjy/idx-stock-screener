'use client';

import { Button } from '@/components/ui/button';
import {
	Card,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
	Activity,
	Download,
	Search,
	Target,
} from 'lucide-react';
import { useState } from 'react';

export default function Technical() {
	const [searchQuery, setSearchQuery] = useState('');
	const exportToExcel = () => {};

	return (
		<div className="bg-card w-full rounded-lg px-4 py-4">
			<div className="flex items-center justify-between mb-4">
				<div>
					<h1 className="text-3xl font-bold flex items-center gap-3 text-white">
						<Activity className="h-8 w-8 text-primary" />
						Technical Analysis & Watchlist
					</h1>
					<p className="text-muted-foreground mt-2">
						Analyze Indonesian stocks using technical indicators
						and manage your watchlist
					</p>
				</div>

				<Button onClick={exportToExcel} className="gap-2">
					<Download className="size-4" />
					Export to Excel
				</Button>
			</div>

			<Card>
				<CardHeader className="flex gap-3 flex-col">
					<CardTitle className="flex items-center gap-2 text-white">
						<Target className="size-5 text-white" />
						Technical Screener
					</CardTitle>
					<div className="flex flex-col lg:flex-row gap-4">
						<div className="relative flex-1">
							<Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
							<Input
								placeholder="Search stocks..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className="pl-10"
							/>
						</div>
					</div>
				</CardHeader>
			</Card>
		</div>
	);
}
