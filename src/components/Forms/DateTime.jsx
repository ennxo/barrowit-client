import { CalendarDaysIcon } from "@heroicons/react/20/solid"
import { ExclamationCircleIcon } from "@heroicons/react/20/solid"
import { Controller } from "react-hook-form"
import { cn } from "../../utils"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

export const DateTime = ({ control, name, label, errors, placeholder, ...rest }) => {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative mt-1 rounded-md shadow-sm bg-black">
        <Controller
          control={control}
          name={name}
          render={({ field }) => (
            <DatePicker
              selected={field.value}
              onChange={(date) => field.onChange(date)}
              startDate={new Date()}
              minDate={new Date()}
              maxDate={new Date().setMonth(new Date().getMonth() + 1)}
              minTime={new Date().setHours(1, 0, 0)}
              maxTime={new Date().setHours(18, 0, 0)}
              showIcon
              icon={<CalendarDaysIcon className={cn("text-gray-900", {"text-red-900": errors[name]?.message})} />}
              showTimeSelect
              timeFormat="hh:mm aa"
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="MMMM d, yyyy h:mm aa"
              wrapperClassName="w-full"
              className={cn(
                "block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm",
                {
                  "border-red-300 pr-10 text-red-900 placeholder-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500":
                    errors[name]?.message,
                }
              )}
              placeholderText={placeholder}
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
