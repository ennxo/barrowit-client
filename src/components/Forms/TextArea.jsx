import { cn } from "../../utils"

export const TextArea = ({ name, register, errors, label ,notes, rows, placeHolder, ...rest }) => {
    return ( 
        <div>
        <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                {label}
              </label>
              <div className="mt-2">
                <textarea
                {...register(name)}
                {...rest}
                  id={name}
                  rows={rows}
                  placeholder={placeHolder}
                  className={cn('block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm', {'border-red-300 text-red-900 focus:border-red-500 focus:outline-none focus:ring-red-500': errors[name]?.message})}
                />
              </div>
              <p className="mt-2 text-xs text-red-600" id={`${name}-error`}>
              {errors[name] && `*${errors[name]?.message}`}
              </p>
        <p className="mt-3 text-sm leading-6 text-gray-600">{notes}</p>
        </div>
     )
}
