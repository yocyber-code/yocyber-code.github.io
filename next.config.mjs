/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // static HTML export for GitHub Pages (no Node server)
  images: { unoptimized: true }, // Pages can't run the Next image optimizer
  trailingSlash: true, // emit /path/index.html so static hosting resolves cleanly
};

export default nextConfig;
