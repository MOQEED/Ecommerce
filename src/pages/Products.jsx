import { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductGrid from '../components/product/ProductGrid'
import ProductFilters from '../components/product/ProductFilters'
import { useProducts } from '../hooks/useProducts'
import { useDebounce } from '../hooks/useDebounce'
import { PRODUCTS_PER_PAGE } from '../utils/constants'

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  
  const categoryParam = searchParams.get('category') || ''
  const searchParam = searchParams.get('search') || ''
  
  const [selectedCategory, setSelectedCategory] = useState(categoryParam)
  const [sortBy, setSortBy] = useState('default')
  const [priceRange, setPriceRange] = useState({ min: '', max: '' })
  const [currentPage, setCurrentPage] = useState(1)

  const { products, loading, error } = useProducts({ 
    category: selectedCategory,
    limit: 100 // Fetch all for client-side filtering
  })

  const debouncedPriceRange = useDebounce(priceRange, 300)

  // Update URL when category changes
  useEffect(() => {
    const params = new URLSearchParams()
    if (selectedCategory) params.set('category', selectedCategory)
    if (searchParam) params.set('search', searchParam)
    setSearchParams(params)
  }, [selectedCategory, searchParam, setSearchParams])

  // Reset category when URL param changes
  useEffect(() => {
    setSelectedCategory(categoryParam)
  }, [categoryParam])

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...products]

    // Search filter
    if (searchParam) {
      const query = searchParam.toLowerCase()
      result = result.filter(p => 
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
      )
    }

    // Price filter
    if (debouncedPriceRange.min) {
      result = result.filter(p => p.price >= Number(debouncedPriceRange.min))
    }
    if (debouncedPriceRange.max) {
      result = result.filter(p => p.price <= Number(debouncedPriceRange.max))
    }

    // Sort
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        result.sort((a, b) => b.price - a.price)
        break
      case 'name-asc':
        result.sort((a, b) => a.title.localeCompare(b.title))
        break
      case 'name-desc':
        result.sort((a, b) => b.title.localeCompare(a.title))
        break
      case 'rating':
        result.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0))
        break
      default:
        break
    }

    return result
  }, [products, searchParam, debouncedPriceRange, sortBy])

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE)
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  )

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
    setCurrentPage(1)
  }

  const handlePriceChange = (range) => {
    setPriceRange(range)
    setCurrentPage(1)
  }

  const handleSortChange = (sort) => {
    setSortBy(sort)
  }

  return (
    <div className="products-page">
      <div className="container">
        <div className="products-header">
          <h1 className="section-title">
            {selectedCategory ? selectedCategory : 'All Products'}
            {searchParam && ` - Search: "${searchParam}"`}
          </h1>
          <span className="products-count">
            {filteredProducts.length} products found
          </span>
        </div>

        <div className="products-layout">
          <ProductFilters
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
            priceRange={priceRange}
            onPriceChange={handlePriceChange}
            sortBy={sortBy}
            onSortChange={handleSortChange}
          />

          <div className="products-main">
            <ProductGrid 
              products={paginatedProducts} 
              loading={loading} 
              error={error} 
            />

            {totalPages > 1 && (
              <div className="pagination">
                <button
                  className="pagination-btn"
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  ←
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                ))}
                <button
                  className="pagination-btn"
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Products
