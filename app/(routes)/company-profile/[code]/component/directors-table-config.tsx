'use client';

import { ColumnDef } from '@tanstack/react-table';
import { DirectorsSchema } from '../company-profile-schema';

export const getDirectorsTableColumn =
	(): ColumnDef<DirectorsSchema>[] => [
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
			id: 'isAffiliate',
			header: 'Affiliate',
			cell: ({ row }) => (
				<div className="text-foreground">
					{row.original.isAffiliate ? 'Ya' : 'Tidak'}
				</div>
			),
		},
	];
