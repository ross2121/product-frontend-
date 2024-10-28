/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Disables missing Suspense boundary warning for CSR-only pages
    missingSuspenseWithCSRBailout: false,
  },
};

module.exports = nextConfig;
