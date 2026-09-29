/** A vendor link we are willing to open. Rejects scripts, data URLs, and login-in-the-address tricks. */
export function externalHttpsUrl(value: string): { href: string; host: string } | null {
  let url: URL;
  try {
    url = new URL(value.trim());
  } catch {
    return null;
  }
  if (url.protocol !== "https:") return null;
  if (url.username || url.password) return null;
  const host = url.hostname;
  if (!host || !host.includes(".")) return null;
  if (/^\d{1,3}(?:\.\d{1,3}){3}$/.test(host)) return null;
  return { href: url.href, host };
}
