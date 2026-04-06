import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { FiShoppingCart, FiHeart, FiStar, FiMinus, FiPlus, FiTruck, FiRefreshCw, FiShield } from 'react-icons/fi'
import { useProduct } from '../hooks/useProducts'
import { useCart } from '../context/CartContext'
import { LoaderContainer } from '../components/common/Loader'
import Button from '../components/common/Button'
import { formatPrice, capitalizeFirst } from '../utils/helpers'
import toast from 'react-hot-toast'

const ProductDetail = () => {
  const { id } = useParams()
  const { product, loading, error } = useProduct(id)
  const { addItem, getItemQuantity } = useCart()
  const [quantity, setQuantity] = useState(1)

  const cartQuantity = product ? getItemQuantity(product.id) : 0

  const handleAddToCart = () => {
    if (product) {
      addItem(product, quantity)
      toast.success(`Added ${quantity} item(s) to cart!`)
      setQuantity(1)
    }
  }

  if (error) {
    return (
      <div className="container" style={{ padding: '4rem 0' }}>
        <div className="empty-state">
          <div className="empty-state-icon">😕</div>
          <h3 className="empty-state-title">Product not found</h3>
          <p className="empty-state-text">{error}</p>
          <Link to="/products">
            <Button variant="primary">Back to Products</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="product-detail">
      <div className="container">
        <LoaderContainer loading={loading}>
          {product && (
            <div className="product-detail-grid">
              <div className="product-gallery">
                <div className="product-main-image">
                  <img src={product.image} alt={product.title} />
                </div>
              </div>

              <div className="product-info">
                <Link 
                  to={`/products?category=${encodeURIComponent(product.category)}`}
                  className="product-category"
                >
                  {capitalizeFirst(product.category)}
                </Link>
                
                <h1 className="product-title">{product.title}</h1>

                <div className="product-rating">
                  <div className="rating">
                    {[1, 2, 3, 4, 5].map(star => (
                      <FiStar
                        key={star}
                        className={`rating-star ${star <= Math.round(product.rating?.rate || 0) ? '' : 'empty'}`}
                        fill={star <= Math.round(product.rating?.rate || 0) ? '#f7c52d' : 'transparent'}
                      />
                    ))}
                  </div>
                  <span className="rating-count">
                    {product.rating?.rate} ({product.rating?.count} reviews)
                  </span>
                </div>

                <div className="product-price-wrapper">
                  <span className="product-price">{formatPrice(product.price)}</span>
                </div>

                <p className="product-description">{product.description}</p>

                <div className="product-actions">
                  <div className="quantity-selector">
                    <button
                      className="quantity-btn"
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      disabled={quantity <= 1}
                    >
                      <FiMinus size={14} />
                    </button>
                    <span className="quantity-value">{quantity}</span>
                    <button
                      className="quantity-btn"
                      onClick={() => setQuantity(q => q + 1)}
                    >
                      <FiPlus size={14} />
                    </button>
                  </div>

                  <Button 
                    variant="primary" 
                    size="lg" 
                    onClick={handleAddToCart}
                    icon={<FiShoppingCart />}
                  >
                    Add to Cart
                  </Button>
                </div>

                {cartQuantity > 0 && (
                  <p style={{ color: 'var(--color-success)', fontSize: '0.875rem', marginBottom: '1rem' }}>
                    ✓ You have {cartQuantity} of this item in your cart
                  </p>
                )}

                <div className="product-meta">
                  <div className="product-meta-item">
                    <span><FiTruck style={{ marginRight: '0.5rem' }} /> Free Shipping</span>
                    <span>On orders over $50</span>
                  </div>
                  <div className="product-meta-item">
                    <span><FiRefreshCw style={{ marginRight: '0.5rem' }} /> Easy Returns</span>
                    <span>30-day return policy</span>
                  </div>
                  <div className="product-meta-item">
                    <span><FiShield style={{ marginRight: '0.5rem' }} /> Secure Payment</span>
                    <span>100% secure checkout</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </LoaderContainer>
      </div>
    </div>
  )
}

export default ProductDetail
