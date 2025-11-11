import { cn } from '@/lib/utils';
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '../ui/pagination';

interface PaginationProps {
	currentPage: number;
	totalItems: number;
	itemsPerPage: number;
	onPageChange: (page: number) => void;
}

export function DataTablePagination({
	currentPage,
	totalItems,
	itemsPerPage,
	onPageChange,
}: PaginationProps) {
	const totalPages = Math.ceil(totalItems / itemsPerPage);

	if (totalPages <= 1) return null;

	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = Math.min(
		startIndex + itemsPerPage,
		totalItems
	);

	const getPageNumbers = () => {
		if (totalPages <= 5)
			return Array.from({ length: totalPages }, (_, i) => i + 1);
		if (currentPage <= 3) return [1, 2, 3, 4, 5];
		if (currentPage >= totalPages - 2)
			return Array.from(
				{ length: 5 },
				(_, i) => totalPages - 4 + i
			);
		return Array.from(
			{ length: 5 },
			(_, i) => currentPage - 2 + i
		);
	};

	return (
		<div className="mt-4 flex items-center justify-between">
			<div className="text-sm text-muted-foreground">
				Showing {startIndex + 1} to {endIndex} of {totalItems}{' '}
				Stocks
			</div>

			<Pagination>
				<PaginationContent>
					<PaginationItem>
						<PaginationPrevious
							onClick={() =>
								onPageChange(Math.max(1, currentPage - 1))
							}
							className={cn(
								currentPage === 1
									? 'pointer-events-none text-muted-foreground opacity-50'
									: 'cursor-pointer text-foreground'
							)}
						/>
					</PaginationItem>

					{getPageNumbers().map((pageNum) => (
						<PaginationItem key={pageNum}>
							<PaginationLink
								onClick={() => onPageChange(pageNum)}
								isActive={currentPage === pageNum}
								className="cursor-pointer text-foreground"
							>
								{pageNum}
							</PaginationLink>
						</PaginationItem>
					))}

					{totalPages > 5 && currentPage < totalPages - 2 && (
						<PaginationItem>
							<PaginationEllipsis className="text-foreground" />
						</PaginationItem>
					)}

					<PaginationItem>
						<PaginationNext
							onClick={() =>
								onPageChange(
									Math.min(totalPages, currentPage + 1)
								)
							}
							className={cn(
								currentPage === totalPages
									? 'pointer-events-none text-muted-foreground opacity-50'
									: 'cursor-pointer text-foreground '
							)}
						/>
					</PaginationItem>
				</PaginationContent>
			</Pagination>
		</div>
	);
}
