import { Link } from 'react-router-dom'
import { FiShoppingBag } from 'react-icons/fi'
import { useCart } from '../context/CartContext'
import CartItem from '../components/cart/CartItem'
import CartSummary from '../components/cart/CartSummary'
import Button from '../components/common/Button'

const Cart = () => {
  const { items, clearCart } = useCart()

  if (items.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <div className="empty-state">
            <FiShoppingBag className="empty-state-icon" />
            <h3 className="empty-state-title">Your cart is empty</h3>
            <p className="empty-state-text">
              Looks like you haven't added any products yet.
            </p>
            <Link to="/products">
              <Button variant="primary">Start Shopping</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="cart-page">
      <div className="container">
        <div className="cart-page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h1 className="cart-page-title" style={{ margin: 0 }}>Shopping Cart</h1>
          <Button variant="ghost" onClick={clearCart}>
            Clear Cart
          </Button>
        </div>

        <div className="cart-layout">
          <div className="cart-items">
            {items.map(item => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          <CartSummary />
        </div>
      </div>
    </div>
  )
}

export default Cart
