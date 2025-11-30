import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	output: 'standalone',
	env: {
		IDX_STOCK_SCREENER_BE: process.env.IDX_STOCK_SCREENER_BE,
	},
};

export default nextConfig;
