import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import { ExclamationCircleIcon } from '@heroicons/react/24/solid'
import { cn } from "../../utils"
import { useState } from 'react'
export const InputField = ({name, label, type, errors, register, placeholder, ...rest}) => {
  const [toggle, setToggle] = useState(false)

  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative mt-1 rounded-md shadow-sm bg-black">
        <input
        {...register(name)}
        {...rest}
          type={toggle ? 'text' : type}
          id={name}
          placeholder={placeholder}
          className={cn('block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm disabled:bg-gray-200', {'border-red-600 pr-10 focus:border-red-500 focus:outline-none focus:ring-red-500': errors[name]?.message})}
        />
        {type === 'password' && (
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer" onClick={() => setToggle(!toggle)}>
        {toggle ? <EyeSlashIcon className="h-5 w-5 text-gray-500" /> : <EyeIcon className="h-5 w-5 text-gray-500" />}
         </div>
        )}
        {errors[name]?.message && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
        </div>
        )}
      </div>
      <p className="mt-2 text-xs text-red-600" id={`${name}-error`}>
        {errors[name] && `*${errors[name]?.message}`}
      </p>
    </div>
  )
}
