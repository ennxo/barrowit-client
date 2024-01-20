import * as yup from "yup"

export const eventsValidation = yup.object().shape({
  title: yup
    .string()
    .required("Title is  a required field"),
  description: yup
    .string()
    .max(200, "Description must be at most 200 characters")
})