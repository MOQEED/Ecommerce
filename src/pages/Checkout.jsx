import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import Input from '../components/common/Input'
import Button from '../components/common/Button'
import { formatPrice, generateOrderNumber, validateEmail, validatePhone } from '../utils/helpers'
import { SHIPPING_COST, FREE_SHIPPING_THRESHOLD, TAX_RATE, PAYMENT_METHODS } from '../utils/constants'
import toast from 'react-hot-toast'

const Checkout = () => {
  const { items, subtotal, clearCart } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('card')

  const [formData, setFormData] = useState({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: ''
  })

  const [errors, setErrors] = useState({})

  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST
  const tax = subtotal * TAX_RATE
  const total = subtotal + shipping + tax

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validate = () => {
    const newErrors = {}

    if (!formData.firstName) newErrors.firstName = 'First name is required'
    if (!formData.lastName) newErrors.lastName = 'Last name is required'
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email'
    }
    if (!formData.phone) {
      newErrors.phone = 'Phone is required'
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Invalid phone number'
    }
    if (!formData.address) newErrors.address = 'Address is required'
    if (!formData.city) newErrors.city = 'City is required'
    if (!formData.state) newErrors.state = 'State is required'
    if (!formData.zipCode) newErrors.zipCode = 'ZIP code is required'

    if (paymentMethod === 'card') {
      if (!formData.cardNumber) newErrors.cardNumber = 'Card number is required'
      if (!formData.cardExpiry) newErrors.cardExpiry = 'Expiry date is required'
      if (!formData.cardCvc) newErrors.cardCvc = 'CVC is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validate()) {
      toast.error('Please fill in all required fields')
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      const orderNumber = generateOrderNumber()
      
      // Store order in localStorage for confirmation page
      localStorage.setItem('lastOrder', JSON.stringify({
        orderNumber,
        items,
        subtotal,
        shipping,
        tax,
        total,
        shippingAddress: {
          name: `${formData.firstName} ${formData.lastName}`,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country
        },
        email: formData.email,
        createdAt: new Date().toISOString()
      }))

      clearCart()
      navigate('/order-confirmation')
      toast.success('Order placed successfully!')
      setIsLoading(false)
    }, 2000)
  }

  if (items.length === 0) {
    navigate('/cart')
    return null
  }

  return (
    <div className="checkout-page">
      <div className="container">
        <h1 className="checkout-page-title">Checkout</h1>

        <div className="checkout-layout">
          <form className="checkout-form" onSubmit={handleSubmit}>
            {/* Contact Information */}
            <div className="checkout-section">
              <h2 className="checkout-section-title">Contact Information</h2>
              <div className="checkout-form-grid">
                <Input
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  error={errors.firstName}
                  required
                />
                <Input
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  error={errors.lastName}
                  required
                />
                <Input
                  label="Email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                  required
                />
                <Input
                  label="Phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  error={errors.phone}
                  required
                />
              </div>
            </div>

            {/* Shipping Address */}
            <div className="checkout-section">
              <h2 className="checkout-section-title">Shipping Address</h2>
              <div className="checkout-form-grid">
                <div className="form-group full-width">
                  <Input
                    label="Address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    error={errors.address}
                    required
                  />
                </div>
                <Input
                  label="City"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  error={errors.city}
                  required
                />
                <Input
                  label="State"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  error={errors.state}
                  required
                />
                <Input
                  label="ZIP Code"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  error={errors.zipCode}
                  required
                />
                <Input
                  label="Country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  disabled
                />
              </div>
            </div>

            {/* Payment Method */}
            <div className="checkout-section">
              <h2 className="checkout-section-title">Payment Method</h2>
              <div className="payment-methods" style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                {PAYMENT_METHODS.map(method => (
                  <label 
                    key={method.id}
                    className={`filter-option ${paymentMethod === method.id ? 'selected' : ''}`}
                    style={{ 
                      padding: '1rem', 
                      border: `2px solid ${paymentMethod === method.id ? 'var(--color-primary)' : 'var(--color-gray-300)'}`,
                      borderRadius: 'var(--radius-md)',
                      cursor: 'pointer',
                      flex: 1,
                      textAlign: 'center'
                    }}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method.id}
                      checked={paymentMethod === method.id}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      style={{ display: 'none' }}
                    />
                    <span>{method.label}</span>
                  </label>
                ))}
              </div>

              {paymentMethod === 'card' && (
                <div className="checkout-form-grid">
                  <div className="form-group full-width">
                    <Input
                      label="Card Number"
                      name="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      error={errors.cardNumber}
                      required
                    />
                  </div>
                  <Input
                    label="Expiry Date"
                    name="cardExpiry"
                    placeholder="MM/YY"
                    value={formData.cardExpiry}
                    onChange={handleChange}
                    error={errors.cardExpiry}
                    required
                  />
                  <Input
                    label="CVC"
                    name="cardCvc"
                    placeholder="123"
                    value={formData.cardCvc}
                    onChange={handleChange}
                    error={errors.cardCvc}
                    required
                  />
                </div>
              )}
            </div>

            <Button 
              type="submit" 
              variant="primary" 
              size="lg"
              isLoading={isLoading}
              style={{ width: '100%' }}
            >
              Place Order ({formatPrice(total)})
            </Button>
          </form>

          {/* Order Summary */}
          <div className="order-summary">
            <h3 className="order-summary-title">Order Summary</h3>
            
            <div className="order-items">
              {items.map(item => (
                <div key={item.id} className="order-item">
                  <div className="order-item-image">
                    <img src={item.image} alt={item.title} />
                  </div>
                  <div className="order-item-details">
                    <h4 className="order-item-title">{item.title}</h4>
                    <p className="order-item-meta">Qty: {item.quantity}</p>
                  </div>
                  <span className="order-item-price">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="cart-summary-row">
              <span>Subtotal</span>
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
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
