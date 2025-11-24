'use client';

import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from '@/components/ui/tabs';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import {
	Globe,
	Mail,
	MapPin,
	Phone,
	Search,
} from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { CompanyProfileSchema } from './company-profile-schema';
import { InfoRow } from './info-row';

interface CompanyProfilePageProps {
	code: string;
	data: CompanyProfileSchema;
}

export default function CompanyProfilePage({
	code,
	data,
}: CompanyProfilePageProps) {
	const [searchQuery, setSearchQuery] = useState('');
	console.log(data);

	return (
		<div className="bg-card w-full h-full border border-t-0 rounded-b-lg px-4 py-4">
			<div className="mb-2 flex items-center justify-between">
				<div>
					<h2 className="text-2xl font-semibold mb-2 flex items-center gap-2">
						<div className="h-8 w-1 bg-primary rounded-full" />
						Company Information
					</h2>
					<p className="text-muted-foreground">
						Detailed company profile and corporate information
						for IDX listed companies
					</p>
				</div>

				<div className="flex gap-3">
					<div className="relative flex-1 max-w-md">
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-muted-foreground" />
						<Input
							placeholder="Search other company..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className="pl-10 border-border"
						/>
					</div>
				</div>
			</div>

			<ScrollArea.Root
				className="w-full rounded-md border border-border p-4"
				style={{ height: 'calc(100vh - 14rem)' }}
			>
				<ScrollArea.Viewport className="w-full h-full">
					<div className="flex items-start gap-4">
						<div className="size-16 rounded-lg flex items-center justify-center">
							<Image
								src={`https://www.idx.co.id/Portals/0/StaticData/ListedCompanies/LogoEmiten/${code}.jpg`}
								alt={`BBCA logo`}
								width={64}
								height={64}
								className="object-contain p-2"
								unoptimized
							/>
						</div>
						<div>
							<span className="text-2xl font-bold">
								PT Bank Central Asia Tbk.
							</span>
							<p className="text-sm text-muted-foreground mt-1">
								BBCA • IDX Listed Company
							</p>
						</div>
					</div>

					<div className="w-full border-b py-2"></div>

					<div>
						<Tabs
							defaultValue="company-profile"
							className="w-full mt-4"
						>
							<TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0 gap-6">
								<TabsTrigger
									value="company-profile"
									className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 pb-3"
								>
									Company Profile
								</TabsTrigger>
								<TabsTrigger
									value="financial-statement"
									className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 pb-3"
								>
									Financial Statements
								</TabsTrigger>
							</TabsList>

							<TabsContent
								value="company-profile"
								className="space-y-6 mt-4"
							>
								<div className="space-y-6">
									<div>
										<h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
											<div className="h-5 w-1 bg-primary rounded-full" />
											Basic Information
										</h3>
										<div className="grid grid-cols-2 gap-x-12 gap-y-4">
											<InfoRow
												label="Company Name"
												value="PT Bank Central Asia Tbk."
											/>
											<InfoRow
												label="Registration Date"
												value="2000-05-31"
											/>
											<InfoRow label="Stock Code" value="BBCA" />
											<InfoRow
												label="Listing Board"
												value="Main Board"
											/>
											<InfoRow label="Sector" value="Finance" />
											<InfoRow
												label="Sub-sector"
												value="Banking"
											/>
											<InfoRow label="Industry" value="Bank" />
											<InfoRow
												label="Sub-industry"
												value="Bank"
											/>
										</div>
									</div>
								</div>

								<Separator />

								<div>
									<h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
										<div className="h-5 w-1 bg-primary rounded-full" />
										Contact Information
									</h3>
									<div className="grid grid-cols-2 gap-x-12 gap-y-4">
										<div className="col-span-2">
											<InfoRow
												label="Office Address"
												value="Menara BCA, Grand Indonesia Jalan MH Thamrin No. 1 Jakarta 10310"
												icon={<MapPin className="h-4 w-4" />}
											/>
										</div>
										<InfoRow
											label="Email"
											value="investor_relations@bca.co.id"
											icon={<Mail className="h-4 w-4" />}
										/>
										<InfoRow
											label="Phone"
											value="021-23588000"
											icon={<Phone className="h-4 w-4" />}
										/>
										<InfoRow label="Fax" value="021-23588300" />
										<InfoRow
											label="Website"
											value="www.bca.co.id"
											icon={<Globe className="h-4 w-4" />}
											isLink
										/>
										<InfoRow
											label="NPWP"
											value="01.308.449.6-091.000"
										/>
										<InfoRow label="Effective Date" value="-" />
									</div>
								</div>

								<Separator />

								<div>
									<h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
										<div className="h-5 w-1 bg-primary rounded-full" />
										Corporate Secretary
									</h3>
									<div className="grid grid-cols-2 gap-x-12 gap-y-4">
										<InfoRow
											label="Name"
											value="I Ketut Alam Wangsawijaya"
										/>
										<InfoRow
											label="Email"
											value="ketut_wangsawijaya@bca.co.id"
										/>
										<InfoRow
											label="Phone"
											value="021-23588000"
										/>
									</div>
								</div>
							</TabsContent>

							<TabsContent
								value="financial-statement"
								className="mt-6"
							></TabsContent>
						</Tabs>
					</div>
				</ScrollArea.Viewport>
				<ScrollArea.Scrollbar
					orientation="vertical"
					className="w-1 py-2"
				>
					<ScrollArea.Thumb className="bg-muted-foreground dark:bg-primary rounded-full" />
				</ScrollArea.Scrollbar>
			</ScrollArea.Root>
		</div>
	);
}
