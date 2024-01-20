import { Fragment, useEffect, useMemo, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { InputField } from '../../../components/Forms'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { categoriesValidation } from "../validations"
import { updateCategory } from "../api"
import { useError } from '../../../hooks'
import { Error } from '../../../components/Misc'
import { getDirtyFields } from '../../../utils'
import { TagIcon } from '@heroicons/react/24/solid'

export const UpdateModal = ({ open, setOpen, fetchData, category}) => {
  const [error, setError] = useError()
  const cancelButtonRef = useRef(null)
  const { register, handleSubmit, reset, formState: { errors, dirtyFields }} = useForm({ 
    resolver: yupResolver(categoriesValidation),
    defaultValues: useMemo(() => {
      return {
        title: category.title,
        description: category.description
      }
    },[category])
  }) 
  
  useEffect(() => {
    let hasMounted = true
    hasMounted && reset(category)
    return () => hasMounted = false
  }, [category])

  const onUpdate = async (data) => {
    const newData = getDirtyFields(dirtyFields, data)
    if(Object.keys(newData).length === 0) return;
    try {
      await updateCategory(newData, category.id)
      setOpen(!errors ? true : false)
      fetchData()
      setError({})
    } catch (error) {
      setError({ status: true, message: error.response.data.message })
    }
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
              <form onSubmit={handleSubmit(onUpdate)}>
                <div className="sm:flex sm:items-start w-full">
                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                    <TagIcon
                      className="h-6 w-6 text-green-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 ">
                      Update Category
                    </Dialog.Title>
                    <Error error={error.status} message={error.message} />
                    <div className="mt-2">
                    <InputField
                      name="title"
                      label="Title"
                      type="text"
                      errors={errors}
                      register={register}
                      placeholder="Enter your a category"
                    />
                    <InputField
                      name="description"
                      label="Description"
                      type="text"
                      errors={errors}
                      register={register}
                      placeholder="Enter a description"
                    />
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
                    onClick={() => [setOpen(false), setError({})]}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
