'use client';

import { DataTable } from '@/components/page/data-table';
import { DataTablePagination } from '@/components/page/pagination';
import { Spinner } from '@/components/page/spinner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Pagination } from '@/lib/global-type';
import {
	debounce,
	exportToExcel,
	formatNumber,
} from '@/lib/utils';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import { FileDown, Search } from 'lucide-react';
import { useState, useTransition } from 'react';
import { toast } from 'sonner';
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
	const [filter, setFilter] = useState('');
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
				filter: filter,
			});
			setData(newData);
		});
	};

	const columns = getFundamentalColumns();

	const handleExport = async () => {
		const excelData =
			(await getFundamentalExportToExcel()) as FundamentalPageSchema[];

		if (excelData.length === 0) {
			toast.warning('No data to be Exported');
			return;
		}

		const exportData = excelData.map((row) => {
			// mapped row data
			const exportRow: Record<string, string> = {};
			exportRow['Sector'] = row.sector;
			exportRow['Code'] = row.stockCode;
			exportRow['Name'] = row.name;
			exportRow['Market Cap'] = row.marketCap
				? formatNumber(row.marketCap).toString()
				: '0';
			exportRow['Volume (Lot)'] = row.volume
				? formatNumber(row.volume).toString()
				: '0';
			exportRow['Close'] = row.closePrice
				? formatNumber(row.closePrice).toString()
				: '0';
			exportRow['BV'] = row.bv
				? formatNumber(row.bv).toString()
				: '0';
			exportRow['PBV'] = row.pbv
				? formatNumber(row.pbv).toString()
				: '0';
			exportRow['PER'] = row.per
				? formatNumber(row.per).toString()
				: '0';
			exportRow['EPS'] = row.eps
				? formatNumber(row.eps).toString()
				: '0';
			exportRow['DER'] = row.der
				? formatNumber(row.der).toString()
				: '0';
			exportRow['ROA (%)'] = row.roaPercent
				? formatNumber(row.roaPercent).toString()
				: '0';
			exportRow['ROE (%)'] = row.roePercent
				? formatNumber(row.roePercent).toString()
				: '0';
			exportRow['NPM (%)'] = row.npmPercent
				? formatNumber(row.npmPercent).toString()
				: '0';

			return exportRow;
		});

		const colWidths = [
			{ wch: 18 },
			{ wch: 10 },
			{ wch: 38 },
			{ wch: 22 },
			{ wch: 18 },
			{ wch: 14 },
			{ wch: 16 },
			{ wch: 12 },
			{ wch: 12 },
			{ wch: 16 },
			{ wch: 12 },
			{ wch: 14 },
			{ wch: 14 },
			{ wch: 14 },
		];

		exportToExcel(exportData, colWidths, 'Fundamental');
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
							value={filter}
							onChange={(e) => {
								const value = e.target.value;
								setFilter(value);

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
