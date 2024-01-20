import * as yup from "yup"

export const cartsValidation = (assets) => {
  const getAssetQuantityById = (id) => {
    const asset = assets.find((asset) => asset.id === id)
    return asset ? asset.total_quantity : 0
  }
  return yup.object().shape({
    purpose: yup.string().required("Purpose is a required field"),
    terms: yup.bool().oneOf([true], "You must accept the terms and conditions"),
    borrow_date: yup
      .date()
      .nullable()
      .required("Borrow Date is required")
      .min(new Date(), "Borrow Date must be ahead than today"),
    return_date: yup.lazy(() => {
      let futureDate = new Date()
      futureDate.setMonth(futureDate.getMonth() + 1)
      return yup
        .date()
        .nullable()
        .required("Return Date is required")
        .min(
          yup.ref("borrow_date"),
          "Return Date must be ahead than Borrow Date"
        )
        .max(futureDate, "Return date must be within 1 month")
    }),
    carts: yup.array().of(
      yup.object().shape({
        total_quantity: yup.lazy((value, { parent }) => {
          return yup
            .number()
            .required("Please enter a quantity")
            .min(1, "Quantity must be greater than 0")
            .max(
              getAssetQuantityById(parent.id),
              `Quantity must be less than or equal to ${getAssetQuantityById(
                parent.id
              )}`
            )
            .typeError("Quantity must specify a number")
        }),
      })
    ),
  })
}

export const quantityValidation = (asset) => {
  return yup.object().shape({
    quantity: yup
      .number("Quantity must be a number")
      .required("Please enter a quantity")
      .min(1, "Quantity must be greater than 0")
      .max(
        asset?.total_quantity,
        `Quantity must be less than or equal to ${asset?.total_quantity}`
      )
      .typeError("Quantity must specify a number"),
  })
}
