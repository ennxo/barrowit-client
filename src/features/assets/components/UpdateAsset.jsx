import { AdminLayout } from '../../../components/Layouts'
import { FileUpload, InputField, Radio, TextArea, SelectField } from '../../../components/Forms'
import { set, useForm } from 'react-hook-form'
import { updateAsset, getAsset } from '../api'
import { useNavigate, useParams } from 'react-router-dom'
import { useError, useFetch } from '../../../hooks'
import { Error } from "../../../components/Misc"
import { yupResolver } from "@hookform/resolvers/yup"
import { assetValidation } from "../validations"
import { useState } from 'react'
import { statusRadios, categories } from '../data'
import { useAxiosPrivate } from '../../../hooks'
import { getDirtyFields } from '../../../utils'

export const UpdateAsset = () => {
  const { id } = useParams()
  const [imageSource, setImageSource] = useState()
  const axios = useAxiosPrivate()
  const options = categories()
  const { register, control, handleSubmit, setValue, reset, formState: { errors, dirtyFields }} = useForm({
    resolver: yupResolver(assetValidation),
    defaultValues: async() => {
      const { data } = await axios.get(getAsset(id))
      setImageSource(data.image)
      return {
        name: data.name,
        description: data.description,
        status: data.status.toString(),
        useful_lifespan: data.useful_lifespan,
        category_id: data.category_id
      }
    }
  })

  const navigate = useNavigate()
  const [error, setError] = useError()
  
  const onUpdate = async (data) => {
    const formData = new FormData()
    const newData = getDirtyFields(dirtyFields, data)
    if(Object.keys(newData).length === 0) return;
    for (const value in newData) {
      value === "image"
        ? !data[value][0] || formData.append(value, data[value][0])
        : formData.append(value, data[value])
    }
    try {
      await updateAsset(id, formData)
      navigate(-1)
    } catch (error) {
      setError({ status: true, message: error.response.data.message })
    }
  }

  return (
    <AdminLayout title="Update Asset">
    <form onSubmit={handleSubmit(onUpdate)}>
      <div className="space-y-12 pt-5">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Asset</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            This information will be added to website's database so be precise.
          </p>
          <Error error={error.status} message={error.message}/>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
            <InputField
              name="name"
              label="Name"
              type="text"
              errors={errors}
              register={register}
              placeholder="Enter asset's name"
            />
            </div>
            <div className='sm:col-span-3'>
              <SelectField
              control={control}
              name="category_id"
              label="Category"
              errors={errors}
              options={options}
              placeholder={"Select asset's category"}
              />
            </div>

            <div className="col-span-full">
              <TextArea
              name="description"
              register={register}
              errors={errors}
              label="Description"
              notes="Write asset's information"
              />
            </div>

            <div className="col-span-full">
              <FileUpload
              name="image"
              register={register}
              errors={errors}
              label="Cover Image"
              imageSource={imageSource}
              />
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <Radio
                name="status"
                register={register}
                errors={errors}
                label="Status"
                notes="Tick asset's availability"
                radios={statusRadios}
              />
            </div>

            <div className="sm:col-span-3 pt-5">
            <InputField
              name="useful_lifespan"
              label="Useful Lifespan"
              type="number"
              errors={errors}
              register={register}
              placeholder="Enter the useful life"
            />
            </div>            
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" className="text-sm font-semibold leading-6 text-gray-900" onClick={() => navigate(-1)}>
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          Update
        </button>
      </div>
    </form>
    </AdminLayout>
  )
}
