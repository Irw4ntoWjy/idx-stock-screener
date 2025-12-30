'use client';

import { Button } from '@/components/ui/button';
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from '@/components/ui/tabs';
import { timeout } from '@/lib/utils';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import { ArrowLeft, RefreshCcw } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useTransition } from 'react';
import {
	CompanyProfileSchema,
	FinancialStatementsSchema,
} from '../company-profile-schema';
import { refetchNewestCompanyProfile } from '../server/fetch-company-profile';
import { fetchFinancialStatements } from '../server/fetch-financial-statements';
import { CompanyProfileTabs } from './company-profile-tabs';
import { FinancialStatementTabs } from './financial-statement-tabs';

interface CompanyProfilePageProps {
	code: string;
	data: CompanyProfileSchema;
}

export default function CompanyProfilePage({
	code,
	data,
}: CompanyProfilePageProps) {
	const searchParams = useSearchParams();
	const openFrom = searchParams.get('from') || undefined;
	const router = useRouter();

	const [financialData, setFinancialData] = useState<
		FinancialStatementsSchema[]
	>([]);
	const [isPending, startTransition] = useTransition();

	function handleOnTabChange(
		value: 'company-profile' | 'financial-statement'
	) {
		if (value === 'financial-statement') {
			startTransition(async () => {
				const response = await fetchFinancialStatements(code);
				await timeout(1000);

				setFinancialData(response);
			});
		} else {
			setFinancialData([]);
		}
	}

	const [isRefreshing, transition] = useTransition();
	const handleRefetch = () => {
		transition(async () => {
			await refetchNewestCompanyProfile(code);
			router.refresh();
		});
	};

	return (
		<div className="bg-card w-full h-full border border-t-0 rounded-b-lg px-4 py-4">
			<div className="mb-2 flex items-center justify-between">
				<div>
					<div className="flex items-center gap-3">
						{openFrom === 'fundamental' ? (
							<ArrowLeft
								className="size-5 text-muted-foreground cursor-pointer"
								onClick={() => router.back()}
							/>
						) : (
							<></>
						)}

						<div className="flex items-center gap-3">
							<div className="h-7 w-1 bg-primary rounded-full" />
							<h2 className="text-2xl font-semibold leading-none">
								Company Information
							</h2>
						</div>
					</div>

					<p className="text-muted-foreground mt-2">
						Detailed company profile and corporate information
						for IDX listed companies
					</p>
				</div>
				<Button onClick={handleRefetch} disabled={isRefreshing}>
					<RefreshCcw
						className={isRefreshing ? 'animate-spin' : ''}
					/>
					{isRefreshing
						? 'Refreshing...'
						: 'Refetch Newest Data'}
				</Button>
			</div>

			<ScrollArea.Root
				className="w-full rounded-md border border-border p-4"
				style={{ height: 'calc(100vh - 14rem)' }}
			>
				<ScrollArea.Viewport className="w-full h-full">
					{data && data.companyProfile && (
						<>
							<div className="flex items-start gap-4">
								<div className="size-32 shrink-0 rounded-lg bg-white flex items-center justify-center">
									<img
										src={`https://www.idx.co.id/${data.companyProfile.logo}`}
										alt={`${data.companyProfile.issuerName} Logo`}
										width={108}
										height={108}
										className="object-contain max-w-full max-h-full"
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
						</>
					)}

					<div>
						<Tabs
							onValueChange={(value) =>
								handleOnTabChange(
									value as
										| 'company-profile'
										| 'financial-statement'
								)
							}
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
								{isPending ? (
									<div className="space-y-4">
										<div className="h-6 w-48 bg-muted animate-pulse rounded-md"></div>

										<div className="grid grid-cols-3 gap-6">
											{Array.from({ length: 6 }).map((_, i) => (
												<div
													key={i}
													className="h-40 w-full bg-muted animate-pulse rounded-xl"
												></div>
											))}
										</div>
									</div>
								) : (
									<FinancialStatementTabs data={financialData} />
								)}
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
