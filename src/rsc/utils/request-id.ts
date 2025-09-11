
// djb2 hash algorithm
// Reference: https://github.com/vercel/next.js/blob/canary/packages/next/src/shared/lib/hash.ts
export function djb2Hash(str: string) {
  let hash = 5381
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) + hash + char) & 0xffffffff
  }
  return hash >>> 0
}

export function hexHash(str: string) {
  return djb2Hash(str).toString(36).slice(0, 5)
}

/**
 * Generate RSC requestId
 *
 * Note: This is a simplified implementation compared to Next.js
 * Next.js uses complex router state and headers for cache-busting:
 * - https://github.com/vercel/next.js/blob/canary/packages/next/src/shared/lib/router/utils/cache-busting-search-param.ts
 *
 * Our implementation uses simple URL-based hash for consistent caching
 */
export function generateRequestId(href: string): string {
  // Use only href for consistent ID per URL (enables caching)
  // This allows prefetched data to be reused
  const baseString = href

  // Generate short hash (Next.js style)
  return hexHash(baseString)
}

