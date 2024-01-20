import * as yup from "yup"

export const resetValidation = yup.object().shape({
    password: yup
      .string()
      .required("Please enter a new password")
      .min(7, "Password must have at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      ),
    confirm_password: yup
      .string()
      .oneOf([yup.ref("password"), null], "Password must match")
      .required("Confirm password is a required field"),
})