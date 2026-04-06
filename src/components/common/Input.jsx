import { forwardRef } from 'react'

const Input = forwardRef(({
  label,
  error,
  type = 'text',
  className = '',
  ...props
}, ref) => {
  const inputClass = `form-input ${error ? 'error' : ''} ${className}`

  return (
    <div className="form-group">
      {label && (
        <label className="form-label">
          {label}
          {props.required && <span className="required-mark"> *</span>}
        </label>
      )}
      <input
        ref={ref}
        type={type}
        className={inputClass}
        {...props}
      />
      {error && <span className="form-error">{error}</span>}
    </div>
  )
})

Input.displayName = 'Input'

export default Input
