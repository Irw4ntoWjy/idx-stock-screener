import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import * as XLSX from 'xlsx';
import { DateFormatter } from '@internationalized/date';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
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

export const exportToExcel = (
	exportRow: Record<string, string>[],
	colWidth: Record<'wch', number>[],
	excelName: string
) => {
	// create sheet
	const newTab = XLSX.utils.book_new();
	const newSheet = XLSX.utils.json_to_sheet(exportRow);

	newSheet['!cols'] = colWidth;

	XLSX.utils.book_append_sheet(newTab, newSheet, excelName);
	XLSX.writeFile(
		newTab,
		`${excelName}-${new Date().toISOString().split('T')[0]}.xlsx`
	);
};
