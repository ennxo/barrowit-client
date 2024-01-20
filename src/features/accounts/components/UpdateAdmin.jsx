import { AdminLayout } from '../../../components/Layouts'
import { InputField, TextArea, FileUpload, Photo, SelectField } from '../../../components/Forms'
import { useForm } from 'react-hook-form'
import { updateAccount, getAccount } from '../api'
import { useNavigate, useParams } from 'react-router-dom'
import { useError } from '../../../hooks'
import { Error } from "../../../components/Misc"
import { yupResolver } from "@hookform/resolvers/yup"
import { adminUpdateValidation } from "../validations"
import { axiosPrivate } from '../../../libs'
import { useState } from 'react'
import { roles } from '../data'
import { getDirtyFields } from '../../../utils'

export const UpdateAdmin = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [error, setError] = useError()
  const [imageSource, setImageSource] = useState({ avatar: undefined, valid_id: undefined})
  const { register, control, handleSubmit, setValue, formState: { errors, dirtyFields }} = useForm({
    resolver: yupResolver(adminUpdateValidation),
    defaultValues: async () => {
        const { data } = await axiosPrivate.get(getAccount(id))
        setImageSource({ avatar: data.avatar })
        return {
            first_name: data.first_name,
            middle_name: data.middle_name,
            last_name: data.last_name,
            phone_number: data.User?.phone_number,
            email: data.User?.email,
            address: data.address,
            roles: data.User?.roles,
        }
    }
})
  const onSubmit = async (data) => {
    const formData = new FormData()
    const newData = getDirtyFields(dirtyFields, data)
    if(Object.keys(newData).length === 0) return;
    for (const value in newData) {
      ["avatar", "valid_id"].includes(value)
        ? !data[value][0] || formData.append(value, data[value][0])
        : formData.append(value, data[value])
    }
    try {
      await updateAccount(id, formData)
      navigate(-1)
      setError({})
    } catch (error) {
      setError({ status: true, message: error.response.data.message })
    }
  }

  return (
    <AdminLayout title="Update Account">
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-12 pt-5">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Account</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Personal information to access the website.
          </p>
          <Error error={error.status} message={error.message}/>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="col-span-6">
                <Photo
                name="avatar"
                register={register}
                errors={errors}
                setValue={setValue}
                label="Avatar"
                imageSource={imageSource.avatar}
                />
            </div>
            <div className="sm:col-span-6 lg:col-span-2">
            <InputField
              name="first_name"
              label="First Name"
              type="text"
              errors={errors}
              register={register}
              placeholder="First name"
            />
            </div>

            <div className="sm:col-span-6 lg:col-span-2">
            <InputField
              name="middle_name"
              label="Middle Name"
              type="text"
              errors={errors}
              register={register}
              placeholder="Middle name"
            />
            </div>

            <div className="sm:col-span-6 lg:col-span-2">
            <InputField
              name="last_name"
              label="Last Name"
              type="text"
              errors={errors}
              register={register}
              placeholder="Last name"
            />
            </div>

            <div className="sm:col-span-6 lg:col-span-2">
            <InputField
              name="phone_number"
              label="Phone Number"
              type="number"
              errors={errors}
              register={register}
              placeholder="+63"
            />
            </div>

            <div className="sm:col-span-6 lg:col-span-2">
            <InputField
              name="email"
              label="Email Address"
              type="email"
              errors={errors}
              register={register}
              placeholder="Email Address"
            />
            </div>

            <div className='sm:col-span-6 lg:col-span-2'>
            <SelectField
              control={control}
              name="roles"
              label="Role"
              errors={errors}
              options={roles}
              placeholder={"Select a role"}
              />
            </div>

            <div className="col-span-full">
              <TextArea
              name="address"
              register={register}
              errors={errors}
              label="Complete Address"
              notes="Write a complete address"
              rows={3}
              />
            </div>

            <div className="sm:col-span-3">
            <InputField
              name="password"
              label="New Password"
              type="password"
              errors={errors}
              register={register}
              placeholder="Enter a password"
            />
            </div>

            <div className="sm:col-span-3">
            <InputField
              name="confirm_password"
              label="New Confirm Password"
              type="password"
              errors={errors}
              register={register}
              placeholder="Confirm password"
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
          Update Account
        </button>
      </div>
    </form>
    </AdminLayout>
  )
}
