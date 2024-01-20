export const getDirtyFields = (dirtyFields, values) => {
  if (dirtyFields === true || Array.isArray(dirtyFields)) return values
  return Object.fromEntries(
    Object.keys(dirtyFields).map((key) => [
      key,
      getDirtyFields(dirtyFields[key], values[key]),
    ])
  )
}
