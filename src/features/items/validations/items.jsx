import * as yup from "yup"

export const itemValidation = yup.object().shape({
    name: yup
    .string()
    .required("Name is a required field"),
    brand: yup
    .string()
    .required("Brand is a required field"),
    model: yup
    .string()
    .required("Model is a required field"),
    date_of_purchase: yup
    .string()
    .required("Date of purchase is a required field"),
    quantity: yup
    .number("Enter a quantity number")
    .positive("Must be greater than zero")
    .required("Quantity is a required field")
    .typeError('Quantity must specify a number'),
    cost: yup
    .number("Enter a cost price")
    .positive("Must be greater than zero")
    .required("Cost is a required field")
    .typeError('Cost must specify a number')
})