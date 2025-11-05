import type { NextConfig } from "next";

/**
 * Next.js Configuration for Turbopack + Turso
 * Handles LibSQL packages that include .md files
 */
const nextConfig: NextConfig = {
  // Enable React Compiler for optimized builds
  reactCompiler: true,

  // Image optimization configuration
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },

  // Turbopack configuration to handle non-JS files in node_modules
  turbopack: {
    rules: {
      // Treat .md and LICENSE files as text assets
      // This fixes issues with @libsql packages
      "*.md": {
        loaders: ["raw-loader"],
        as: "*.js",
      },
      "**/LICENSE": {
        loaders: ["raw-loader"],
        as: "*.js",
      },
    },
  },
};

export default nextConfig;
