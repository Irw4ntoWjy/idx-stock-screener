'use server';

import { fetcher } from '@/lib/fetcher';
import { cookies } from 'next/headers';

export const fetchLoginInfo = async (
	username: string,
	password: string
) => {
	try {
		const params = new URLSearchParams();
		params.append('username', username.toString());
		params.append('password', password.toString());

		const token = await fetcher<string>(
			'/account/login?' + params,
			{
				responseType: 'TEXT',
			}
		);

		const cleanToken = token.trim();

		const cookieStore = await cookies();
		cookieStore.set('token', cleanToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'strict',
			maxAge: 60 * 60 * 8, // 8 hours
			path: '/',
		});
		return { success: true };
	} catch (error: any) {
		return {
			success: false,
			error:
				error.message ||
				'Login failed. Please check your credentials.',
		};
	}
};
