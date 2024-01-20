import * as yup from "yup"

export const loginValidation = yup.object().shape({
  phone_or_email: yup
    .string("Enter your Email/Phone Number")
    .required("Email/Phone Number is required")
    .test("phone-email", "Enter Valid Phone/Email", function (value) {
      const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
      const phoneRegex = /^(09|\+639|639)\d{9}$/
      return emailRegex.test(value) || phoneRegex.test(value)
    }),
  password: yup.string().required("Please enter a password"),
})