'use client';

import { Input } from '@/components/ui/input';
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from '@/components/ui/tabs';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import { Search } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { CompanyProfileSchema } from '../company-profile-schema';
import { CompanyProfileTabs } from './company-profile-tabs';
import { FinancialStatementTabs } from './financial-statement-tabs';

interface CompanyProfilePageProps {
	data: CompanyProfileSchema;
}

export default function CompanyProfilePage({
	data,
}: CompanyProfilePageProps) {
	const [searchQuery, setSearchQuery] = useState('');

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
							className="pl-10 border-border text-white"
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
						<div className="size-32 shrink-0 rounded-lg bg-white flex items-center justify-center">
							<Image
								src={`https://www.idx.co.id/${data.companyProfile.logo}`}
								alt={`${data.companyProfile.issuerName} Logo`}
								width={108}
								height={108}
								className="object-contain max-w-full max-h-full"
								unoptimized
							/>
						</div>

						<div className="flex flex-col justify-center min-h-[128px]">
							<span className="text-2xl font-bold">
								{data.companyProfile.issuerName}
							</span>
							<p className="text-sm text-muted-foreground mt-1">
								• IDX Listed Company
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
									className="rounded-none cursor-pointer border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 pb-3"
								>
									Company Profile
								</TabsTrigger>
								<TabsTrigger
									value="financial-statement"
									className="rounded-none  cursor-pointer border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 pb-3"
								>
									Financial Statements
								</TabsTrigger>
							</TabsList>

							<TabsContent
								value="company-profile"
								className="space-y-6 mt-4"
							>
								<CompanyProfileTabs data={data} />
							</TabsContent>

							<TabsContent
								value="financial-statement"
								className="mt-6"
							>
								<FinancialStatementTabs />
							</TabsContent>
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
