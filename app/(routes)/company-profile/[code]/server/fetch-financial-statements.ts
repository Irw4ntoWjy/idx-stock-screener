'use server';

import { fetcher } from '@/lib/fetcher';
import {
	financialStatements,
	FinancialStatementsSchema,
} from '../company-profile-schema';

export const fetchFinancialStatements = async (code: string) => {
	return fetcher<FinancialStatementsSchema[]>(
		`/idx-financial-statements/financial-statements/${code}`,
		{ schema: financialStatements.array() }
	);
};
