import { useForm } from "react-hook-form"
import { InputField, TextArea, FileUpload, SelectField } from "../../../components/Forms"
import { createAccount } from "../api"
import { yupResolver } from "@hookform/resolvers/yup"
import { registerValidation } from "../validations"
import { useError } from "../../../hooks"
import { Error } from "../../../components/Misc"
import { types } from "../../accounts"
import { useEffect } from "react"
import { usePhoneStore } from "../stores/phone_number"
import { useNavigate } from "react-router-dom"

export const RegisterForm = () => {
  const navigate = useNavigate()
  const { phoneNumber } = usePhoneStore()
  const [error, setError] = useError()
  const {register, handleSubmit, setValue, control, formState: { errors }} = useForm({ resolver: yupResolver(registerValidation)})
  
  const onSubmit = async (data) => {
    const formData = new FormData()
    for (const value in data) {
      value === "valid_id"
        ? !data[value][0] || formData.append(value, data[value][0])
        : formData.append(value, data[value])
    }
    try {
      await createAccount(formData)
      navigate('/auth/login')
      setError({})
    } catch (error) {
      setError({ status: true, message: error.response.data.message })
    }
  }

  useEffect(() => {
    let hasMounted = true
    hasMounted && setValue('phone_number', phoneNumber)
    return () => hasMounted = false
  },[phoneNumber, setValue])

    return (
      <>
        <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6 min-h-screen">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Create an Account</h3>
            <p className="mt-1 text-sm text-gray-500">Have an access to the barangay website</p>
          </div>
          <div className="mt-5 md:col-span-2 md:mt-0">
            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-6 gap-6">
            <div className="col-span-6">
            <Error error={error.status} message={error.message}/>
            </div>

            <div className="col-span-6">
            <InputField
                    name="email"
                    label="Email"
                    type="text"
                    errors={errors}
                    register={register}
                    placeholder="Enter your email"
                    />
              </div>
              
            <div className="col-span-6 sm:col-span-6 lg:col-span-2">
            <InputField
                    name="first_name"
                    label="First Name"
                    type="text"
                    errors={errors}
                    register={register}
                    placeholder="Enter your first name"
                    />
              </div>

              <div className="col-span-6 sm:col-span-3 lg:col-span-2">
              <InputField
                    name="middle_name"
                    label="Middle Name (Optional)"
                    type="text"
                    errors={errors}
                    register={register}
                    placeholder="Enter your middle name"
                    />
              </div>

              <div className="col-span-6 sm:col-span-3 lg:col-span-2">
              <InputField
                    name="last_name"
                    label="Last Name"
                    type="text"
                    errors={errors}
                    register={register}
                    placeholder="Enter your last name"
                    />
              </div>
            <div className="col-span-6 lg:col-span-3">
            <SelectField
              control={control}
              name="id_type"
              label="Valid ID Type"
              errors={errors}
              options={types}
              placeholder={"Select Valid ID"}
              />
            </div>

              <div className="col-span-6">
                <FileUpload
                name="valid_id"
                register={register}
                setValue={setValue}
                errors={errors}
                label="Valid ID"
                />
              </div>
        
              <div className="col-span-6">
              <TextArea
                    name="address"
                    label="Address"
                    type="text"
                    errors={errors}
                    register={register}
                    placeHolder="House no., Street, Barangay, Town/City, Province"
                    notes="Write a complete address. Ex. Blk 01 Lot 2, 123 Street, Barangay 171, Bagumbong, Caloocan City"
                    rows={3}
                    />
              </div>

              <div className="col-span-6 lg:col-span-3">
              <InputField
                    name="password"
                    label="Password"
                    type="password"
                    errors={errors}
                    register={register}
                    placeholder="Enter your password"
                    />
              </div>

              <div className="col-span-6 lg:col-span-3">
              <InputField
                    name="confirm_password"
                    label="Confirm Password"
                    type="password"
                    errors={errors}
                    register={register}
                    placeholder="Enter your confirm password"
                    />
              </div>
              
              <div className="col-span-6 lg:col-span-3"></div>
              <div className="col-span-6 lg:col-span-3">
                <button type="submit" className="flex w-full justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"> 
                    Sign Up
                </button>
               </div>
            </form>
          </div>
        </div>
      </div>
      </>
    )
  }
  