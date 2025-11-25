import { Combobox } from '@/components/page/combobox';
import PdfPreviewer from '@/components/page/pdf-viewer/pdf-viewer';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Download } from 'lucide-react';

interface DownloadItemProps {
	name: string;
}

const DownloadItem = ({ name }: DownloadItemProps) => {
	return (
		<button className="w-full flex items-center justify-between px-3 py-2 rounded-md hover:bg-muted/50 transition-colors text-sm group">
			<span className="text-foreground truncate">{name}</span>
			<Download className="h-4 w-4 text-muted-foreground group-hover:text-primary flex-shrink-0 ml-2" />
		</button>
	);
};

export const FinancialStatementTabs = ({}) => {
	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h3 className="text-lg font-semibold">
						Laporan Keuangan Tahun 2025, Periode TW3
					</h3>
					<p className="text-sm text-muted-foreground mt-1">
						FinancialStatement-2025-iii-BBCA
					</p>
				</div>

				<div className="flex items-center gap-3">
					<div className="flex items-center gap-2">
						<span className="text-sm text-foreground">
							Pilih untuk dipreview
						</span>
						<Combobox items={[]} placeholder="Choose Quarter" />
					</div>
					<Combobox items={[]} placeholder="Choose Year" />
					<Button>
						<Download className="size-4 mr-1" />
						Unduh
					</Button>
				</div>
			</div>

			{/* pdf viewer area */}
			<Card className="border-2 border-dashed border-border bg-transparent p-0 h-[500px] flex flex-col">
				<CardContent className="p-0 flex-1">
					<PdfPreviewer url="/Portals/0/StaticData/ListedCompanies/Corporate_Actions/New_Info_JSX/Jenis_Informasi/01_Laporan_Keuangan/02_Soft_Copy_Laporan_Keuangan//Laporan%20Keuangan%20Tahun%202025/TW1/BBCA/FinancialStatement-2025-I-BBCA.pdf" />

					{/* <div className="h-[500px] bg-transparent flex items-center justify-center">
						<div className="text-center space-y-2">
							<FileText className="size-16 text-muted-foreground mx-auto" />
							<p className="text-muted-foreground">
								*Hanya file Financial Statement dalam format pdf
								terpisah di filter yang dapat dipreview
							</p>
						</div>
					</div> */}
				</CardContent>
			</Card>

			<div>
				<h3 className="text-lg font-semibold mb-4">
					Unduh Laporan Keuangan Lainnya
				</h3>
				<div className="grid grid-cols-3 gap-6">
					<Card className="bg-transparent">
						<CardHeader className="pb-3">
							<CardTitle className="text-base text-foreground">
								Laporan Keuangan Tahun 2025 Periode TW1
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-2">
							<DownloadItem name="IntotekQ1.zip" />
							<DownloadItem name="Lapbns.BCA-Mar25.pdf" />
							<DownloadItem name="FinancialStatement-2025-I-BBCA.xlsx" />
							<DownloadItem name="FinancialStatement-2025-I-BBCA.pdf" />
							<DownloadItem name="IntotekBBRI.zip" />
							<Button
								variant="outline"
								className="w-full mt-2 text-foreground bg-transparent hover:text-foreground/20"
							>
								UNDUH SEMUA LAPORAN
							</Button>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
};
