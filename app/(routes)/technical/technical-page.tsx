'use client';

import { DataTable } from '@/components/page/data-table';
import { DataTablePagination } from '@/components/page/pagination';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Pagination } from '@/lib/global-type';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import { FileDown, Search } from 'lucide-react';
import { useState } from 'react';
import { getTechnicalColumns } from './table-config';
import { technicalPage } from './technical-page-schema';

interface TechnicalPageProps {
	data: Pagination<typeof technicalPage>;
	fetchData: () => void;
}

export default function TechnicalPage({
	data,
}: TechnicalPageProps) {
	const [searchQuery, setSearchQuery] = useState('');
	// extract ma keys from data
	const maKeys =
		data.content.length > 0
			? Object.keys(data.content[0].movingAverage).sort(
					(a, b) => parseInt(a) - parseInt(b)
			  )
			: [];
	const columns = getTechnicalColumns(maKeys);

	const handleExport = () => {};
	return (
		<div className="bg-card w-full h-full border border-t-0 rounded-b-lg px-4 py-4">
			<div className="mb-2 flex items-center justify-between">
				<div>
					<h2 className="text-2xl font-semibold mb-2 flex items-center gap-2">
						<div className="h-8 w-1 bg-primary rounded-full" />
						Technical Analysis & Watchlist
					</h2>
					<p className="text-muted-foreground">
						Analyze Indonesian stocks using technical indicators.
					</p>
				</div>

				<div className="flex gap-3">
					<div className="relative flex-1 max-w-md">
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-muted-foreground" />
						<Input
							placeholder="Search stocks..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className="pl-10 border-border"
						/>
					</div>

					<Button
						onClick={handleExport}
						className="bg-primary hover:bg-primary/90"
					>
						<FileDown className="mr-2 size-4" />
						Export to Excel
					</Button>
				</div>
			</div>

			<div className="py-2">
				<ScrollArea.Root
					className="w-full rounded-md border border-border"
					style={{ height: 'calc(100vh - 17.85rem)' }}
				>
					<ScrollArea.Viewport className="h-full w-full">
						<div className="min-w-max">
							<DataTable columns={columns} data={data.content} />
						</div>
					</ScrollArea.Viewport>
					<ScrollArea.Scrollbar
						orientation="vertical"
						className="w-1 pt-10 pb-1"
					>
						<ScrollArea.Thumb className="bg-muted-foreground dark:bg-primary rounded-full" />
					</ScrollArea.Scrollbar>
					<ScrollArea.Corner className="bg-secondary" />
				</ScrollArea.Root>

				<DataTablePagination
					currentPage={data.page.page}
					totalItems={data.page.total}
					itemsPerPage={data.page.size}
					onPageChange={() => {}}
				/>
			</div>
		</div>
	);
}
