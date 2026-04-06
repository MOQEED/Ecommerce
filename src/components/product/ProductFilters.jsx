import { useCategories } from '../../hooks/useProducts'
import { capitalizeFirst } from '../../utils/helpers'
import { SORT_OPTIONS } from '../../utils/constants'

const ProductFilters = ({ 
  selectedCategory, 
  onCategoryChange,
  priceRange,
  onPriceChange,
  sortBy,
  onSortChange
}) => {
  const { categories, loading } = useCategories()

  return (
    <aside className="filters">
      <div className="filter-group">
        <h3 className="filter-title">Categories</h3>
        <div className="filter-options">
          <label className="filter-option">
            <input
              type="radio"
              name="category"
              checked={!selectedCategory}
              onChange={() => onCategoryChange('')}
            />
            <span>All Categories</span>
          </label>
          {!loading && categories.map(category => (
            <label key={category} className="filter-option">
              <input
                type="radio"
                name="category"
                checked={selectedCategory === category}
                onChange={() => onCategoryChange(category)}
              />
              <span>{capitalizeFirst(category)}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <h3 className="filter-title">Price Range</h3>
        <div className="price-range">
          <input
            type="number"
            placeholder="Min"
            value={priceRange.min}
            onChange={(e) => onPriceChange({ ...priceRange, min: e.target.value })}
          />
          <span>-</span>
          <input
            type="number"
            placeholder="Max"
            value={priceRange.max}
            onChange={(e) => onPriceChange({ ...priceRange, max: e.target.value })}
          />
        </div>
      </div>

      <div className="filter-group">
        <h3 className="filter-title">Sort By</h3>
        <select 
          value={sortBy} 
          onChange={(e) => onSortChange(e.target.value)}
          className="form-input"
        >
          {SORT_OPTIONS.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </aside>
  )
}

export default ProductFilters
