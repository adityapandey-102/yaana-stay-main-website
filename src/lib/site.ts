export function getBaseUrl() {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL
  const vercelUrl = process.env.VERCEL_URL
  const url =
    (envUrl && envUrl.trim()) ||
    (vercelUrl ? `https://${vercelUrl}` : 'http://localhost:3000')

  return url.endsWith('/') ? url.slice(0, -1) : url
}
