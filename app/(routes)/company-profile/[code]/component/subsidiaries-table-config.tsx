'use client';

import { ColumnDef } from '@tanstack/react-table';
import {
	AuditCommitteeSchema,
	SubsidiariesSchema,
} from '../company-profile-schema';
import { formatNumber } from '@/lib/utils';

export const getSubsidiariesTableColumn =
	(): ColumnDef<SubsidiariesSchema>[] => [
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
			id: 'businessField',
			header: 'Business Field',
			cell: ({ row }) => (
				<div className="text-foreground text-wrap">
					{row.original.businessField}
				</div>
			),
		},
		{
			id: 'assetAmount',
			header: 'Total Asset',
			cell: ({ row }) => (
				<div className="text-foreground">
					{formatNumber(row.original.assetAmount)}
				</div>
			),
		},
		{
			id: 'percentage',
			header: 'Percentage',
			cell: ({ row }) => (
				<div className="text-foreground">
					{`${row.original.percentage}%`}
				</div>
			),
		},
	];
