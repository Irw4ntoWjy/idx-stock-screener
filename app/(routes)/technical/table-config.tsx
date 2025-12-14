'use client';

import { Button } from '@/components/ui/button';
import { formatNumber } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';
import { ChartLine } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { TechnicalPageSchema } from './technical-page-schema';

const createMAColumns = (
	maKeys: string[]
): ColumnDef<TechnicalPageSchema>[] => {
	return maKeys.map((maKey) => ({
		id: `ma${maKey}`,
		header: `MA ${maKey}`,
		accessorFn: (row) => row.movingAverage[maKey],
		cell: ({ getValue }) => {
			const value = getValue<number>();
			return (
				<div className="text-card-foreground font-semibold">
					{value ? formatNumber(value) : 0}
				</div>
			);
		},
	}));
};

export const getTechnicalColumns = (
	maKeys: string[] = []
): ColumnDef<TechnicalPageSchema>[] => [
	{
		id: 'sector',
		header: 'Sector',
		cell: ({ row }) => (
			<div className="font-bold text-foreground">
				{row.original.sector}
			</div>
		),
	},
	{
		id: 'code',
		header: 'Code',
		cell: ({ row }) => (
			<div
				className={`font-bold ${
					row.original.suspend ? 'text-red-700' : 'text-cyan-500'
				}`}
			>
				{row.original.stockCode}
			</div>
		),
	},
	{
		id: 'name',
		header: 'Name',
		cell: ({ row }) => (
			<div className="text-[16px] text-foreground">
				{row.original.name}
			</div>
		),
	},
	{
		id: 'marketCap',
		header: 'Market Cap',
		cell: ({ row }) => (
			<div className="font-semibold text-foreground">
				{formatNumber(row.original.marketCap)}
			</div>
		),
	},
	{
		id: 'volume',
		header: 'Volume (Lot)',
		cell: ({ row }) => (
			<div className="text-foreground font-semibold">
				{row.original.volume
					? formatNumber(row.original.volume)
					: 0}
			</div>
		),
	},
	{
		id: 'open',
		header: 'Open',
		cell: ({ row }) => (
			<div className="font-semibold text-card-foreground">
				{row.original.openPrice
					? formatNumber(row.original.openPrice)
					: 0}
			</div>
		),
	},
	{
		id: 'close',
		header: 'Close',
		cell: ({ row }) => (
			<div className="font-semibold text-card-foreground">
				{formatNumber(row.original.closePrice)}
			</div>
		),
	},
	{
		id: 'indexCode',
		header: 'Stock Class',
		cell: ({ row }) => (
			<div className="font-semibold text-foreground">
				{row.original.indexCode ?? '-'}
			</div>
		),
	},
	...createMAColumns(maKeys),
	{
		id: 'action',
		header: '',
		cell: ({ row }) => {
			const router = useRouter();
			return (
				<Button
					size="sm"
					onClick={() =>
						router.push(`/chart/${row.original.stockCode}`)
					}
					className="bg-primary hover:bg-primary/90 text-primary-foreground"
				>
					<ChartLine className="size-4" />
				</Button>
			);
		},
	},
];
