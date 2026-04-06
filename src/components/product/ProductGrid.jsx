import ProductCard from './ProductCard'
import { LoaderContainer } from '../common/Loader'

const ProductGrid = ({ products, loading, error }) => {
  if (error) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">😕</div>
        <h3 className="empty-state-title">Something went wrong</h3>
        <p className="empty-state-text">{error}</p>
      </div>
    )
  }

  return (
    <LoaderContainer loading={loading}>
      {products.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🔍</div>
          <h3 className="empty-state-title">No products found</h3>
          <p className="empty-state-text">Try adjusting your filters or search terms.</p>
        </div>
      ) : (
        <div className="product-grid">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </LoaderContainer>
  )
}

export default ProductGrid
