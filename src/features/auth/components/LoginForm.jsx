import { useForm } from "react-hook-form"
import { CheckBox, InputField } from "../../../components/Forms"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { loginCredentials } from "../api"
import { Error } from "../../../components/Misc"
import { yupResolver } from "@hookform/resolvers/yup"
import { loginValidation } from "../validations"
import { useError } from "../../../hooks"
import { useAuth } from "../../../hooks"
import { useEffect } from "react"
import { adminRoles } from "../../../data"

export const LoginForm = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || "/"
  const { setAuth, persist, setPersist } = useAuth()
  const [error, setError] = useError()
  const { register, handleSubmit, formState: { errors }} = useForm({ resolver: yupResolver(loginValidation) })
  const onSubmit = async (input) => {
    try {
      const { data } = await loginCredentials(input)
      setError({})
      setAuth({ profile: data.profile, accessToken: data.accessToken })
      navigate(adminRoles.includes(data?.profile?.User?.roles) ? '/' : from, { replace: true })
    } catch (error) {
      setError({ status: true, message: error.response.data.message })
    }
  }

  const togglePersist = () => {
    setPersist(prev => !prev)
  }

  useEffect(() => {
    localStorage.setItem("persist", persist)
  },[persist])

  return (
    <>
    <Error error={error.status} message={error.message}/>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <InputField
          name="phone_or_email"
          label="Phone Number or Email"
          type="text"
          errors={errors}
          register={register}
          placeholder="Enter your phone or email"
        />
        
        <InputField
          name="password"
          label="Password"
          type="password"
          errors={errors}
          register={register}
          placeholder="Enter your password"
        />

        <div className="flex items-center justify-between">
          <CheckBox name="remember-me" label="Remember me" onChange={togglePersist} checked={persist} />
          <div className="text-sm">
            <Link
              to="/auth/login/forget"
              className="font-semibold text-green-600 hover:text-green-500"
            >
              Forgot your password?
            </Link>
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Sign in
          </button>
        </div>
      </form>
    </>
  )
}
