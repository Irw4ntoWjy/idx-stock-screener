'use client';

import { DataTable } from '@/components/page/data-table';
import { DataTablePagination } from '@/components/page/pagination';
import { Spinner } from '@/components/page/spinner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Pagination } from '@/lib/global-type';
import {
	dateFormatString,
	debounce,
	ExportConfig,
	exportToExcel,
	formatNumber,
} from '@/lib/utils';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import { FileDown, Search, Settings2 } from 'lucide-react';
import { useState, useTransition } from 'react';

import {
	getTechnicalData,
	getTechnicalExportToExcel,
} from './server/fetch-technical-data';
import { getTechnicalColumns } from './table-config';
import {
	technicalPage,
	TechnicalPageSchema,
} from './technical-page-schema';
import { MaSettingsPopover } from './component/ma-settings';

interface TechnicalPageProps {
	initialData: Pagination<typeof technicalPage>;
}

export default function TechnicalPage({
	initialData,
}: TechnicalPageProps) {
	const [data, setData] = useState(initialData);
	const [isPending, startTransition] = useTransition();

	// extract current page and size
	const currentPage = data.page.page;
	const currentSize = data.page.size;

	// logic for refetching data
	const refetchTechnicaldata = (updates: {
		page?: number;
		size?: number;
		filter?: string;
	}) => {
		startTransition(async () => {
			const newData = await getTechnicalData({
				page: updates.page ?? currentPage,
				size: updates.size ?? currentSize,
				filter: updates.filter,
			});
			setData(newData);
		});
	};

	// extract ma keys from data
	const maKeys =
		data.content.length > 0
			? Object.keys(data.content[0].movingAverage).sort(
					(a, b) => parseInt(a) - parseInt(b)
			  )
			: [];
	const columns = getTechnicalColumns(maKeys);

	const handleExport = async () => {
		const technicalConfig = (
			maKeys: number[]
		): ExportConfig<TechnicalPageSchema> => ({
			sheetName: 'Technical Analysis',
			fileName: 'Technical Analysis',
			columns: [
				{ header: 'Code', width: 8, value: (r) => r.stockCode },
				{ header: 'Name', width: 36, value: (r) => r.name },
				{
					header: 'Open',
					width: 10,
					value: (r) => r.openPrice ?? 0,
					cellStyle: { numFmt: '#,##0' },
				},
				{
					header: 'Close',
					width: 10,
					value: (r) => r.closePrice ?? 0,
					cellStyle: { numFmt: '#,##0' },
				},
				{
					header: 'Volume (Lot)',
					width: 15,
					value: (r) => r.volume ?? 0,
					cellStyle: { numFmt: '#,##0' },
				},
				...maKeys.map((key) => ({
					header: `MA ${key}`,
					width: 12,
					value: (r: TechnicalPageSchema) =>
						r.movingAverage[key] ?? 0,
					cellStyle: { numFmt: '#,##0' },
				})),
			],
		});

		const data =
			(await getTechnicalExportToExcel()) as TechnicalPageSchema[];
		exportToExcel(
			data,
			technicalConfig(maKeys.map((k) => parseInt(k)))
		);
	};

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
							onChange={(e) => {
								const value = e.target.value;
								debounce(() => {
									refetchTechnicaldata({
										filter: value,
										page: 1,
									});
								});
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

					<MaSettingsPopover />
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
					onPageChange={(newPage) =>
						refetchTechnicaldata({ page: newPage })
					}
					fetchTime={
						data.content[0]
							? dateFormatString(data.content[0].date)
							: ''
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
