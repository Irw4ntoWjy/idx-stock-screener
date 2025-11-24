'use client';

import { ColumnDef } from '@tanstack/react-table';
import { AuditCommitteeSchema } from '../company-profile-schema';

export const getAuditCommitteeTableColumn =
	(): ColumnDef<AuditCommitteeSchema>[] => [
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
			id: 'name',
			header: 'Name',
			cell: ({ row }) => (
				<div className="text-foreground">
					{row.original.name}
				</div>
			),
		},
	];
