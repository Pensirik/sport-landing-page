export function decodeBase64(data: string) {
  if (typeof window === 'undefined') return Buffer.from(data, 'base64');
  return window.atob(data);
}

export function encodeBase64(data: string) {
  if (typeof window === 'undefined') return Buffer.from(data).toString('base64');
  return window.btoa(data);
}
