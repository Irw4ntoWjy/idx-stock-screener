import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	env: {
		IDX_STOCK_SCREENER_BE: process.env.IDX_STOCK_SCREENER_BE,
	},
};

export default nextConfig;
