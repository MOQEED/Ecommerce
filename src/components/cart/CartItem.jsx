import { FiTrash2, FiMinus, FiPlus } from 'react-icons/fi'
import { useCart } from '../../context/CartContext'
import { formatPrice } from '../../utils/helpers'

const CartItem = ({ item }) => {
  const { updateQuantity, removeItem } = useCart()

  const handleDecrement = () => {
    updateQuantity(item.id, item.quantity - 1)
  }

  const handleIncrement = () => {
    updateQuantity(item.id, item.quantity + 1)
  }

  return (
    <div className="cart-item">
      <div className="cart-item-image">
        <img src={item.image} alt={item.title} />
      </div>
      <div className="cart-item-details">
        <h3 className="cart-item-title">{item.title}</h3>
        <p className="cart-item-price">{formatPrice(item.price)}</p>
      </div>
      <div className="cart-item-actions">
        <button 
          className="cart-item-remove"
          onClick={() => removeItem(item.id)}
          aria-label="Remove item"
        >
          <FiTrash2 size={18} />
        </button>
        <div className="quantity-selector">
          <button
            className="quantity-btn"
            onClick={handleDecrement}
            disabled={item.quantity <= 1}
          >
            <FiMinus size={14} />
          </button>
          <span className="quantity-value">{item.quantity}</span>
          <button
            className="quantity-btn"
            onClick={handleIncrement}
          >
            <FiPlus size={14} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default CartItem
