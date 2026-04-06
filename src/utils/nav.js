/**
 * Active state for main nav links (handles /products vs /products?category=…).
 */

export function isNavLinkActive(to, { pathname, search }) {
  const params = new URLSearchParams(search)

  if (to === '/') {
    return pathname === '/'
  }

  if (to === '/cart') {
    return pathname === '/cart'
  }

  if (to === '/checkout') {
    return pathname === '/checkout'
  }

  if (to === '/products') {
    return pathname === '/products' && !params.get('category')
  }

  if (to.includes('?')) {
    const [path, queryString] = to.split('?')
    if (pathname !== path) return false
    const want = new URLSearchParams(queryString)
    const have = new URLSearchParams(search)
    for (const [k, v] of want.entries()) {
      if (have.get(k) !== v) return false
    }
    return true
  }

  return pathname === to
}
