export const CheckBox = ({name, label, ...rest}) => {
  return (
    <div className="flex items-center">
      <input
        {...rest}
        id={name}
        name={name}
        type="checkbox"
        className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
      />
      <label htmlFor={name} className="ml-2 block text-sm text-gray-600">
        {label}
      </label>
    </div>
  )
}
