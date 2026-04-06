import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'
import { useProducts, useCategories } from '../hooks/useProducts'
import ProductGrid from '../components/product/ProductGrid'
import Button from '../components/common/Button'
import { CATEGORY_ICONS } from '../utils/constants'
import { capitalizeFirst } from '../utils/helpers'

const Home = () => {
  const { products, loading, error } = useProducts({ limit: 20 })
  const { categories } = useCategories()

  const newArrivals = useMemo(() => products.slice(0, 8), [products])
  const trendingProducts = useMemo(() => {
    return [...products]
      .sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0))
      .slice(0, 8)
  }, [products])

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Discover Amazing Products at Unbeatable Prices</h1>
            <p>
              Shop the latest trends in fashion, electronics, and more. 
              Free shipping on orders over $50!
            </p>
            <Link to="/products">
              <Button variant="primary" size="lg">
                Shop Now <FiArrowRight />
              </Button>
            </Link>
          </div>
          <div className="hero-image">
            <img 
              src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&q=80" 
              alt="Shopping"
            />
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Shop by Category</h2>
            <Link to="/products" className="section-link">
              View All <FiArrowRight />
            </Link>
          </div>
          <div className="category-grid">
            {categories.map(category => (
              <Link 
                key={category} 
                to={`/products?category=${encodeURIComponent(category)}`}
                className="category-card"
              >
                <span className="icon">{CATEGORY_ICONS[category] || '📦'}</span>
                <span>{capitalizeFirst(category)}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals — Anon-style section */}
      <section className="products-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">New Arrivals</h2>
            <Link to="/products" className="section-link">
              View All <FiArrowRight />
            </Link>
          </div>
          <ProductGrid products={newArrivals} loading={loading} error={error} />
        </div>
      </section>

      {!loading && products.length > 0 && (
        <section className="products-section products-section--alt">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Trending Now</h2>
              <Link to="/products" className="section-link">
                View All <FiArrowRight />
              </Link>
            </div>
            <ProductGrid products={trendingProducts} loading={false} error={error} />
          </div>
        </section>
      )}

      {/* Banner Section */}
      <section className="banner" style={{ 
        background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)',
        padding: 'var(--spacing-3xl) 0',
        color: 'white',
        textAlign: 'center'
      }}>
        <div className="container">
          <h2 style={{ fontSize: 'var(--font-size-3xl)', marginBottom: 'var(--spacing-md)' }}>
            Get 20% Off Your First Order
          </h2>
          <p style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--spacing-lg)', opacity: 0.9 }}>
            Sign up for our newsletter and receive an exclusive discount code.
          </p>
          <Link to="/register">
            <Button variant="secondary" size="lg">
              Sign Up Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home
