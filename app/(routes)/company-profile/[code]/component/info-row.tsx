interface InfoRowProps {
	label: string;
	value: string | undefined;
	icon?: React.ReactNode;
	isLink?: boolean;
}

export const InfoRow = ({
	label,
	value,
	icon,
	isLink,
}: InfoRowProps) => {
	return (
		<div className="flex flex-col gap-1">
			<dt className="text-sm text-muted-foreground">{label}</dt>
			<dd className="text-sm font-medium flex items-center gap-2">
				{icon && (
					<span className="text-muted-foreground">{icon}</span>
				)}
				{isLink && value ? (
					<a
						href={`https://${value}`}
						target="_blank"
						rel="noopener noreferrer"
						className="text-primary hover:underline"
					>
						{value}
					</a>
				) : (
					value
				)}
			</dd>
		</div>
	);
};
