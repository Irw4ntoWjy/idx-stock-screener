'use client';

import { DataTable } from '@/components/page/data-table';
import { DataTablePagination } from '@/components/page/pagination';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import {
	ChartCandlestick,
	FileDown,
	Search,
} from 'lucide-react';
import { useState } from 'react';
import {
	TechnicalColumn,
	technicalColumns,
} from './table-config';

const data: TechnicalColumn[] = [
	{
		code: 'BBCA',
		name: 'Bank Central Asia',
		prevClose: 9525,
		prevPriceChange: 0.26,
		price: 9550,
		open: 9500,
		close: 9550,
		change: 0.52,
		volume: 45250,
		ma5: 9480,
		ma60: 9320,
		ma200: 9100,
	},
	{
		code: 'BBRI',
		name: 'Bank Rakyat Indonesia',
		prevClose: 4950,
		prevPriceChange: -0.5,
		price: 4975,
		open: 4960,
		close: 4975,
		change: 0.51,
		volume: 78900,
		ma5: 4930,
		ma60: 4860,
		ma200: 4720,
	},
	{
		code: 'TLKM',
		name: 'Telkom Indonesia',
		prevClose: 3850,
		prevPriceChange: 1.32,
		price: 3800,
		open: 3840,
		close: 3800,
		change: -1.3,
		volume: 56780,
		ma5: 3820,
		ma60: 3790,
		ma200: 3650,
	},
	{
		code: 'ASII',
		name: 'Astra International',
		prevClose: 5250,
		prevPriceChange: -0.95,
		price: 5300,
		open: 5260,
		close: 5300,
		change: 0.95,
		volume: 34560,
		ma5: 5280,
		ma60: 5200,
		ma200: 5050,
	},
	{
		code: 'UNVR',
		name: 'Unilever Indonesia',
		prevClose: 4320,
		prevPriceChange: 0.7,
		price: 4300,
		open: 4315,
		close: 4300,
		change: -0.46,
		volume: 23450,
		ma5: 4310,
		ma60: 4280,
		ma200: 4150,
	},
	{
		code: 'BMRI',
		name: 'Bank Mandiri',
		prevClose: 6200,
		prevPriceChange: 0.81,
		price: 6250,
		open: 6210,
		close: 6250,
		change: 0.81,
		volume: 67890,
		ma5: 6180,
		ma60: 6050,
		ma200: 5900,
	},
	{
		code: 'BBNI',
		name: 'Bank Negara Indonesia',
		prevClose: 5425,
		prevPriceChange: -0.46,
		price: 5450,
		open: 5430,
		close: 5450,
		change: 0.46,
		volume: 45670,
		ma5: 5420,
		ma60: 5380,
		ma200: 5250,
	},
	{
		code: 'HMSP',
		name: 'HM Sampoerna',
		prevClose: 1540,
		prevPriceChange: 0.65,
		price: 1530,
		open: 1535,
		close: 1530,
		change: -0.65,
		volume: 89120,
		ma5: 1535,
		ma60: 1520,
		ma200: 1480,
	},
	{
		code: 'INDF',
		name: 'Indofood Sukses Makmur',
		prevClose: 6875,
		prevPriceChange: 1.09,
		price: 6900,
		open: 6880,
		close: 6900,
		change: 0.36,
		volume: 34210,
		ma5: 6850,
		ma60: 6780,
		ma200: 6650,
	},
	{
		code: 'KLBF',
		name: 'Kalbe Farma',
		prevClose: 1545,
		prevPriceChange: -0.32,
		price: 1550,
		open: 1548,
		close: 1550,
		change: 0.32,
		volume: 123450,
		ma5: 1542,
		ma60: 1530,
		ma200: 1510,
	},
	{
		code: 'ICBP',
		name: 'Indofood CBP Sukses Makmur',
		prevClose: 11025,
		prevPriceChange: 0.23,
		price: 11050,
		open: 11030,
		close: 11050,
		change: 0.23,
		volume: 28900,
		ma5: 11020,
		ma60: 10980,
		ma200: 10850,
	},
	{
		code: 'ADRO',
		name: 'Adaro Energy',
		prevClose: 3110,
		prevPriceChange: 1.63,
		price: 3090,
		open: 3105,
		close: 3090,
		change: -0.64,
		volume: 156780,
		ma5: 3100,
		ma60: 3050,
		ma200: 2950,
	},
	{
		code: 'ANTM',
		name: 'Aneka Tambang',
		prevClose: 1885,
		prevPriceChange: -1.05,
		price: 1900,
		open: 1890,
		close: 1900,
		change: 0.8,
		volume: 98450,
		ma5: 1890,
		ma60: 1870,
		ma200: 1820,
	},
	{
		code: 'PTBA',
		name: 'Bukit Asam',
		prevClose: 2760,
		prevPriceChange: 0.73,
		price: 2750,
		open: 2755,
		close: 2750,
		change: -0.36,
		volume: 67230,
		ma5: 2755,
		ma60: 2720,
		ma200: 2650,
	},
	{
		code: 'PGAS',
		name: 'Perusahaan Gas Negara',
		prevClose: 1505,
		prevPriceChange: -0.66,
		price: 1510,
		open: 1508,
		close: 1510,
		change: 0.33,
		volume: 87650,
		ma5: 1505,
		ma60: 1495,
		ma200: 1475,
	},
	{
		code: 'SMGR',
		name: 'Semen Indonesia',
		prevClose: 5525,
		prevPriceChange: 0.91,
		price: 5500,
		open: 5520,
		close: 5500,
		change: -0.45,
		volume: 45890,
		ma5: 5510,
		ma60: 5480,
		ma200: 5420,
	},
	{
		code: 'INTP',
		name: 'Indocement Tunggal Prakarsa',
		prevClose: 10350,
		prevPriceChange: -0.48,
		price: 10400,
		open: 10360,
		close: 10400,
		change: 0.48,
		volume: 23670,
		ma5: 10370,
		ma60: 10320,
		ma200: 10200,
	},
	{
		code: 'WIKA',
		name: 'Wijaya Karya',
		prevClose: 1365,
		prevPriceChange: 1.11,
		price: 1355,
		open: 1360,
		close: 1355,
		change: -0.73,
		volume: 76540,
		ma5: 1360,
		ma60: 1350,
		ma200: 1330,
	},
	{
		code: 'WSKT',
		name: 'Waskita Karya',
		prevClose: 945,
		prevPriceChange: -1.56,
		price: 950,
		open: 948,
		close: 950,
		change: 0.53,
		volume: 134560,
		ma5: 948,
		ma60: 940,
		ma200: 925,
	},
	{
		code: 'PTPP',
		name: 'PP (Persero)',
		prevClose: 925,
		prevPriceChange: 0.54,
		price: 920,
		open: 923,
		close: 920,
		change: -0.54,
		volume: 89340,
		ma5: 922,
		ma60: 915,
		ma200: 905,
	},
];

