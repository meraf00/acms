export const siteConfig = {
  api: {
    version: process.env.NEXT_PUBLIC_API_VERSION,
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    staleTime: 30000, // 30 seconds
  },
  links: {
    google: process.env.NEXT_PUBLIC_GOOGLE_AUTH_URL,
  },
};
