import * as yup from "yup"

export const reportValidation = (maximum) => {
    return yup.object().shape({
        quantity: yup.number()
        .required("Please enter a quantity")
        .min(1, "Quantity must be greater than 0")
        .max(maximum, `Quantity must be less than or equal to ${maximum}`)
        .typeError('Quantity must specify a number'),
        remarks: yup
        .string()
        .required("Remarks is a required field")
        .max(500, "Description must be at most 500 characters")
    })
}

    