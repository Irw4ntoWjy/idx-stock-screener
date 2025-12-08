'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { fetchLoginInfo } from '../server/login';

export const LoginForm = () => {
	const router = useRouter();

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);

	const handleSubmit = async (
		e: React.FormEvent<HTMLFormElement>
	) => {
		e.preventDefault();

		if (!username || !password) {
			toast.warning('Username/password cannot be empty');
			return;
		}

		const response = await fetchLoginInfo(username, password);

		if (response.success) {
			toast.success('Successfully Login');
			setTimeout(() => router.push('/technical'), 300);
		} else {
			toast.error(response.error || 'Login failed');
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
				<div className="relative">
					<Input
						id="password"
						type={showPassword ? 'text' : 'password'}
						placeholder="••••••••••"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="border-gray-400/70 pr-10" // pr-10 to make room for icon
						required
					/>
					<button
						type="button"
						onClick={() => setShowPassword(!showPassword)}
						className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 focus:outline-none"
						aria-label={
							showPassword ? 'Hide password' : 'Show password'
						}
					>
						{showPassword ? (
							<EyeOff className="size-4" />
						) : (
							<Eye className="size-4" />
						)}
					</button>
				</div>
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
