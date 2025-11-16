import { cn } from '@/lib/utils';

interface SpinnerProps {
	className?: string;
	size?: number;
}

export function Spinner({ className, size = 24 }: SpinnerProps) {
	return (
		<div
			className={cn(
				'inline-block animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-middle',
				className
			)}
			style={{ width: size, height: size }}
		/>
	);
}
