'use client';

import { Button } from '@/components/ui/button';
import {
	formatNumber,
	formatPercent,
	getTrendColor,
} from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';
import {
	ChartLine,
	TrendingDown,
	TrendingUp,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { TechnicalPageSchema } from './technical-page-schema';

export const technicalColumns: ColumnDef<TechnicalPageSchema>[] =
	[
		{
			accessorKey: 'code',
			header: 'Code',
			cell: ({ row }) => (
				<div className="font-bold text-cyan-500">
					{row.original.stockCode}
				</div>
			),
		},
		{
			accessorKey: 'name',
			header: 'Name',
			cell: ({ row }) => (
				<div className="text-[16px] text-foreground">
					{row.original.name}
				</div>
			),
		},
		{
			accessorKey: 'prevClose',
			header: 'Prev Close',
			cell: ({ row }) => (
				<div className="font-semibold text-foreground">
					{row.original.prevClose}
				</div>
			),
		},

		{
			accessorKey: 'open',
			header: 'Open',
			cell: ({ row }) => (
				<div className="font-semibold text-card-foreground">
					{row.original.openPrice}
				</div>
			),
		},
		{
			accessorKey: 'close',
			header: 'Close',
			cell: ({ row }) => (
				<div className="font-semibold text-card-foreground">
					{row.original.closePrice}
				</div>
			),
		},
		{
			accessorKey: 'volume',
			header: 'Volume (Lot)',
			cell: ({ row }) => (
				<div className="text-foreground font-semibold">
					{`${row.original.volume} Lot`}
				</div>
			),
		},
		// {
		// 	accessorKey: 'ma5',
		// 	header: 'MA 5',
		// 	cell: ({ row }) => (
		// 		<div className="text-card-foreground font-semibold">
		// 			{formatNumber(row.original.ma5)}
		// 		</div>
		// 	),
		// },
		// {
		// 	accessorKey: 'ma60',
		// 	header: 'MA 60',
		// 	cell: ({ row }) => (
		// 		<div className="text-card-foreground font-semibold">
		// 			{formatNumber(row.original.ma60)}
		// 		</div>
		// 	),
		// },
		// {
		// 	accessorKey: 'ma200',
		// 	header: 'MA 200',
		// 	cell: ({ row }) => (
		// 		<div className="text-card-foreground font-semibold">
		// 			{formatNumber(row.original.ma200)}
		// 		</div>
		// 	),
		// },
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
