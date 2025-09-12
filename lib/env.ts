/**
 * Dynamic URL helper for NextAuth
 * Provides fallback URL detection for Vercel deployments
 */
export const runtimeUrl =
  process.env.NEXTAUTH_URL ??
  (process.env['VERCEL_URL'] ? `https://${process.env['VERCEL_URL']}` : 'http://localhost:3000');

/**
 * Get the base URL for the current environment
 * Useful for constructing absolute URLs in API routes and server components
 */
export const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    // Browser should use relative URL
    return '';
  }
  if (process.env.NEXTAUTH_URL) {
    // SSR should use NEXTAUTH_URL
    return process.env.NEXTAUTH_URL;
  }
  if (process.env['VERCEL_URL']) {
    // Reference for vercel.com
    return `https://${process.env['VERCEL_URL']}`;
  }
  // Assume localhost
  return 'http://localhost:3000';
};
