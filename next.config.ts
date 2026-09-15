import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configuración estable
  serverActions: {
    bodySizeLimit: "4mb", 
  },
  // Fallback para entornos donde la configuración estable es ignorada
  experimental: {
    serverActions: {
      bodySizeLimit: "4mb",
    },
  },
  
  // 1. Configuración de Imágenes (Cloudinary)
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "www.sycmobile.pe",
      }
    ]
  },

  // 2. Redirecciones SEO
  async redirects() {
    return [
      {
        source: '/productos',
        destination: '/catalogo',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;