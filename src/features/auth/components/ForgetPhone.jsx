import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { InputField } from "../../../components/Forms"
import { forgetOTP } from "../api"
import { Error } from "../../../components/Misc"
import { usePhoneStore } from "../stores/phone_number"
import { yupResolver } from "@hookform/resolvers/yup"
import { phoneValidation } from "../validations"
import { useError } from "../../../hooks"

export const ForgetPhone = () => {
  const { setPhoneNumber } = usePhoneStore()
  const navigate = useNavigate()
  const [error, setError] = useError()
  const { register, handleSubmit, formState: { errors }} = useForm({ resolver: yupResolver(phoneValidation)})

  const onSubmit = async (data) => {
    try {
      await forgetOTP(data)
      setError({})
      setPhoneNumber(data.phone_number)
      navigate('/auth/login/verify')
    } catch (error) {
      setError({ status: true, message: error.response.data.message })
    }
  }

  return (
    <>
    <Error error={error.status} message={error.message}/>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <InputField
          name="phone_number"
          label="Phone Number"
          type="number"
          errors={errors}
          register={register}
          placeholder="+63"
        />
        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Get Code
          </button>
        </div>
      </form>
    </>
  )
}
