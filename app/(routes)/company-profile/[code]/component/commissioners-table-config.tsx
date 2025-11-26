'use client';

import { ColumnDef } from '@tanstack/react-table';
import { CommissionersSchema } from '../company-profile-schema';

export const getCommissionersTableColumn =
	(): ColumnDef<CommissionersSchema>[] => [
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
			id: 'position',
			header: 'Position',
			cell: ({ row }) => (
				<div className="text-foreground">
					{row.original.position}
				</div>
			),
		},
		{
			id: 'isIndependent',
			header: 'Independent',
			cell: ({ row }) => (
				<div className="text-foreground">
					{row.original.isIndependent ? 'Ya' : 'Tidak'}
				</div>
			),
		},
	];
