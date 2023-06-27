const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/data/:path*",
        destination: `http://ec2-54-180-8-246.ap-northeast-2.compute.amazonaws.com:8080/:path*`,
      },
    ];
  },
};

export default nextConfig;
