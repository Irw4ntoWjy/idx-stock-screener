'use client';

import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Key, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';
import { fetchLoginInfo } from './server/login';

export default function Login() {
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
		<div className="flex items-center justify-center h-full">
			<Card className="w-full max-w-md bg-white border-0 shadow-xl dark:border-gray-700 p-8">
				<CardHeader className="space-y-1">
					<div className="flex justify-center gap-3 items-center">
						<TrendingUp className="size-8 text-blue-500" />
						<CardTitle className="text-2xl text-center text-black">
							IDX Stocks Screener
						</CardTitle>
					</div>
					<CardDescription className="text-center text-gray-400">
						Sign in to your account
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4 p-6">
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
								placeholder="••••••••"
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
					<div className="text-center space-y-2 text-sm">
						<Link
							href="#"
							className="text-blue-500 underline-offset-4 hover:underline font-medium flex items-center justify-center gap-1"
						>
							<Key className="h-3 w-3 inline" />
							Forgot password?
						</Link>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
