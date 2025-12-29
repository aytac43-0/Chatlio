import { format, isBefore, parseISO, isValid } from 'date-fns';

export function formatDateIso(iso?: string | null) {
  if (!iso) return '';
  const d = typeof iso === 'string' ? parseISO(iso) : iso as unknown as Date;
  if (!isValid(d)) return '';
  return format(d, 'PPP p');
}

export function isOverdue(iso?: string | null) {
  if (!iso) return false;
  const d = parseISO(iso);
  if (!isValid(d)) return false;
  return isBefore(d, new Date());
}
