// next.config.js
module.exports = {
  // Specify your desired base path here:
  basePath: '/home/merton1111/v2App/ISC_bridge-fork', // Replace with your desired base path

  // Optional: Add any additional Next.js configurations here:
  // For example, you can configure custom webpack behavior, plugins, etc.

  // Example custom webpack configuration:
  webpack: (config, { isServer }) => {
    // Add custom webpack rules or plugins here
    // Example: Load SVG files using raw-loader
    config.module.rules.push({
      test: /\.svg$/,
      use: ['raw-loader'],
    });

    return config;
  },

  // Add more Next.js configurations as needed...

  // Example: Use assetPrefix to specify CDN path for assets
  // assetPrefix: 'https://cdn.example.com/',
};