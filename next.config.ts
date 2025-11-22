import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    /* config options here */
    reactCompiler: true,
    devIndicators: false,
    logging: {
        fetches: {
            fullUrl: true,
        }
    },
    cacheLife: {
        max: { stale: 3600, revalidate: 60, expire: 7200 },
        blocking: { stale: 0, revalidate: 0, expire: 0 }
    }
};

export default nextConfig;
