'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FileDown, Search } from 'lucide-react';
import { useState } from 'react';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import { DataTable } from '@/components/page/data-table';
import {
	FundamentalColumn,
	fundamentalColumns,
} from './table-config';
import { DataTablePagination } from '@/components/page/pagination';

const data: FundamentalColumn[] = [
	{
		sector: 'Banking',
		code: 'BBCA',
		name: 'Bank Central Asia',
		marketCap: 1125000000,
		volume: 45250,
		close: 9550,
		bv: 5420,
		pbv: 1.76,
		per: 18.5,
		eps: 516,
		der: 5.2,
		roa: 3.8,
		roe: 15.2,
		npm: 42.5,
	},
	{
		sector: 'Banking',
		code: 'BBRI',
		name: 'Bank Rakyat Indonesia',
		marketCap: 748500000,
		volume: 78900,
		close: 4975,
		bv: 3850,
		pbv: 1.29,
		per: 12.3,
		eps: 404,
		der: 6.8,
		roa: 3.2,
		roe: 14.8,
		npm: 38.2,
	},
	{
		sector: 'Telecommunication',
		code: 'TLKM',
		name: 'Telkom Indonesia',
		marketCap: 372000000,
		volume: 56780,
		close: 3800,
		bv: 2650,
		pbv: 1.43,
		per: 15.7,
		eps: 242,
		der: 0.9,
		roa: 12.5,
		roe: 18.3,
		npm: 22.8,
	},
	{
		sector: 'Automotive',
		code: 'ASII',
		name: 'Astra International',
		marketCap: 265000000,
		volume: 34560,
		close: 5300,
		bv: 4120,
		pbv: 1.29,
		per: 11.2,
		eps: 473,
		der: 0.7,
		roa: 8.9,
		roe: 13.5,
		npm: 9.2,
	},
	{
		sector: 'Consumer Goods',
		code: 'UNVR',
		name: 'Unilever Indonesia',
		marketCap: 312000000,
		volume: 23450,
		close: 4300,
		bv: 580,
		pbv: 7.41,
		per: 25.8,
		eps: 167,
		der: 1.2,
		roa: 42.3,
		roe: 128.5,
		npm: 18.6,
	},
	{
		sector: 'Banking',
		code: 'BMRI',
		name: 'Bank Mandiri',
		marketCap: 585000000,
		volume: 67890,
		close: 6250,
		bv: 4250,
		pbv: 1.47,
		per: 13.8,
		eps: 453,
		der: 5.8,
		roa: 3.5,
		roe: 15.8,
		npm: 39.5,
	},
	{
		sector: 'Banking',
		code: 'BBNI',
		name: 'Bank Negara Indonesia',
		marketCap: 423000000,
		volume: 45670,
		close: 5450,
		bv: 3680,
		pbv: 1.48,
		per: 11.9,
		eps: 458,
		der: 6.2,
		roa: 3.4,
		roe: 15.1,
		npm: 37.8,
	},
	{
		sector: 'Consumer Goods',
		code: 'HMSP',
		name: 'HM Sampoerna',
		marketCap: 145000000,
		volume: 89120,
		close: 1530,
		bv: 385,
		pbv: 3.97,
		per: 19.2,
		eps: 80,
		der: 0.6,
		roa: 28.5,
		roe: 85.3,
		npm: 21.4,
	},
	{
		sector: 'Consumer Goods',
		code: 'INDF',
		name: 'Indofood Sukses Makmur',
		marketCap: 185000000,
		volume: 34210,
		close: 6900,
		bv: 4850,
		pbv: 1.42,
		per: 14.5,
		eps: 476,
		der: 0.8,
		roa: 7.8,
		roe: 12.5,
		npm: 8.9,
	},
	{
		sector: 'Pharmaceutical',
		code: 'KLBF',
		name: 'Kalbe Farma',
		marketCap: 98000000,
		volume: 123450,
		close: 1550,
		bv: 825,
		pbv: 1.88,
		per: 22.3,
		eps: 69,
		der: 0.4,
		roa: 15.2,
		roe: 18.5,
		npm: 12.3,
	},
	{
		sector: 'Consumer Goods',
		code: 'ICBP',
		name: 'Indofood CBP Sukses Makmur',
		marketCap: 156000000,
		volume: 28900,
		close: 11050,
		bv: 6250,
		pbv: 1.77,
		per: 16.8,
		eps: 658,
		der: 0.5,
		roa: 12.5,
		roe: 17.8,
		npm: 10.5,
	},
	{
		sector: 'Mining',
		code: 'ADRO',
		name: 'Adaro Energy',
		marketCap: 235000000,
		volume: 156780,
		close: 3090,
		bv: 2180,
		pbv: 1.42,
		per: 8.5,
		eps: 364,
		der: 0.6,
		roa: 18.5,
		roe: 24.8,
		npm: 28.5,
	},
	{
		sector: 'Mining',
		code: 'ANTM',
		name: 'Aneka Tambang',
		marketCap: 87000000,
		volume: 98450,
		close: 1900,
		bv: 1420,
		pbv: 1.34,
		per: 9.8,
		eps: 194,
		der: 0.3,
		roa: 12.8,
		roe: 15.5,
		npm: 18.2,
	},
	{
		sector: 'Mining',
		code: 'PTBA',
		name: 'Bukit Asam',
		marketCap: 125000000,
		volume: 67230,
		close: 2750,
		bv: 1850,
		pbv: 1.49,
		per: 7.2,
		eps: 382,
		der: 0.2,
		roa: 22.5,
		roe: 26.8,
		npm: 32.5,
	},
	{
		sector: 'Energy',
		code: 'PGAS',
		name: 'Perusahaan Gas Negara',
		marketCap: 78000000,
		volume: 87650,
		close: 1510,
		bv: 1280,
		pbv: 1.18,
		per: 11.5,
		eps: 131,
		der: 1.1,
		roa: 5.8,
		roe: 8.5,
		npm: 15.2,
	},
	{
		sector: 'Construction',
		code: 'SMGR',
		name: 'Semen Indonesia',
		marketCap: 165000000,
		volume: 45890,
		close: 5500,
		bv: 4250,
		pbv: 1.29,
		per: 13.2,
		eps: 417,
		der: 0.4,
		roa: 8.5,
		roe: 11.2,
		npm: 12.8,
	},
	{
		sector: 'Construction',
		code: 'INTP',
		name: 'Indocement Tunggal Prakarsa',
		marketCap: 142000000,
		volume: 23670,
		close: 10400,
		bv: 8250,
		pbv: 1.26,
		per: 14.5,
		eps: 717,
		der: 0.3,
		roa: 7.8,
		roe: 9.5,
		npm: 11.5,
	},
	{
		sector: 'Construction',
		code: 'WIKA',
		name: 'Wijaya Karya',
		marketCap: 45000000,
		volume: 76540,
		close: 1355,
		bv: 1180,
		pbv: 1.15,
		per: 18.5,
		eps: 73,
		der: 1.8,
		roa: 2.5,
		roe: 5.8,
		npm: 4.2,
	},
	{
		sector: 'Construction',
		code: 'WSKT',
		name: 'Waskita Karya',
		marketCap: 38000000,
		volume: 134560,
		close: 950,
		bv: 1050,
		pbv: 0.9,
		per: 22.5,
		eps: 42,
		der: 2.5,
		roa: 1.2,
		roe: 3.5,
		npm: 2.8,
	},
	{
		sector: 'Construction',
		code: 'PTPP',
		name: 'PP (Persero)',
		marketCap: 35000000,
		volume: 89340,
		close: 920,
		bv: 985,
		pbv: 0.93,
		per: 19.8,
		eps: 46,
		der: 2.2,
		roa: 1.8,
		roe: 4.2,
		npm: 3.5,
	},
];

export default function Fundamental() {
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
							<DataTable
								columns={fundamentalColumns}
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
					<ScrollArea.Scrollbar
						orientation="horizontal"
						className="h-1 bg-white dark:bg-card relative"
					>
						<div className="absolute inset-0 dark:bg-primary bg-muted-foreground rounded-full" />
						<ScrollArea.Thumb className="relative z-10 bg-muted-foreground dark:bg-primary rounded-full" />
					</ScrollArea.Scrollbar>
				</ScrollArea.Root>

				<DataTablePagination
					currentPage={currentPage}
					totalItems={totalItems}
					itemsPerPage={itemsPerPage}
					onPageChange={setCurrentPage}
				/>
			</div>
		</div>
	);
}
