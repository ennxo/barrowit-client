import { AdminLayout } from '../../../components/Layouts'
import { InputField, DateField } from '../../../components/Forms'
import { useForm } from 'react-hook-form'
import { addItem } from '../api'
import { useNavigate, useParams } from 'react-router-dom'
import { useError } from '../../../hooks'
import { Error } from "../../../components/Misc"
import { yupResolver } from "@hookform/resolvers/yup"
import { itemValidation } from "../validations"

export const AddItem = () => {
  const { id } = useParams()
  const { register, control, handleSubmit, formState: { errors }} = useForm({resolver: yupResolver(itemValidation)})
  const navigate = useNavigate()
  const [error, setError] = useError()

  const onSubmit = async (data) => {
    try {
      await addItem(id, data)
      setError({})
      navigate(-1)
    } catch (error) {
      setError({ status: true, message: error.response.data.message })
    }
  }

  return (
    <AdminLayout title="Add Item">
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-12 pt-5">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Item</h2>
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
              placeholder="Enter item's name"
            />
            </div>

            <div className="sm:col-span-3">    
                <InputField
                name="quantity"
                label="Quantity"
                type="number"
                errors={errors}
                register={register}
                placeholder="Enter a quantity"
                />
            </div>  

            <div className="sm:col-span-3">    
                <InputField
                name="cost"
                label="Cost"
                type="number"
                errors={errors}
                register={register}
                placeholder="Cost"
                />
            </div>    

            <div className="sm:col-span-3">    
            <InputField
              name="brand"
              label="Brand"
              type="text"
              errors={errors}
              register={register}
              placeholder="Enter item's brand"
            />
            </div>

            <div className="sm:col-span-3">    
            <InputField
              name="model"
              label="Model"
              type="text"
              errors={errors}
              register={register}
              placeholder="Enter item's model"
            />
            </div>

            <div className="sm:col-span-3">    
            <DateField 
                control={control}
                name="date_of_purchase"
                label="Date of purchase"
                errors={errors}
                placeholder={"Select date of purchase"}
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