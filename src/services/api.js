/**
 * Product catalog: fetched from `/data/products.json` (see `public/data/products.json`).
 * Parsed data is cached in memory and in localStorage for faster repeat visits.
 */

const CATALOG_URL = '/data/products.json'
const STORAGE_KEY = 'anon_catalog_json_v1'
const STORAGE_TS_KEY = 'anon_catalog_json_ts_v1'
const LOCAL_TTL_MS = 24 * 60 * 60 * 1000 // 24 hours

const memoryCache = new Map()
let inflightCatalog = null

const getLsCatalog = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const ts = localStorage.getItem(STORAGE_TS_KEY)
    if (!raw || !ts) return null
    if (Date.now() - Number(ts) > LOCAL_TTL_MS) {
      localStorage.removeItem(STORAGE_KEY)
      localStorage.removeItem(STORAGE_TS_KEY)
      return null
    }
    return JSON.parse(raw)
  } catch {
    return null
  }
}

const setLsCatalog = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    localStorage.setItem(STORAGE_TS_KEY, String(Date.now()))
  } catch {
    /* quota or private mode */
  }
}

async function loadCatalog() {
  const memKey = 'all'
  if (memoryCache.has(memKey)) {
    return memoryCache.get(memKey)
  }

  const fromLs = getLsCatalog()
  if (fromLs && Array.isArray(fromLs)) {
    memoryCache.set(memKey, fromLs)
    return fromLs
  }

  if (!inflightCatalog) {
    inflightCatalog = (async () => {
      const response = await fetch(CATALOG_URL)
      if (!response.ok) {
        throw new Error(`Could not load catalog (${response.status})`)
      }
      const data = await response.json()
      if (!Array.isArray(data)) {
        throw new Error('Invalid catalog format')
      }
      memoryCache.set(memKey, data)
      setLsCatalog(data)
      return data
    })().finally(() => {
      inflightCatalog = null
    })
  }

  return inflightCatalog
}

export const getProducts = async ({ category, limit } = {}) => {
  const all = await loadCatalog()
  let list = category
    ? all.filter((p) => p.category === category)
    : [...all]

  if (limit != null && limit > 0) {
    list = list.slice(0, limit)
  }
  return list
}

export const getProductById = async (id) => {
  const all = await loadCatalog()
  const product = all.find((p) => String(p.id) === String(id))
  if (!product) {
    throw new Error('Product not found')
  }
  return product
}

export const getCategories = async () => {
  const all = await loadCatalog()
  const order = ['electronics', 'jewelery', "men's clothing", "women's clothing"]
  const seen = new Set(all.map((p) => p.category))
  return order.filter((c) => seen.has(c))
}

export const searchProducts = async (query) => {
  const products = await getProducts({})
  const q = query.toLowerCase().trim()
  if (!q) return products
  return products.filter(
    (product) =>
      product.title.toLowerCase().includes(q) ||
      product.description.toLowerCase().includes(q) ||
      product.category.toLowerCase().includes(q)
  )
}

/** Clears in-memory cache and localStorage copy (next visit refetches JSON). */
export const clearCache = () => {
  memoryCache.clear()
  inflightCatalog = null
  try {
    localStorage.removeItem(STORAGE_KEY)
    localStorage.removeItem(STORAGE_TS_KEY)
  } catch {
    /* ignore */
  }
}
