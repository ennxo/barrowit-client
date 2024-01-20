import { PhotoIcon } from '@heroicons/react/24/solid'
import { cn } from "../../utils"
import { useCallback, useState } from 'react'
import { getBase64 } from '../../utils'
import { Link } from 'react-router-dom'
import { ImageModal } from '../Modal'

export const FileUpload = ({ name, register, errors, label, setValue, isDisabled, imageSource}) => {
  const { onChange, ref } = register(name, { required: true })
  const [image, setImage] = useState()
  const [showImage, setShowImage] = useState(false)

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
              <div className={cn("mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10",{"border-red-600" : errors[name]?.message})}>
                <div className="text-center">
                  <Link className="hover:opacity-60" onClick={() => setShowImage(prev => !prev)}>
                  {image ? 
                  <img src={image} className="w-48"/> : imageSource ?
                  <img src={imageSource} className="w-48"/> :
                  <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                  }
                  </Link>
                  {!isDisabled && (
                  <>
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor={name}
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-green-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-green-600 focus-within:ring-offset-2 hover:text-green-500"
                    >
                      <span className={cn({"text-red-900" : errors[name]?.message})}>Upload a file</span>
                      <input id={name} name={name} type="file" ref={ref} onChange={onImageChange} className="sr-only"/>
                    </label>
                    <p className={cn("pl-1", {"text-red-600" : errors[name]?.message})}>or drag and drop</p>
                  </div>
                  <p className={cn("text-xs leading-5 text-gray-600", {"text-red-600" : errors[name]?.message})}>PNG, JPG, GIF up to 10MB</p>
                  </>
                  )}
                  {image && <label className="underline font-medium text-gray-700 text-sm" onClick={resetImage}>Clear</label>}
                </div>
              </div>
              <p className="mt-2 text-xs text-red-600" id={`${name}-error`}>
                {errors[name] && `*${errors[name]?.message}`}
              </p>
              <ImageModal open={showImage} setOpen={setShowImage} imageSrc={image ? image : imageSource}/>
        </div>
     )
}