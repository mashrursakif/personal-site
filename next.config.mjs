import createMDX from '@next/mdx';

/** @type {import('next').NextConfig} */

const nextConfig = {
  pageExtensions: ['js', 'jsx', 'tsx', 'ts', 'mdx', 'md'],
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
