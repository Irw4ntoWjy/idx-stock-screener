import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Download } from 'lucide-react';
import { FinancialStatementsSchema } from '../company-profile-schema';

const DownloadItem = ({
	name,
	url,
}: {
	name: string;
	url: string;
}) => {
	return (
		<a
			href={url}
			rel="noopener noreferrer"
			download
			className="w-full flex items-center justify-between px-3 py-2 rounded-md hover:bg-muted/50 transition-colors text-sm group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
		>
			<span className="text-foreground truncate">{name}</span>
			<Download className="h-4 w-4 text-muted-foreground group-hover:text-primary flex-shrink-0 ml-2" />
		</a>
	);
};

interface FinancialStatementProps {
	data: FinancialStatementsSchema[];
}

export const FinancialStatementTabs = ({
	data,
}: FinancialStatementProps) => {
	if (!data || data.length === 0) {
		return undefined;
	}
	return (
		<div className="space-y-6 mb-2">
			<div>
				<h3 className="text-lg font-semibold mb-4">
					List Laporan Keuangan {data[0].stockCode}
				</h3>
				<div className="grid grid-cols-3 gap-6">
					{data.map((item) => {
						const downloadUrl = `https://www.idx.co.id${
							item.filePath.startsWith('/') ? '' : '/'
						}${item.filePath}`;

						return (
							<Card
								key={`${item.reportYear}-${item.period}`}
								className="bg-transparent border shadow-sm"
							>
								<CardHeader className="pb-3">
									<CardTitle className="text-base text-foreground">
										Laporan Keuangan Tahun {item.reportYear}{' '}
										Periode {item.period}
									</CardTitle>
								</CardHeader>
								<CardContent className="space-y-2">
									<DownloadItem
										name={item.fileName}
										url={downloadUrl}
									/>
								</CardContent>
							</Card>
						);
					})}
				</div>
			</div>
		</div>
	);
};
