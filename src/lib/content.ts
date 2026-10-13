// Keystatic reader + small helpers shared across pages/components.
import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '../../keystatic.config';

export const reader = createReader(process.cwd(), keystaticConfig);

/** Normalise a Keystatic image value to a public URL (robust to publicPath handling). */
export function resolveImg(v: string | null | undefined): string {
  if (!v) return '';
  return v.startsWith('/') ? v : `/uploads/${v}`;
}

/**
 * Build a tel: href from an Icelandic display phone like "471-1170".
 * Tolerates what an editor might type: "+354 471 1170", "00354…", or two
 * numbers ("471-1170 / 892-3456", only the first is dialled).
 */
export function telHref(phone: string): string {
  const first = phone.split(/[\/,;]|\seða\s/)[0];
  const digits = first.replace(/[^0-9]/g, '').replace(/^(?:00)?354(?=\d{7}$)/, '');
  return `tel:+354${digits}`;
}

/** Short label for a Facebook URL, e.g. "facebook.com/thsverk" → "/thsverk". */
export function facebookLabel(url: string): string {
  const path = url.replace(/^https?:\/\/(www\.)?facebook\.com/i, '').replace(/\/+$/, '');
  return `Facebook${path ? ' · ' + path : ''} →`;
}

/** Google Maps embed URL for an address string. */
export function mapEmbed(address: string): string {
  return `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;
}
