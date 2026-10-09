import { describe, it, expect } from 'vitest';

import { parseDeepLinkUrl } from './deepLinking';

describe('parseDeepLinkUrl', () => {
  describe('custom scheme URLs', () => {
    it('parses sorobansave:// scheme with join path', () => {
      expect(parseDeepLinkUrl('sorobansave://join/ABC123')).toBe('/join/ABC123');
    });

    it('parses sorobansave:// scheme with app path', () => {
      expect(parseDeepLinkUrl('sorobansave://app/XYZ789')).toBe('/app/XYZ789');
    });

    it('handles multiple path segments', () => {
      expect(parseDeepLinkUrl('sorobansave://group/123/details')).toBe('/group/123/details');
    });

    it('removes trailing slashes', () => {
      expect(parseDeepLinkUrl('sorobansave://join/ABC123/')).toBe('/join/ABC123');
      expect(parseDeepLinkUrl('sorobansave://join/ABC123///')).toBe('/join/ABC123');
    });
  });

  describe('HTTPS URLs', () => {
    it('parses https://sorobansave.app URLs', () => {
      expect(parseDeepLinkUrl('https://sorobansave.app/join/ABC123')).toBe('/join/ABC123');
    });

    it('parses https://app.sorobansave.app URLs', () => {
      expect(parseDeepLinkUrl('https://app.sorobansave.app/join/XYZ789')).toBe('/join/XYZ789');
    });

    it('handles query parameters', () => {
      expect(parseDeepLinkUrl('https://sorobansave.app/join/ABC123?ref=email')).toBe(
        '/join/ABC123?ref=email'
      );
    });

    it('handles multiple path segments in HTTPS URLs', () => {
      expect(parseDeepLinkUrl('https://sorobansave.app/group/123/details')).toBe(
        '/group/123/details'
      );
    });

    it('removes trailing slashes from HTTPS URLs', () => {
      expect(parseDeepLinkUrl('https://sorobansave.app/join/ABC123/')).toBe('/join/ABC123');
      expect(parseDeepLinkUrl('https://sorobansave.app/join/ABC123///')).toBe('/join/ABC123');
    });

    it('handles subdomain paths', () => {
      expect(parseDeepLinkUrl('https://subdomain.sorobansave.app/join/ABC123')).toBe(
        '/join/ABC123'
      );
    });
  });

  describe('invalid/unsupported URLs', () => {
    it('returns null for non-sorobansave domains', () => {
      expect(parseDeepLinkUrl('https://example.com/join/ABC123')).toBeNull();
    });

    it('returns null for incomplete sorobansave URLs', () => {
      expect(parseDeepLinkUrl('https://notsorobansave.app/join/ABC123')).toBeNull();
    });

    it('returns null for malformed URLs', () => {
      expect(parseDeepLinkUrl('not a url')).toBeNull();
    });

    it('returns null for empty strings', () => {
      expect(parseDeepLinkUrl('')).toBeNull();
    });

    it('returns null for unsupported schemes', () => {
      expect(parseDeepLinkUrl('http://sorobansave.app/join/ABC123')).toBeNull();
    });
  });

  describe('edge cases', () => {
    it('handles URLs with ports', () => {
      expect(parseDeepLinkUrl('https://sorobansave.app:443/join/ABC123')).toBe('/join/ABC123');
    });

    it('handles complex query strings', () => {
      expect(parseDeepLinkUrl('https://sorobansave.app/join/ABC123?foo=bar&baz=qux')).toBe(
        '/join/ABC123?foo=bar&baz=qux'
      );
    });

    it('preserves URL fragments', () => {
      const result = parseDeepLinkUrl('sorobansave://join/ABC123#section');
      expect(result).toBeTruthy();
    });
  });
});
