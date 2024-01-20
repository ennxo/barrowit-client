export const Radio = ({ name, register, errors, label, notes, radios }) => {
    return (
      <div>
        <label className="text-base font-medium text-gray-900">{label}</label>
        <p className="text-sm leading-5 text-gray-500">{notes}</p>
        <fieldset className="mt-4">
          <legend className="sr-only">Radio Items</legend>
          <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
            {radios.map((radio) => (
              <div key={radio.id} className="flex items-center">
                <input
                  {...register(name)}
                  id={radio.field}
                  name={radio.name}
                  type="radio"
                  value={radio.value}
                  className="h-4 w-4 border-gray-300 text-green-600 focus:ring-green-500"
                />
                <label htmlFor={radio.field} className="ml-3 block text-sm font-medium text-gray-700">
                  {radio.title}
                </label>
              </div>
            ))}
          </div>
        </fieldset>
        <p className="mt-2 text-xs text-red-600" id={`${name}-error`}>
        {errors[name] && `*${errors[name]?.message}`}
        </p>
      </div>
    )
  }
  