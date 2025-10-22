'use client';

import { Switch } from '@/components/ui/switch';
import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeSwitch() {
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => setMounted(true), []);
	if (!mounted) return null;

	const isDark = theme === 'dark';

	return (
		<motion.div
			className="flex items-center gap-2"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.3 }}
		>
			<Switch
				checked={isDark}
				onCheckedChange={(checked) =>
					setTheme(checked ? 'dark' : 'light')
				}
				className="transition-all duration-300 cursor-pointer"
			/>
			{isDark ? (
				<Moon className="h-4 w-4 text-primary transition-transform duration-300 rotate-0" />
			) : (
				<Sun className="h-4 w-4 text-yellow-500 transition-transform duration-300 rotate-0" />
			)}
		</motion.div>
	);
}
