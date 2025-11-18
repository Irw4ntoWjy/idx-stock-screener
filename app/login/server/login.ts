'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const fetchLoginInfo = async (
	username: string,
	password: string
) => {
	const backendUrl = process.env.IDX_STOCK_SCREENER_BE;
	if (!backendUrl) throw new Error('Backend URL not configured');

	const url = new URL(`${backendUrl}/account/login`);
	url.searchParams.append('username', username.toString());
	url.searchParams.append('password', password.toString());

	const res = await fetch(url, {
		headers: {
			'Content-Type': 'application/json',
		},
		cache: 'no-store',
	});
	if (!res.ok) {
		const errorText = await res.text();
		throw new Error(
			`Login failed: ${res.status} - ${errorText}`
		);
	}

	const token = (await res.text()).trim();

	const cookieStore = await cookies();
	cookieStore.set('token', token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'strict',
		maxAge: 60 * 60 * 24,
		path: '/',
	});
	redirect('/technical');
};
