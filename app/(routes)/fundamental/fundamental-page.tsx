'use client';

import { DataTable } from '@/components/page/data-table';
import { DataTablePagination } from '@/components/page/pagination';
import { Spinner } from '@/components/page/spinner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Pagination } from '@/lib/global-type';
import {
	debounce,
	ExportConfig,
	exportToExcel,
	formatNumber,
} from '@/lib/utils';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import { FileDown, Search } from 'lucide-react';
import { useState, useTransition } from 'react';
import {
	fundamentalPage,
	FundamentalPageSchema,
} from './fundamental-page-schema';
import {
	getFundamentalData,
	getFundamentalExportToExcel,
} from './server/fetch-fundamental-data';
import { getFundamentalColumns } from './table-config';

interface FundamentalPageProps {
	initialData: Pagination<typeof fundamentalPage>;
}

export default function FundamentalPage({
	initialData,
}: FundamentalPageProps) {
	const [data, setData] = useState(initialData);
	const [isPending, startTransition] = useTransition();

	// extract current page and size
	const currentPage = data.page.page;
	const currentSize = data.page.size;

	// logic for refetching data
	const refetchFundamentalData = (updates: {
		page?: number;
		size?: number;
		filter?: string;
	}) => {
		startTransition(async () => {
			const newData = await getFundamentalData({
				page: updates.page ?? currentPage,
				size: updates.size ?? currentSize,
				filter: updates.filter,
			});
			setData(newData);
		});
	};

	const columns = getFundamentalColumns();

	const handleExport = async () => {
		const fundamentalConfig: ExportConfig<FundamentalPageSchema> =
			{
				sheetName: 'Fundamental',
				fileName: 'Fundamental',
				columns: [
					{
						header: 'Sector',
						width: 18,
						value: (r) => r.sector || '',
					},
					{
						header: 'Code',
						width: 10,
						value: (r) => r.stockCode,
					},
					{ header: 'Name', width: 38, value: (r) => r.name },
					{
						header: 'Market Cap',
						width: 22,
						value: (r) =>
							r.marketCap ? formatNumber(r.marketCap) : '0',
					},
					{
						header: 'Volume (Lot)',
						width: 18,
						value: (r) =>
							r.volume ? formatNumber(r.volume) : '0',
					},
					{
						header: 'Close',
						width: 14,
						value: (r) =>
							r.closePrice ? formatNumber(r.closePrice) : '0',
					},
					{
						header: 'BV',
						width: 16,
						value: (r) => (r.bv ? formatNumber(r.bv) : '0'),
					},
					{
						header: 'PBV',
						width: 12,
						value: (r) => (r.pbv ? formatNumber(r.pbv) : '0'),
					},
					{
						header: 'PER',
						width: 12,
						value: (r) => (r.per ? formatNumber(r.per) : '0'),
					},
					{
						header: 'EPS',
						width: 16,
						value: (r) => (r.eps ? formatNumber(r.eps) : '0'),
					},
					{
						header: 'DER',
						width: 12,
						value: (r) => (r.der ? formatNumber(r.der) : '0'),
					},
					{
						header: 'ROA (%)',
						width: 14,
						value: (r) =>
							r.roaPercent ? formatNumber(r.roaPercent) : '0',
					},
					{
						header: 'ROE (%)',
						width: 14,
						value: (r) =>
							r.roePercent ? formatNumber(r.roePercent) : '0',
					},
					{
						header: 'NPM (%)',
						width: 14,
						value: (r) =>
							r.npmPercent ? formatNumber(r.npmPercent) : '0',
					},
				],
			};

		const data =
			(await getFundamentalExportToExcel()) as FundamentalPageSchema[];

		exportToExcel(data, fundamentalConfig);
	};

	return (
		<div className="bg-card w-full h-full border border-t-0 rounded-b-lg px-4 py-4">
			<div className="mb-2 flex items-center justify-between">
				<div>
					<h2 className="text-2xl font-semibold mb-2 flex items-center gap-2">
						<div className="h-8 w-1 bg-primary rounded-full" />
						Fundamental Analysis
					</h2>
					<p className="text-muted-foreground">
						View detailed fundamental metrics and financial
						ratios for IDX stocks
					</p>
				</div>

				<div className="flex gap-3">
					<div className="relative flex-1 max-w-md">
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-muted-foreground" />
						<Input
							placeholder="Search stocks..."
							onChange={(e) => {
								const value = e.target.value;

								debounce(() =>
									refetchFundamentalData({ filter: value })
								);
							}}
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
					<ScrollArea.Scrollbar
						orientation="horizontal"
						className="h-1 bg-white dark:bg-card relative"
					>
						<div className="absolute inset-0 dark:bg-primary bg-muted-foreground rounded-full" />
						<ScrollArea.Thumb className="relative z-10 bg-muted-foreground dark:bg-primary rounded-full" />
					</ScrollArea.Scrollbar>
				</ScrollArea.Root>

				<DataTablePagination
					currentPage={data.page.page}
					totalItems={data.page.total}
					itemsPerPage={data.page.size}
					onPageChange={(newPage) =>
						refetchFundamentalData({ page: newPage })
					}
				/>
			</div>

			{isPending && (
				<div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
					<div className="bg-white p-4 rounded-lg text-sm flex items-center gap-3">
						<Spinner size={18} />
						Loading...
					</div>
				</div>
			)}
		</div>
	);
}
