import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const formatNumber = (num: number) => {
	return new Intl.NumberFormat('id-ID').format(num);
};

export const formatPercent = (num: number) => {
	return `${num >= 0 ? '+' : ''}${num.toFixed(2)}%`;
};

export const getTrendColor = (value: number) =>
	value > 0
		? 'text-green-500'
		: value < 0
		? 'text-red-500'
		: 'text-muted-foreground';
