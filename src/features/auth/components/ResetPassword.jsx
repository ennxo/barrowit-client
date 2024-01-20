import { useForm } from "react-hook-form"
import { InputField } from "../../../components/Forms"
import { useNavigate } from "react-router-dom"
import { Error } from "../../../components/Misc"
import { yupResolver } from "@hookform/resolvers/yup"
import { resetValidation } from "../validations/reset"
import { useError } from "../../../hooks"
import { resetPassword } from "../api"
import { useEffect } from "react"
import { usePhoneStore } from "../stores/phone_number"

export const ResetPassword = () => {
  const navigate = useNavigate()
  const [error, setError] = useError()
  const { phoneNumber, setPhoneNumber } = usePhoneStore()
  const { register, handleSubmit, setValue, formState: { errors }} = useForm({ resolver: yupResolver(resetValidation)})
  
  const onSubmit = async (data) => {
    try {
        await resetPassword(data)
        setError({})
        navigate('/auth/login')
        setPhoneNumber('')
    } catch (error) {
        setError({status: true, message: error.request.data.message})
    }
  }

  //Setting "phone_number" field
 useEffect(() => {
    let hasMounted = true
    hasMounted && setValue('phone_number', phoneNumber)
    return () => hasMounted = false
  },[phoneNumber, setValue])

  return (
    <>
    <Error error={error.status} message={error.message}/>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <InputField
          name="password"
          label="New Password"
          type="password"
          errors={errors}
          register={register}
          placeholder="Enter your password"
        />
        
        <InputField
          name="confirm_password"
          label="Confirm Password"
          type="password"
          errors={errors}
          register={register}
          placeholder="Confirm password"
        />

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Reset Password
          </button>
        </div>
      </form>
    </>
  )
}
