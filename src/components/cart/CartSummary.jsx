import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { useAuth } from '../../context/AuthContext'
import { formatPrice } from '../../utils/helpers'
import { SHIPPING_COST, FREE_SHIPPING_THRESHOLD, TAX_RATE } from '../../utils/constants'
import Button from '../common/Button'

const CartSummary = ({ showCheckoutButton = true }) => {
  const { items, subtotal, itemCount } = useCart()
  const { isAuthenticated } = useAuth()
  
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST
  const tax = subtotal * TAX_RATE
  const total = subtotal + shipping + tax

  if (items.length === 0) return null

  return (
    <div className="cart-summary">
      <h3 className="cart-summary-title">Order Summary</h3>
      
      <div className="cart-summary-row">
        <span>Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'})</span>
        <span>{formatPrice(subtotal)}</span>
      </div>
      
      <div className="cart-summary-row">
        <span>Shipping</span>
        <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
      </div>
      
      <div className="cart-summary-row">
        <span>Tax</span>
        <span>{formatPrice(tax)}</span>
      </div>
      
      <div className="cart-summary-row total">
        <span>Total</span>
        <span>{formatPrice(total)}</span>
      </div>

      {shipping > 0 && (
        <p style={{ fontSize: '0.75rem', color: 'var(--color-gray-600)', marginTop: '0.5rem' }}>
          Add {formatPrice(FREE_SHIPPING_THRESHOLD - subtotal)} more for free shipping!
        </p>
      )}

      {showCheckoutButton && (
        <Link to={isAuthenticated ? '/checkout' : '/login'}>
          <Button variant="primary" className="btn-lg">
            {isAuthenticated ? 'Proceed to Checkout' : 'Login to Checkout'}
          </Button>
        </Link>
      )}
    </div>
  )
}

export default CartSummary
