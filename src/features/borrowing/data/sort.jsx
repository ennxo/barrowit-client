export const localSortData = JSON.parse(localStorage.getItem('sort') || false)

export const sortOptions = [
    { name: 'Default', current: true },
    { name: 'Ascending', current: false },
    { name: 'Descending', current: false },
    { name: 'A-Z', current: false },
    { name: 'Z-A', current: false },
]

export const sortData = localSortData || sortOptions
  