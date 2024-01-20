import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { InputField } from "../../../components/Forms"
import { verifyOTP } from "../../../api/otp"
import { useEffect, useState } from "react"
import { Error } from "../../../components/Misc"
import { usePhoneStore } from "../stores/phone_number"
import { yupResolver } from "@hookform/resolvers/yup"
import { otpValidation } from "../validations"
import { useError } from "../../../hooks"
import { forgetOTP } from "../api"
import { cn } from "../../../utils"

export const ForgetVerify = () => {
  const { phoneNumber } = usePhoneStore()
  const navigate = useNavigate()
  const [error, setError] = useError()
  const {register,handleSubmit,setValue,formState: { errors },} = useForm({ resolver: yupResolver(otpValidation)})
  const [counter, setCounter] = useState(60)
  const [isRunning, setIsRunning] = useState(false)

  const onSubmit = async (data) => {
    try {
      await verifyOTP(data)
      setError({})
      navigate("/auth/login/reset")
    } catch (error) {
      setError({ status: true, message: error.response.data.message })
    }
  }

  const getCode = async () => {
    try {
      setIsRunning(prev => !prev)
      setCounter(60)
      await forgetOTP({phone_number: phoneNumber})
    } catch (error) {
      setError({ status: true, message: error.response.data.message })
    }
  }

  useEffect(() => {
    let hasMounted = true
    hasMounted && setValue("phone_number", phoneNumber)
    return () => (hasMounted = false)
  }, [phoneNumber, setValue])

  useEffect(() => {
    let id
      if (isRunning) {
        id = setInterval(() => {
          setCounter((prev) => prev - 1)}, 1000)
      } else {
        clearInterval(id)
      }
    return () => clearInterval(id)
  }, [isRunning])

  useEffect(() => {
    if(counter < 0 && isRunning) {
      setIsRunning(prev => !prev)
      setCounter(0)
    }
  }, [counter, isRunning])

  return (
    <>
      <Error error={error.status} message={error.message} />
      <h2 className="mt-6 text-xl font-bold tracking-tight text-gray-900">
        Phone Verification
      </h2>
      <p className="mb-5 text-sm text-gray-600">{`We need to verify your phone number: +63${phoneNumber}`}</p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <InputField
          name="otp_code"
          label="One-time-password"
          type="number"
          errors={errors}
          register={register}
          placeholder="00000"
        />

        <div className="flex flex-col space-y-1">
          <button
            type="submit"
            className="flex w-full justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-60 disabled:hover:opacity-50"
          >
            Verify OTP
          </button>
          <p className="my-2 text-sm text-gray-600">Don't receive the verification OTP?<Link onClick={getCode} className={cn("text-orange-600 underline", {"text-gray-400 pointer-events-none": isRunning})}>{` Resend Again ${isRunning ? `(${counter})` : ""}`}</Link></p>
        </div>
      </form>
    </>
  )
}
