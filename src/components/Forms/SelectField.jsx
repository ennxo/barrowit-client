import { ExclamationCircleIcon } from "@heroicons/react/20/solid"
import { Controller } from "react-hook-form"
import React from "react"
import Select from "react-select"

export const SelectField = ({ control, name, label, errors, options, placeholder, ...rest }) => {
  const customStyles = {
    control: (provided) => ({
      ...provided,
      borderColor: errors[name]?.message ? '#e53e3e' : provided.borderColor
    })
  }

  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative mt-1 rounded-md shadow-sm bg-black text-sm">
        <Controller
          control={control}
          name={name}
          render={({ field }) => (
              <Select
                {...field}
                {...rest}
                options={options}
                onChange={({value}) => field.onChange(value)}
                onBlur={() => field.onBlur()}
                value={options.find((o) => o.value === field.value)}
                placeholder={placeholder}
                styles={customStyles}
              />
            )}
        />
        {errors[name]?.message && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <ExclamationCircleIcon
              className="h-5 w-5 text-red-500"
              aria-hidden="true"
            />
          </div>
        )}
      </div>
      <p className="mt-2 text-xs text-red-600" id={`${name}-error`}>
        {errors[name] && `*${errors[name]?.message}`}
      </p>
    </div>
  )
}