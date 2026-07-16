// Keystatic reader + small helpers shared across pages/components.
import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '../../keystatic.config';

export const reader = createReader(process.cwd(), keystaticConfig);

/** Normalise a Keystatic image value to a public URL (robust to publicPath handling). */
export function resolveImg(v: string | null | undefined): string {
  if (!v) return '';
  return v.startsWith('/') ? v : `/uploads/${v}`;
}

/** Build a tel: href from an Icelandic display phone like "471-1170". */
export function telHref(phone: string): string {
  const digits = phone.replace(/[^0-9]/g, '');
  return `tel:+354${digits}`;
}

/** Google Maps embed URL for an address string. */
export function mapEmbed(address: string): string {
  return `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;
}
