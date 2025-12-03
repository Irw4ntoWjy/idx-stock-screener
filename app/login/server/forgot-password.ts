'use server';

import { fetcher } from '@/lib/fetcher';
import { cookies } from 'next/headers';

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

export const verifyForgotPasswordOTP = async (
	email: string,
	otp: string
) => {
	const params = new URLSearchParams();
	params.append('email', email.toString());
	params.append('otp', otp.toString());

	try {
		const result = await fetcher<string>(
			'/user-otp/verify-otp?' + params,
			{
				method: 'POST',
				responseType: 'TEXT',
			}
		);

		const token = result.trim();

		return { success: true, token };
	} catch (error: any) {
		return {
			success: false,
			message: error?.message || 'Something went wrong',
		};
	}
};

export const resetPassword = async (
	token: string,
	newPassword: string
) => {
	const params = new URLSearchParams();
	params.append('token', token.toString());
	params.append('newPassword', newPassword.toString());

	try {
		await fetcher('/user-otp/reset-password?' + params, {
			method: 'POST',
		});

		return { success: true };
	} catch (error: any) {
		return {
			success: false,
			message: error?.message || 'Failed to reset password',
		};
	}
};
