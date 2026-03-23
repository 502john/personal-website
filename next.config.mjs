/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/resume',
        destination: '/resume.pdf',
        permanent: false,
      },
      {
        source: '/projects/tether/tether-design-document',
        destination: '/tether-design-document.pdf',
        permanent: false,
      },
    ]
  },
}

export default nextConfig;
