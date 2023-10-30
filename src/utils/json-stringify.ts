// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function safeJsonStringify(obj: any): string | undefined {
  try {
    return JSON.stringify(obj);
  } catch (e) {
    return undefined;
  }
}
