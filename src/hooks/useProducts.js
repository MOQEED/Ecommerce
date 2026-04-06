import { useState, useEffect, useCallback } from 'react'
import { getProducts, getProductById, getCategories } from '../services/api'

export function useProducts(options = {}) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [hasMore, setHasMore] = useState(true)

  const { category, limit = 20, initialLoad = true } = options

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getProducts({ category, limit })
      setProducts(data)
      setHasMore(data.length >= limit)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [category, limit])

  useEffect(() => {
    if (initialLoad) {
      fetchProducts()
    }
  }, [fetchProducts, initialLoad])

  return { products, loading, error, hasMore, refetch: fetchProducts }
}

export function useProduct(id) {
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return
      
      try {
        setLoading(true)
        setError(null)
        const data = await getProductById(id)
        setProduct(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  return { product, loading, error }
}

export function useCategories() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true)
        const data = await getCategories()
        setCategories(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  return { categories, loading, error }
}
