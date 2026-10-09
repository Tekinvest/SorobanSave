/**
 * Deep linking utility functions for URL scheme parsing
 */

/**
 * Parse a deep link URL and extract the route path
 * Supports multiple URL schemes:
 * - sorobansave://join/ABC123
 * - https://sorobansave.app/join/ABC123
 * - https://app.sorobansave.app/join/ABC123
 */
export function parseDeepLinkUrl(url: string): string | null {
  try {
    // Remove trailing slashes
    url = url.replace(/\/+$/, '');

    // Handle custom scheme (sorobansave://)
    if (url.startsWith('sorobansave://')) {
      const path = url.replace('sorobansave://', '');
      return `/${path}`;
    }

    // Handle HTTPS URLs (universal/app links)
    if (url.startsWith('https://')) {
      const urlObj = new URL(url);

      // Check if it's our domain
      if (
        urlObj.hostname === 'sorobansave.app' ||
        urlObj.hostname === 'app.sorobansave.app' ||
        urlObj.hostname.endsWith('.sorobansave.app')
      ) {
        // Extract pathname (e.g., /join/ABC123)
        return urlObj.pathname + urlObj.search;
      }
    }

    return null;
  } catch {
    return null;
  }
}
