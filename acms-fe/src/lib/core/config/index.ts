export const siteConfig = {
  api: {
    version: process.env.NEXT_PUBLIC_API_VERSION,
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    staleTime: 30000, // 30 seconds
    cookieMaxAge: +process.env.NEXT_PUBLIC_COOKIE_MAX_AGE!,
  },
  links: {
    google: process.env.NEXT_PUBLIC_GOOGLE_AUTH_URL,
    otp: process.env.NEXT_PUBLIC_OTP_AUTH_URL,
  },
  isProduction: process.env.NEXT_PUBLIC_ENV !== 'development',
};

export const appCookies = {
  accessToken: 'ACCESS_TOKEN',
};
