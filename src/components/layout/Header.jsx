import { useState } from 'react'
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { FiSearch, FiUser, FiShoppingCart, FiLogOut } from 'react-icons/fi'
import { useAuth } from '../../context/AuthContext'
import { useCart } from '../../context/CartContext'
import { NAV_LINKS } from '../../utils/constants'
import { isNavLinkActive } from '../../utils/nav'
import CartDrawer from '../cart/CartDrawer'

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth()
  const { itemCount } = useCart()
  const navigate = useNavigate()
  const location = useLocation()
  const [searchQuery, setSearchQuery] = useState('')
  const [isCartOpen, setIsCartOpen] = useState(false)

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery('')
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="header">
      <div className="header-top">
        <div className="container">
          <span>Free shipping on orders over $50!</span>
          <div className="header-top-links">
            {isAuthenticated ? (
              <span className="header-welcome">Welcome, {user.name}!</span>
            ) : (
              <>
                <Link to="/login">Sign In</Link>
                <span className="header-top-sep" aria-hidden>·</span>
                <Link to="/register">Register</Link>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="header-main">
        <div className="container">
          <Link to="/" className="header-logo">
            Anon<span>.</span>
          </Link>

          <form className="header-search" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit">
              <FiSearch size={18} />
            </button>
          </form>

          <div className="header-actions">
            {isAuthenticated ? (
              <button type="button" className="header-action-btn" onClick={handleLogout}>
                <FiLogOut className="icon" />
                <span>Logout</span>
              </button>
            ) : (
              <Link to="/login" className="header-action-btn">
                <FiUser className="icon" />
                <span>Login</span>
              </Link>
            )}

            <button
              type="button"
              className="header-action-btn"
              onClick={() => setIsCartOpen(true)}
              aria-label="Open shopping cart preview"
            >
              <FiShoppingCart className="icon" />
              <span>Cart</span>
              {itemCount > 0 && (
                <span className="badge badge-primary">{itemCount}</span>
              )}
            </button>
          </div>
        </div>
      </div>

      <nav className="header-nav" aria-label="Main">
        <div className="container">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={`${link.path}-${link.label}`}
              to={link.path}
              className={() =>
                isNavLinkActive(link.path, location) ? 'active' : ''
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </nav>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  )
}

export default Header
