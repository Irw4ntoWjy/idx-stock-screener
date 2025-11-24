'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ShareholdersSchema } from '../company-profile-schema';
import { formatNumber } from '@/lib/utils';

export const getShareholdersTableColumn =
	(): ColumnDef<ShareholdersSchema>[] => [
		{
			id: 'name',
			header: 'Name',
			cell: ({ row }) => (
				<div className="text-foreground">
					{row.original.name}
				</div>
			),
		},
		{
			id: 'category',
			header: 'Tipe',
			cell: ({ row }) => (
				<div className="text-foreground">
					{row.original.category}
				</div>
			),
		},
		{
			id: 'amount',
			header: 'Amount',
			cell: ({ row }) => (
				<div className="text-foreground">
					{row.original.amount
						? formatNumber(row.original.amount)
						: 0}
				</div>
			),
		},
		{
			id: 'percentage',
			header: 'Percentage',
			cell: ({ row }) => (
				<div className="text-foreground">
					{row.original.percentage
						? `${formatNumber(row.original.percentage)}%`
						: '0%'}
				</div>
			),
		},
	];
