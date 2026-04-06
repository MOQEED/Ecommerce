import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiCheck } from 'react-icons/fi'
import Button from '../components/common/Button'
import { formatPrice, formatDate } from '../utils/helpers'

const OrderConfirmation = () => {
  const [order, setOrder] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const lastOrder = localStorage.getItem('lastOrder')
    if (lastOrder) {
      setOrder(JSON.parse(lastOrder))
    } else {
      navigate('/')
    }
  }, [navigate])

  if (!order) return null

  return (
    <div className="order-confirmation">
      <div className="container">
        <div className="order-confirmation-icon">
          <FiCheck />
        </div>

        <h1 className="order-confirmation-title">Thank You for Your Order!</h1>
        <p className="order-confirmation-text">
          Your order has been placed successfully. We've sent a confirmation email to {order.email}.
        </p>

        <div className="order-details">
          <h2 className="order-details-title">Order Details</h2>
          
          <div className="order-details-row">
            <span>Order Number</span>
            <span>{order.orderNumber}</span>
          </div>
          <div className="order-details-row">
            <span>Date</span>
            <span>{formatDate(order.createdAt)}</span>
          </div>
          <div className="order-details-row">
            <span>Shipping To</span>
            <span>
              {order.shippingAddress.name}<br />
              {order.shippingAddress.address}<br />
              {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
            </span>
          </div>

          <div style={{ borderTop: '1px solid var(--color-gray-300)', margin: '1rem 0', paddingTop: '1rem' }}>
            <h3 style={{ marginBottom: '1rem', fontSize: '1rem' }}>Items Ordered</h3>
            {order.items.map(item => (
              <div key={item.id} className="order-details-row">
                <span>{item.title} × {item.quantity}</span>
                <span>{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>

          <div className="order-details-row">
            <span>Subtotal</span>
            <span>{formatPrice(order.subtotal)}</span>
          </div>
          <div className="order-details-row">
            <span>Shipping</span>
            <span>{order.shipping === 0 ? 'Free' : formatPrice(order.shipping)}</span>
          </div>
          <div className="order-details-row">
            <span>Tax</span>
            <span>{formatPrice(order.tax)}</span>
          </div>
          <div className="order-details-row" style={{ fontWeight: 700, fontSize: '1.125rem' }}>
            <span>Total</span>
            <span>{formatPrice(order.total)}</span>
          </div>
        </div>

        <Link to="/products">
          <Button variant="primary" size="lg">
            Continue Shopping
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default OrderConfirmation
