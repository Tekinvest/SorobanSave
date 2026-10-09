/**
 * Re-exports from the shared @soroban-save/sdk package.
 * Existing imports of this module continue to work unchanged.
 */
export { formatDate, formatDistanceToNow } from '@soroban-save/sdk';
export type { FormatDateOptions } from '@soroban-save/sdk';

/** Convenience wrapper: always relative mode. */
export function formatDateRelative(
  input: string | number | Date,
  options: Omit<import('@soroban-save/sdk').FormatDateOptions, 'mode'> = {}
): string {
  const { formatDate: fd } = require('@soroban-save/sdk');
  return fd(input, { mode: 'relative', ...options });
}

/** Convenience wrapper: always absolute mode. */
export function formatDateAbsolute(
  input: string | number | Date,
  options: Omit<import('@soroban-save/sdk').FormatDateOptions, 'mode'> = {}
): string {
  const { formatDate: fd } = require('@soroban-save/sdk');
  return fd(input, { mode: 'absolute', ...options });
}
