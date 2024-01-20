import * as yup from "yup"

const FILE_SIZE = 300 * 1024
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"]

export const assetValidation = yup.object().shape({
  name: yup.string().required("Name is a required field"),
  description: yup
    .string()
    .min(5, "Description must be at least 5 characters")
    .max(500, "Description must be at most 500 characters"),
  category_id: yup.string().required("Category is a required field"),
  status: yup.string().required("Status is a required field"),
  useful_lifespan: yup
    .number("Enter the useful lifespan")
    .positive("Must be greater than zero")
    .required("Useful lifespan is a required field")
    .typeError('Useful lifespan must specify a number'),
  image: yup
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
