import { Fragment, useState } from "react"
import { Disclosure, Menu, Transition } from "@headlessui/react"
import { ChevronDownIcon, FunnelIcon } from "@heroicons/react/20/solid"
import { useFetch, useFilter } from "../../../hooks"
import { getClientAssets } from "../api"

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

export const CategoryFilters = () => {
  const {
    categories,
    recommendations,
    sortOptions,
    setCategories,
    setSortType,
    setSortOptions,
    setRecommendations,
    setCheck
  } = useFilter()
  const [hasPersist, setHasPersist] = useState(true)
  const { data: assetsList } = useFetch(getClientAssets)
  const categoriesList = categories.filter((category) => assetsList.some((asset) => asset.Category.title === category.label))
  

  const handleCategoryCheck = (e) => {
    const newCategories = categories.map((category) => {
      const isSimilar = category.value === e.target.value
      if (isSimilar) {
        return {
          ...category,
          checked: e.target.checked,
        }
      }
      return category
    })
    setCategories(newCategories)
    setRecommendations(recommendations.map((r) => ({ ...r, checked: false })))
    setCheck(prev => !prev)
  }

  const handleRecommendCheck = (e) => {
    const newRecommendations = recommendations.map((recommend) => {
      const isSimilar = recommend.value === e.target.value
        return {
          ...recommend,
          checked: isSimilar && e.target.checked,
        }
    })
    setRecommendations(newRecommendations)
    setCategories(categories.map((c) => ({ ...c, checked: false })))
    setCheck(prev => !prev)
  }

  const clearCategories = () => {
    setCategories(categories.map((c) => ({ ...c, checked: false })))
    setRecommendations(recommendations.map((r) => ({ ...r, checked: false })))  
    setHasPersist(false)
    setCheck(prev => !prev)
  }

  const handleSort = (option) => {
    const newSortOptions = sortOptions.map((sortOption) => {
      setSortType(option.name)
      return { ...sortOption, current: sortOption.name === option.name }
    })
    setSortOptions(newSortOptions)
  }

  return (
    <div className="bg-white">
      <div className="pb-16 px-4 text-center sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight text-green-600">
          Browse Assets
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base text-gray-500">
          Select the barangay assets you want to borrow. You can only borrow and reserve the assets that are available.
        </p>
      </div>

      {/* Filters */}
      <Disclosure
        as="section"
        aria-labelledby="filter-heading"
        className="grid items-center border-t border-b border-gray-200"
      >
        <h2 id="filter-heading" className="sr-only">
          Filters
        </h2>
        <div className="relative col-start-1 row-start-1 py-4">
          <div className="mx-auto flex max-w-7xl space-x-6 divide-x divide-gray-200 px-4 text-sm sm:px-6 lg:px-8">
            <div>
              <Disclosure.Button className="group flex items-center font-medium text-gray-700">
                <FunnelIcon
                  className="mr-2 h-5 w-5 flex-none text-gray-400 group-hover:text-gray-500"
                  aria-hidden="true"
                />
                2 Filters
              </Disclosure.Button>
            </div>
            <div className="pl-6">
              <button
                type="button"
                className="text-gray-500"
                onClick={clearCategories}
              >
                Clear all
              </button>
            </div>
          </div>
        </div>
        <Disclosure.Panel className="border-t border-gray-200 py-10">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-4 px-4 text-sm sm:px-6 md:gap-x-6 lg:px-8">
            <div className="grid auto-rows-min grid-cols-1 gap-y-10 md:grid-cols-2 md:gap-x-6">
              <fieldset>
                <legend className="block font-medium">Category</legend>
                <div className="space-y-6 pt-6 sm:space-y-4 sm:pt-4">
                  {categoriesList.map((option, optionIdx) => (
                    <div
                      key={option.value}
                      className="flex items-center text-base sm:text-sm"
                    >
                      <input
                        id={`category-${optionIdx}`}
                        name="category[]"
                        defaultValue={option.value}
                        type="checkbox"
                        className="h-4 w-4 flex-shrink-0 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        checked={hasPersist && option.checked}
                        onChange={handleCategoryCheck}
                      />
                      <label
                        htmlFor={`category-${optionIdx}`}
                        className="ml-3 min-w-0 flex-1 text-gray-600"
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </fieldset>
            </div>
            <div className="grid auto-rows-min grid-cols-1 gap-y-10 md:grid-cols-2 md:gap-x-6">
              <fieldset>
                <legend className="block font-medium">
                  Assets Recommendation
                </legend>
                <div className="space-y-6 pt-6 sm:space-y-4 sm:pt-4">
                  {recommendations.map((option, optionIdx) => (
                    <div
                      key={option.value}
                      className="flex items-center text-base sm:text-sm"
                    >
                      <input
                        id={`recommendation-${optionIdx}`}
                        name="recommendation[]"
                        defaultValue={option.value}
                        type="checkbox"
                        className="h-4 w-4 flex-shrink-0 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        checked={hasPersist && option.checked}
                        onChange={handleRecommendCheck}
                      />
                      <label
                        htmlFor={`recommendation-${optionIdx}`}
                        className="ml-3 min-w-0 flex-1 text-gray-600"
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </fieldset>
            </div>
          </div>
        </Disclosure.Panel>
        <div className="col-start-1 row-start-1 py-4">
          <div className="mx-auto flex max-w-7xl justify-end px-4 sm:px-6 lg:px-8">
            <Menu as="div" className="relative inline-block">
              <div className="flex">
                <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                  Sort
                  <ChevronDownIcon
                    className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <Menu.Item key={option.name}>
                        {({ active }) => (
                          <a
                            className={classNames(
                              option.current
                                ? "font-medium text-gray-900"
                                : "text-gray-500",
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm"
                            )}
                            onClick={() => handleSort(option)}
                          >
                            {option.name}
                          </a>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </Disclosure>
    </div>
  )
}
