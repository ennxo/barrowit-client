import * as yup from "yup"

export const reservationValidation = yup.object().shape({
  date: yup.string().required("Date is a required field"),
  quantity: yup
    .number("Enter a quantity")
    .positive("Must be greater than zero")
    .required("Quantity is a required field")
    .typeError('Quantity must specify a number')
})
