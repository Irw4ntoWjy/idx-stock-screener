'use server';

import { fetcher } from '@/lib/fetcher';

export const fetchForgotPassword = async (email: string) => {
	try {
		const params = new URLSearchParams();
		params.append('email', email.toString());

		const result = await fetcher<{ message: string }>(
			'/account/forgot-password?' + params,
			{
				method: 'POST',
				responseType: 'JSON',
			}
		);

		return { success: true, message: result.message };
	} catch (error: any) {
		return {
			success: false,
			message: error.message.includes('400')
				? 'Error on the server'
				: 'Failed to sent otp',
		};
	}
};
