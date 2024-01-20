import * as yup from "yup"

const FILE_SIZE = 20 * 1024 * 1024 // 20MB
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"]

export const adminProfileValidation = yup.object().shape({
  first_name: yup
    .string()
    .required("First name is a required field.")
    .matches(
      /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/g,
      "First name can only contain letters."
    ),
  middle_name: yup
    .string()
    .matches(
      /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/g,
      "Middle name can only contain letters."
    ),
  last_name: yup
    .string()
    .required("Last name is a required field.")
    .matches(
      /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/g,
      "Last name can only contain letters."
    ),
  address: yup.string().required("Address is a required field"),
  email: yup
    .string()
    .email("Invalid email")
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,"Invalid email"),
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


