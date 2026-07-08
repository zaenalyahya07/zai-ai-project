import { forwardRef } from "react"

const Input = forwardRef(function Input(
  { label, type = "text", placeholder, error, ...props },
  ref
) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm text-gray-300 font-medium">
          {label}
        </label>
      )}
      <input
        ref={ref}
        type={type}
        placeholder={placeholder}
        className={`bg-gray-800 text-white px-3 py-2 rounded-lg border outline-none focus:ring-2 focus:ring-blue-600 ${
          error ? "border-red-500" : "border-gray-700"
        }`}
        {...props}
      />
      {error && (
        <span className="text-xs text-red-500">{error}</span>
      )}
    </div>
  )
})

export default Input