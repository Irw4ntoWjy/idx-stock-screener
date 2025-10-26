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

export type TechnicalColumn = {
	code: string;
	name: string;
	prevClose: number;
	prevPriceChange: number;
	price: number;
	open: number;
	close: number;
	change: number;
	volume: number;
	ma5: number;
	ma60: number;
	ma200: number;
};

export const technicalColumns: ColumnDef<TechnicalColumn>[] = [
	{
		accessorKey: 'code',
		header: 'Code',
		cell: ({ row }) => (
			<div className="font-bold text-cyan-500">
				{row.original.code}
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
				{formatNumber(row.getValue('prevClose'))}
			</div>
		),
	},
	{
		header: 'Prev (%)',
		accessorKey: 'prevPriceChange',
		cell: ({ row }) => {
			const value = row.original.prevPriceChange;
			const isUp = value >= 0;
			return (
				<div className={`font-semibold ${getTrendColor(value)}`}>
					<div className="flex items-center gap-1">
						{isUp ? (
							<TrendingUp className="size-3" />
						) : (
							<TrendingDown className="size-3" />
						)}
						{formatPercent(value)}
					</div>
				</div>
			);
		},
	},

	{
		accessorKey: 'open',
		header: 'Open',
		cell: ({ row }) => (
			<div className="font-semibold text-card-foreground">
				{formatNumber(row.getValue('open'))}
			</div>
		),
	},
	{
		accessorKey: 'close',
		header: 'Close',
		cell: ({ row }) => (
			<div className="font-semibold text-card-foreground">
				{formatNumber(row.getValue('close'))}
			</div>
		),
	},
	{
		accessorKey: 'price',
		header: 'Price',
		cell: ({ row }) => (
			<div className="font-semibold text-foreground">
				{formatNumber(row.original.price)}
			</div>
		),
	},
	{
		accessorKey: 'change',
		header: 'Change (%)',
		cell: ({ row }) => {
			const value = row.original.change;
			const isUp = value >= 0;
			return (
				<div className={`font-semibold ${getTrendColor(value)}`}>
					<div className="flex items-center gap-1">
						{isUp ? (
							<TrendingUp className="size-3" />
						) : (
							<TrendingDown className="size-3" />
						)}
						{formatPercent(value)}
					</div>
				</div>
			);
		},
	},
	{
		accessorKey: 'volume',
		header: 'Volume (Lot)',
		cell: ({ row }) => (
			<div className="text-foreground font-semibold">
				{`${formatNumber(row.original.volume)} Lot`}
			</div>
		),
	},
	{
		accessorKey: 'ma5',
		header: 'MA 5',
		cell: ({ row }) => (
			<div className="text-card-foreground font-semibold">
				{formatNumber(row.original.ma5)}
			</div>
		),
	},
	{
		accessorKey: 'ma60',
		header: 'MA 60',
		cell: ({ row }) => (
			<div className="text-card-foreground font-semibold">
				{formatNumber(row.original.ma60)}
			</div>
		),
	},
	{
		accessorKey: 'ma200',
		header: 'MA 200',
		cell: ({ row }) => (
			<div className="text-card-foreground font-semibold">
				{formatNumber(row.original.ma200)}
			</div>
		),
	},
	{
		id: 'action',
		header: '',
		cell: ({ row }) => {
			const router = useRouter();

			return (
				<Button
					size="sm"
					onClick={() =>
						router.push(`/chart/${row.original.code}`)
					}
					className="bg-primary hover:bg-primary/90 text-primary-foreground"
				>
					<ChartLine className="size-4" />
				</Button>
			);
		},
	},
];
