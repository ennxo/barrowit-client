import * as yup from "yup"

const FILE_SIZE = 20 * 1024 * 1024 // 20MB
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"]

export const adminValidation = yup.object().shape({
  first_name: yup
    .string()
    .required("First name is a required field.")
    .matches(
      /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/g,
      "First name can only contain letters."
    ),
  middle_name: yup.string().matches(
    /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/g,
    "Middle name can only contain letters."
  ),
  last_name: yup.string().required("Last name is a required field.").matches(
    /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/g,
    "Last name can only contain letters."
  ),
  address: yup.string().required("Address is a required field"),
  roles: yup.string().required("Roles is a required field"),
  phone_number: yup
    .string()
    .required("Phone Number is required")
    .test("phone_number", "Enter PH Phone Number", function (value) {
      const phoneRegex = /^(09|\+639|639)\d{9}$/
      return phoneRegex.test(value)
    }),
  email: yup
    .string()
    .trim()
    .required("Email is a required field")
    .email("Invalid email")
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,"Invalid email"),
  password: yup
    .string()
    .required("Please enter a password")
    .min(7, "Password must have at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password"), null], "Password must match")
    .required("Confirm password is a required field"),
  avatar: yup
    .mixed()
    .test(
      "fileFormat",
      "Unsupported file type",
      (value) =>
        value.length === 0 ||
        (value && SUPPORTED_FORMATS.includes(value[0].type))
    )
    .test(
      "fileSize",
      "File too large",
      (value) => value.length === 0 || (value && value[0].size <= FILE_SIZE)
    ),
})
