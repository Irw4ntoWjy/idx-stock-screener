import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

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
