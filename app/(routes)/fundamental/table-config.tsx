'use client';

import { Button } from '@/components/ui/button';
import { formatNumber } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';
import { Building } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FundamentalPageSchema } from './fundamental-page-schema';

export const getFundamentalColumns =
	(): ColumnDef<FundamentalPageSchema>[] => [
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
			id: 'code',
			header: 'Code',
			cell: ({ row }) => (
				<div
					className={`font-bold ${
						row.original.suspend
							? 'text-red-700'
							: 'text-cyan-500'
					}`}
				>
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
			accessorKey: 'marketCap',
			header: 'Market Cap',
			cell: ({ row }) => (
				<div className="font-semibold text-foreground">
					{formatNumber(row.original.marketCap)}
				</div>
			),
		},
		{
			accessorKey: 'volume',
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
			accessorKey: 'close',
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
				<div className="font-semibold text-foreground text-wrap max-w-[200px] lg:max-w-[300px]">
					{row.original.indexCode ?? '-'}
				</div>
			),
		},
		{
			accessorKey: 'bv',
			header: 'BV',
			cell: ({ row }) => (
				<div className="text-card-foreground font-semibold">
					{row.original.bv ? formatNumber(row.original.bv) : 0}
				</div>
			),
		},
		{
			accessorKey: 'pbv',
			header: 'PBV',
			cell: ({ row }) => (
				<div className="text-card-foreground font-semibold">
					{row.original.pbv ? formatNumber(row.original.pbv) : 0}
				</div>
			),
		},
		{
			accessorKey: 'per',
			header: 'PER',
			cell: ({ row }) => (
				<div className="text-card-foreground font-semibold">
					{row.original.per ? formatNumber(row.original.per) : 0}
				</div>
			),
		},
		{
			accessorKey: 'eps',
			header: 'EPS',
			cell: ({ row }) => (
				<div className="text-card-foreground font-semibold">
					{row.original.eps ? formatNumber(row.original.eps) : 0}
				</div>
			),
		},
		{
			accessorKey: 'der',
			header: 'DER',
			cell: ({ row }) => (
				<div className="text-card-foreground font-semibold">
					{row.original.der ? formatNumber(row.original.der) : 0}
				</div>
			),
		},
		{
			accessorKey: 'roa',
			header: 'ROA (%)',
			cell: ({ row }) => (
				<div className="text-card-foreground font-semibold">
					{row.original.roaPercent
						? formatNumber(row.original.roaPercent)
						: 0}
				</div>
			),
		},
		{
			accessorKey: 'roe',
			header: 'ROE (%)',
			cell: ({ row }) => (
				<div className="text-card-foreground font-semibold">
					{row.original.roePercent
						? formatNumber(row.original.roePercent)
						: 0}
				</div>
			),
		},
		{
			accessorKey: 'npm',
			header: 'NPM (%)',
			cell: ({ row }) => (
				<div className="text-card-foreground font-semibold">
					{row.original.npmPercent
						? formatNumber(row.original.npmPercent)
						: 0}
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
							router.push(
								`/company-profile/${row.original.stockCode}?from=fundamental`
							)
						}
						className="bg-primary hover:bg-primary/90 text-primary-foreground"
					>
						<Building className="size-4" />
					</Button>
				);
			},
		},
	];
