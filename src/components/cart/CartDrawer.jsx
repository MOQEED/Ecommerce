import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiX, FiShoppingBag } from 'react-icons/fi'
import { useCart } from '../../context/CartContext'
import { useAuth } from '../../context/AuthContext'
import { formatPrice } from '../../utils/helpers'
import Button from '../common/Button'

const CartDrawer = ({ isOpen, onClose }) => {
  const { items, subtotal, itemCount, removeItem } = useCart()
  const { isAuthenticated } = useAuth()
  const checkoutHref = isAuthenticated ? '/checkout' : '/login'

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <>
      <div 
        className={`drawer-backdrop ${isOpen ? 'active' : ''}`}
        onClick={onClose}
      />
      <div className={`drawer ${isOpen ? 'active' : ''}`}>
        <div className="drawer-header">
          <h2 className="drawer-title">Shopping Cart ({itemCount})</h2>
          <button className="modal-close" onClick={onClose}>
            <FiX size={20} />
          </button>
        </div>

        <div className="drawer-body">
          {items.length === 0 ? (
            <div className="empty-state">
              <FiShoppingBag className="empty-state-icon" />
              <h3 className="empty-state-title">Your cart is empty</h3>
              <p className="empty-state-text">Add some products to get started!</p>
              <Link to="/products" onClick={onClose}>
                <Button variant="primary">Browse Products</Button>
              </Link>
            </div>
          ) : (
            <div className="cart-drawer-items">
              {items.map(item => (
                <div key={item.id} className="cart-drawer-item">
                  <div className="cart-drawer-item-image">
                    <img src={item.image} alt={item.title} />
                  </div>
                  <div className="cart-drawer-item-details">
                    <h4>{item.title}</h4>
                    <p>{formatPrice(item.price)} × {item.quantity}</p>
                  </div>
                  <button 
                    className="cart-item-remove"
                    onClick={() => removeItem(item.id)}
                  >
                    <FiX size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="drawer-footer">
            <div className="cart-summary-row total" style={{ marginBottom: '1rem' }}>
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <Link to="/cart" onClick={onClose}>
              <Button variant="outline" style={{ width: '100%', marginBottom: '0.5rem' }}>
                View Cart
              </Button>
            </Link>
            <Link to={checkoutHref} onClick={onClose}>
              <Button variant="primary" style={{ width: '100%' }}>
                {isAuthenticated ? 'Checkout' : 'Login to Checkout'}
              </Button>
            </Link>
          </div>
        )}
      </div>

      <style>{`
        .cart-drawer-items {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .cart-drawer-item {
          display: flex;
          gap: 1rem;
          padding: 1rem;
          background: var(--color-gray-100);
          border-radius: var(--radius-md);
          position: relative;
        }
        .cart-drawer-item-image {
          width: 60px;
          height: 60px;
          flex-shrink: 0;
        }
        .cart-drawer-item-image img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
        .cart-drawer-item-details {
          flex: 1;
        }
        .cart-drawer-item-details h4 {
          font-size: 0.875rem;
          margin-bottom: 0.25rem;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .cart-drawer-item-details p {
          font-size: 0.875rem;
          color: var(--color-primary);
          font-weight: 600;
        }
        .cart-drawer-item .cart-item-remove {
          position: absolute;
          top: 0.5rem;
          right: 0.5rem;
        }
      `}</style>
    </>
  )
}

export default CartDrawer
