import { createMDX } from 'fumadocs-mdx/next';
import type { NextConfig } from 'next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const NextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.notion.so',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/docs',
        destination: '/v1',
        permanent: true,
      },
      {
        source: '/docs/:path*',
        destination: '/v1/:path*',
        permanent: true,
      },
    ];
  },
};

export default withMDX(NextConfig);