import { Route, Routes } from "react-router-dom"
import { RegisterForm, RegisterPhone, RegisterVerify } from "../components"
import { Layout } from "../components"

export const Register = () => {
  return (
    <Routes>
      <Route
        element={
          <Layout
            title="Create an account"
            desc="Already have an account"
            link="Log in"
            to="/auth/login"
          />
        }
      >
        <Route index element={<RegisterPhone />} />
        <Route path="verify" element={<RegisterVerify />} />
      </Route>
      <Route path="form" element={<RegisterForm />} />
    </Routes>
  )
}
