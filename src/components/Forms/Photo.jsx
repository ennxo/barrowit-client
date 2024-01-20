import { PhotoIcon } from '@heroicons/react/24/solid'
import { cn } from "../../utils"
import { useCallback, useState } from 'react'
import { getBase64 } from '../../utils'

export const Photo = ({ name, register, errors, label, setValue, isDisabled, imageSource}) => {
  const { onChange, ref } = register(name, { required: true })
  const [image, setImage] = useState()

  const onImageChange = useCallback(async (event) => {
    const imageFile = event.target.files?.[0]
    if(imageFile) {
      const base64 = await getBase64(imageFile)
      setImage(base64)
      onChange(event)
    }
  },[])

  const resetImage = () => {
    setValue(name, [])
    setImage(undefined)
  }
  
    return ( 
        <div>
          
            <label htmlFor={name} className="block text-sm font-medium leading-6 text-gray-900">
                {label}
              </label>
                  <div className="mt-4 flex items-center text-sm leading-6 text-gray-600 space-x-4">
                  {image ? 
                  <img src={image} className="border border-gray-300 h-24 w-24 object-contain"/> : imageSource ?
                  <img src={imageSource} className="border border-gray-300 h-24 w-24 object-contain"/> :
                  <div className="h-24 w-24">
                    <svg className="border border-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  }
                  {!isDisabled && (
                    <label
                      htmlFor={name}
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-green-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-green-600 focus-within:ring-offset-2 hover:text-green-500"
                    >
                      <span className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Change avatar</span>
                      <input id={name} name={name} type="file" ref={ref} onChange={onImageChange} className="sr-only m-0 p-0"/>
                    </label>
                  )}
                  {image && <button type="button" onClick={resetImage} class="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Clear</button>}
                </div>
              <p className="mt-2 text-xs text-red-600" id={`${name}-error`}>
                {errors[name] && `*${errors[name]?.message}`}
              </p>
        </div>
     )
}