export default function Technical() {
	const [searchQuery, setSearchQuery] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 10;

	const filteredData = data.filter(
		(stock) =>
			stock.code
				.toLowerCase()
				.includes(searchQuery.toLowerCase()) ||
			stock.name
				.toLowerCase()
				.includes(searchQuery.toLowerCase())
	);

	const totalItems = filteredData.length;
	const startIndex = (currentPage - 1) * itemsPerPage;
	const paginatedData = filteredData.slice(
		startIndex,
		startIndex + itemsPerPage
	);

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
						Analyze Indonesian stocks using technical indicators
						and manage your watchlist
					</p>
				</div>
				<Button
					onClick={handleExport}
					className="bg-primary hover:bg-primary/90"
				>
					<FileDown className="mr-2 size-4" />
					Export to Excel
				</Button>
			</div>

			<Card className="bg-table border-border pb-0.5">
				<div className="px-6 py-2">
					<div className="flex flex-col gap-4 mb-6">
						<div className="flex items-center gap-2">
							<div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
								<ChartCandlestick className="size-4 text-foreground" />
							</div>
							<h3 className="text-lg font-semibold text-foreground">
								Technical Screener
							</h3>
						</div>
						<div className="relative flex-1 max-w-md">
							<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-muted-foreground" />
							<Input
								placeholder="Search stocks..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className="pl-10 border-border"
							/>
						</div>
					</div>

					<ScrollArea.Root
						className="w-full rounded-md border border-border"
						style={{ height: 'calc(100vh - 26.563rem)' }}
					>
						<ScrollArea.Viewport className="h-full w-full">
							<div className="min-w-max">
								<DataTable
									columns={technicalColumns}
									data={paginatedData}
								/>
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
						currentPage={currentPage}
						totalItems={totalItems}
						itemsPerPage={itemsPerPage}
						onPageChange={setCurrentPage}
					/>
				</div>
			</Card>
		</div>
	);
}
