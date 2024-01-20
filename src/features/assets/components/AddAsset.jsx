import { AdminLayout } from '../../../components/Layouts'
import { FileUpload, InputField, Radio, SelectField, TextArea } from '../../../components/Forms'
import { useForm } from 'react-hook-form'
import { addAsset } from '../api'
import { useNavigate } from 'react-router-dom'
import { useError } from '../../../hooks'
import { Error } from "../../../components/Misc"
import { yupResolver } from "@hookform/resolvers/yup"
import { assetValidation } from "../validations"
import { categories, statusRadios } from '../data'

export const AddAsset = () => {
  const { register, control, handleSubmit, setValue, formState: { errors }} = useForm({resolver: yupResolver(assetValidation)})
  const navigate = useNavigate()
  const [error, setError] = useError()
  const options = categories()

  const onSubmit = async (data) => {
    const formData = new FormData()
    for (const value in data) {
      value === "image"
        ? !data[value][0] || formData.append(value, data[value][0])
        : formData.append(value, data[value])
    }
    try {
      await addAsset(formData)
      navigate(-1)
      setError({})
    } catch (error) {
      setError({ status: true, message: error.response.data.message })
    }
  }

  return (
    <AdminLayout title="Add Asset">
    <form onSubmit={handleSubmit(onSubmit)}>
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
              setValue={setValue}
              label="Cover Image"
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
          className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
        >
          Add
        </button>
      </div>
    </form>
    </AdminLayout>
  )
}
