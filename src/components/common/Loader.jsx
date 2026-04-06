const Loader = ({ size = 'md', className = '' }) => {
  const sizeClass = size !== 'md' ? `loader-${size}` : ''
  
  return (
    <div className={`loader ${sizeClass} ${className}`} />
  )
}

export const LoaderContainer = ({ children, loading, size = 'lg' }) => {
  if (loading) {
    return (
      <div className="loader-container">
        <Loader size={size} />
      </div>
    )
  }
  return children
}

export default Loader
