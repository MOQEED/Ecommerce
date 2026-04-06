import { forwardRef } from 'react'
import Loader from './Loader'

const Button = forwardRef(({ 
  children, 
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  icon,
  iconPosition = 'left',
  className = '',
  ...props 
}, ref) => {
  const baseClass = 'btn'
  const variantClass = `btn-${variant}`
  const sizeClass = size !== 'md' ? `btn-${size}` : ''
  
  const classes = [baseClass, variantClass, sizeClass, className]
    .filter(Boolean)
    .join(' ')

  return (
    <button
      ref={ref}
      className={classes}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader size="sm" />
      ) : (
        <>
          {icon && iconPosition === 'left' && <span className="btn-icon-left">{icon}</span>}
          {children}
          {icon && iconPosition === 'right' && <span className="btn-icon-right">{icon}</span>}
        </>
      )}
    </button>
  )
})

Button.displayName = 'Button'

export default Button
