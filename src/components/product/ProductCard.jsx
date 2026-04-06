import { Link } from 'react-router-dom'
import { FiShoppingCart, FiStar } from 'react-icons/fi'
import { useCart } from '../../context/CartContext'
import { formatPrice, truncateText } from '../../utils/helpers'
import toast from 'react-hot-toast'

const ProductCard = ({ product }) => {
  const { addItem, getItemQuantity } = useCart()
  const quantity = getItemQuantity(product.id)

  const handleAddToCart = () => {
    addItem(product)
    toast.success('Added to cart!')
  }

  return (
    <div className="card product-card">
      <div className="card-image">
        <Link to={`/products/${product.id}`} className="product-card-image-link">
          <img src={product.image} alt={product.title} loading="lazy" />
        </Link>
        <div className="product-card-actions">
          <button
            type="button"
            className="btn btn-icon btn-primary"
            onClick={handleAddToCart}
            title="Add to cart"
            aria-label="Add to cart"
          >
            <FiShoppingCart size={18} />
          </button>
        </div>
        {quantity > 0 && (
          <span className="badge badge-primary product-card-badge">
            {quantity} in cart
          </span>
        )}
      </div>
      <Link to={`/products/${product.id}`} className="product-card-body-link">
        <div className="card-body">
          <span className="product-card-category">{product.category}</span>
          <h3 className="card-title">{truncateText(product.title, 50)}</h3>
          <div className="product-card-rating">
            <FiStar className="rating-star" fill="#f7c52d" />
            <span>{product.rating?.rate || 4.5}</span>
            <span className="rating-count">({product.rating?.count || 0})</span>
          </div>
          <div className="card-price-wrapper">
            <span className="card-price">{formatPrice(product.price)}</span>
          </div>
        </div>
      </Link>
      <button
        type="button"
        className="product-card-add-btn"
        onClick={handleAddToCart}
      >
        <FiShoppingCart size={18} aria-hidden />
        Add to Cart
      </button>
    </div>
  )
}

export default ProductCard
