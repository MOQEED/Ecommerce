export const SORT_OPTIONS = [
  { value: 'default', label: 'Default' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name: A to Z' },
  { value: 'name-desc', label: 'Name: Z to A' },
  { value: 'rating', label: 'Highest Rated' }
]

export const PRODUCTS_PER_PAGE = 12

export const SHIPPING_COST = 5.99

export const FREE_SHIPPING_THRESHOLD = 50

export const TAX_RATE = 0.08

export const PAYMENT_METHODS = [
  { id: 'card', label: 'Credit/Debit Card', icon: 'card' },
  { id: 'paypal', label: 'PayPal', icon: 'paypal' },
  { id: 'cod', label: 'Cash on Delivery', icon: 'cash' }
]

/** Main navigation — matches Anon-style structure ([reference](https://codewithsadee.github.io/anon-ecommerce-website/)). */
export const NAV_LINKS = [
  { path: '/', label: 'Home' },
  { path: '/products', label: 'Products' },
  { path: '/cart', label: 'Cart' },
  { path: '/products?category=electronics', label: 'Electronics' },
  { path: '/products?category=jewelery', label: 'Jewelry' },
  { path: "/products?category=men's clothing", label: "Men's" },
  { path: "/products?category=women's clothing", label: "Women's" },
  { path: '/checkout', label: 'Checkout' }
]

export const CATEGORY_ICONS = {
  'electronics': '💻',
  'jewelery': '💍',
  "men's clothing": '👔',
  "women's clothing": '👗'
}
