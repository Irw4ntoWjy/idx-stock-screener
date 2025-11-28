import { DateFormatter } from '@internationalized/date';
import { clsx, type ClassValue } from 'clsx';
import { toast } from 'sonner';
import { twMerge } from 'tailwind-merge';
import * as XLSX from 'xlsx';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function timeout(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export const dateFormat = (
	date: Date,
	dateStyle?: 'full' | 'long' | 'medium' | 'short'
): string => {
	return new DateFormatter('en-GB', {
		dateStyle: dateStyle ?? 'long',
	}).format(date);
};

export const dateFormatString = (
	dateStr: string | undefined | null,
	dateStyle?: 'full' | 'long' | 'medium' | 'short'
): string => {
	if (!dateStr) return '';
	return dateFormat(new Date(`${dateStr}Z`), dateStyle);
};

export const formatNumber = (
	num: number | undefined
): string => {
	if (!num) return '';
	return num.toLocaleString('id-ID');
};

let debounceTimer: ReturnType<typeof setTimeout>;
export const debounce = (
	callback: () => void,
	timeout = 800
) => {
	clearTimeout(debounceTimer);
	debounceTimer = setTimeout(() => {
		callback();
	}, timeout);
};

export type ExportConfig<T> = {
	sheetName: string;
	fileName: string;
	columns: {
		header: string;
		width: number;
		value: (row: T) => string;
	}[];
};

export const exportToExcel = <T>(
	data: T[],
	config: ExportConfig<T>
) => {
	if (data.length === 0) {
		toast.warning('No data to be Exported');
		return;
	}

	const exportData = data.map((row) =>
		Object.fromEntries(
			config.columns.map((col) => [col.header, col.value(row)])
		)
	);

	const colWidths = config.columns.map((col) => ({
		wch: col.width,
	}));

	const workbook = XLSX.utils.book_new();
	const worksheet = XLSX.utils.json_to_sheet(exportData);
	worksheet['!cols'] = colWidths;

	XLSX.utils.book_append_sheet(
		workbook,
		worksheet,
		config.sheetName
	);
	XLSX.writeFile(
		workbook,
		`${config.fileName}-${
			new Date().toISOString().split('T')[0]
		}.xlsx`
	);
};
