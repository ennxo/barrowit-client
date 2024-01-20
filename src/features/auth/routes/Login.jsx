import { Route, Routes } from "react-router-dom"
import { LoginForm, Layout, ResetPassword, ForgetVerify, ForgetPhone } from "../components"

export const Login = () => {
  return (
    <Routes>
      <Route
        element={
          <Layout
            title="Sign in"
            desc="Not a member"
            link="Create an account"
            to="/auth/register"
          />
        }
      >
        <Route index element={<LoginForm />} />
      </Route>
      <Route
        element={
          <Layout
            title="Reset Password"
            desc="Already know the password"
            link="Back to Sign In"
            to="/auth/login"
          />
        }
      >
      <Route path="forget" element={<ForgetPhone/>}/>
      <Route path="verify" element={<ForgetVerify/>}/>  
      <Route path="reset" element={<ResetPassword/>}/>
      </Route>
    </Routes>
  )
}
