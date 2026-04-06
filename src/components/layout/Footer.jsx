import { Link } from 'react-router-dom'
import { FiFacebook, FiTwitter, FiInstagram, FiYoutube } from 'react-icons/fi'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <h3>Anon.</h3>
            <p>
              Your one-stop shop for quality products at amazing prices. 
              We deliver excellence with every order.
            </p>
            <div className="footer-social">
              <a href="#" aria-label="Facebook"><FiFacebook /></a>
              <a href="#" aria-label="Twitter"><FiTwitter /></a>
              <a href="#" aria-label="Instagram"><FiInstagram /></a>
              <a href="#" aria-label="YouTube"><FiYoutube /></a>
            </div>
          </div>

          <div className="footer-col">
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/cart">Cart</Link></li>
              <li><Link to="/login">My Account</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h3>Categories</h3>
            <ul>
              <li><Link to="/products?category=electronics">Electronics</Link></li>
              <li><Link to="/products?category=jewelery">Jewelry</Link></li>
              <li><Link to="/products?category=men's clothing">Men's Clothing</Link></li>
              <li><Link to="/products?category=women's clothing">Women's Clothing</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h3>Contact</h3>
            <ul>
              <li>123 Commerce Street</li>
              <li>New York, NY 10001</li>
              <li>info@anon.com</li>
              <li>+1 (555) 123-4567</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Anon. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
