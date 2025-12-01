'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { fetchLoginInfo } from '../server/login';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export const LoginForm = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = async (
		e: React.FormEvent<HTMLFormElement>
	) => {
		e.preventDefault();

		if (!username || !password) {
			toast.warning('Username/password cannot be empty');
			return;
		}

		try {
			await fetchLoginInfo(username, password);
		} catch (error) {
			const message =
				error instanceof Error ? error.message : 'Login failed';
			toast.error(message);
		}
	};

	return (
		<form className="space-y-4" onSubmit={handleSubmit}>
			<div className="space-y-2">
				<Label
					htmlFor="email"
					className="flex items-center gap-2 text-black"
				>
					Username
				</Label>
				<Input
					id="username"
					type="text"
					placeholder="Username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					className="border-gray-400/70"
					required
				/>
			</div>
			<div className="space-y-2">
				<Label
					htmlFor="password"
					className="flex items-center gap-2 text-black"
				>
					Password
				</Label>
				<Input
					id="password"
					type="password"
					placeholder="••••••••••"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					className=" focus:border-blue-500 focus:ring-blue-500 border-gray-400/70"
					required
				/>
			</div>
			<Button
				type="submit"
				className="w-full hover:bg-blue-700 text-white border-0 mt-4"
			>
				Sign In
			</Button>
		</form>
	);
};
