'use client';

import { Button } from '@/components/ui/button';
import { formatNumber } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';
import { ChartLine } from 'lucide-react';
import { useRouter } from 'next/navigation';

export type FundamentalColumn = {
	sector: string;
	code: string;
	name: string;
	marketCap: number;
	volume: number;
	close: number;
	bv: number;
	pbv: number;
	per: number;
	eps: number;
	der: number;
	roa: number;
	roe: number;
	npm: number;
};

export const fundamentalColumns: ColumnDef<FundamentalColumn>[] =
	[
		{
			accessorKey: 'sector',
			header: 'Sector',
			cell: ({ row }) => (
				<div className="font-bold text-foreground">
					{row.original.sector}
				</div>
			),
		},
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
			accessorKey: 'marketCap',
			header: 'Market Cap',
			cell: ({ row }) => (
				<div className="font-semibold text-foreground">
					{formatNumber(row.getValue('marketCap'))}
				</div>
			),
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
			accessorKey: 'close',
			header: 'Close',
			cell: ({ row }) => (
				<div className="font-semibold text-card-foreground">
					{formatNumber(row.getValue('close'))}
				</div>
			),
		},
		{
			accessorKey: 'bv',
			header: 'BV',
			cell: ({ row }) => (
				<div className="text-card-foreground font-semibold">
					{formatNumber(row.original.bv)}
				</div>
			),
		},
		{
			accessorKey: 'pbv',
			header: 'PBV',
			cell: ({ row }) => (
				<div className="text-card-foreground font-semibold">
					{formatNumber(row.original.pbv)}
				</div>
			),
		},
		{
			accessorKey: 'per',
			header: 'PER',
			cell: ({ row }) => (
				<div className="text-card-foreground font-semibold">
					{formatNumber(row.original.per)}
				</div>
			),
		},
		{
			accessorKey: 'eps',
			header: 'EPS',
			cell: ({ row }) => (
				<div className="text-card-foreground font-semibold">
					{formatNumber(row.original.eps)}
				</div>
			),
		},
		{
			accessorKey: 'der',
			header: 'DER',
			cell: ({ row }) => (
				<div className="text-card-foreground font-semibold">
					{formatNumber(row.original.der)}
				</div>
			),
		},
		{
			accessorKey: 'roa',
			header: 'ROA (%)',
			cell: ({ row }) => (
				<div className="text-card-foreground font-semibold">
					{formatNumber(row.original.roa)}
				</div>
			),
		},
		{
			accessorKey: 'roe',
			header: 'ROE (%)',
			cell: ({ row }) => (
				<div className="text-card-foreground font-semibold">
					{formatNumber(row.original.roe)}
				</div>
			),
		},
		{
			accessorKey: 'npm',
			header: 'NPM (%)',
			cell: ({ row }) => (
				<div className="text-card-foreground font-semibold">
					{formatNumber(row.original.npm)}
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
