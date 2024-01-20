import { useForm } from "react-hook-form"
import {
  FileUpload,
  InputField,
  Photo,
  SelectField,
  TextArea,
} from "../../../components/Forms"
import { useAuth, useAxiosPrivate, useError } from "../../../hooks"
import { getAccount, updateAccount } from "../../accounts"
import { useState } from "react"
import { PencilSquareIcon, XCircleIcon } from "@heroicons/react/24/outline"
import { Link } from "react-router-dom"
import { types } from "../../accounts"
import { passwordValidation, userProfileValidation } from "../validations"
import { yupResolver } from "@hookform/resolvers/yup"
import { getDirtyFields } from "../../../utils"
import { Error } from "../../../components/Misc"
import { changeNewPassword } from "../api"
import { Notification } from "../../../components/Overlays"
import { useEffect } from "react"

export const AdminProfile = () => {
  const { auth } = useAuth()
  const axios = useAxiosPrivate()
  const [imageSource, setImageSource] = useState({})
  const [disabled, setDisabled] = useState(true)
  const [notification1, setNotification1] = useState(false)
  const [notification2, setNotification2] = useState(false)
  const [error, setError] = useError()
  const [error2, setError2] = useError()
  const {register, handleSubmit, setValue, clearErrors, formState: { errors, dirtyFields }} = useForm({
    resolver: yupResolver(userProfileValidation),
    defaultValues: async () => {
      const { data } = await axios.get(getAccount(auth?.profile?.id))
      setImageSource({ avatar: data.avatar })
      return {
        first_name: data.first_name,
        middle_name: data.middle_name || "",
        last_name: data.last_name,
        phone_number: data.User?.phone_number,
        email: data.User?.email,
        address: data.address,
      }
    },
  })
  const {register: register2, handleSubmit: handleSubmit2, reset, formState: { errors: errors2 }} = useForm({
    resolver: yupResolver(passwordValidation)
  })

  const changeInformation = async (data) => {
    const newData = getDirtyFields(dirtyFields, data)
    if(Object.keys(newData).length === 0) return;
    const formData = new FormData()
    for (const value in newData) {
      ["avatar", "valid_id"].includes(value)
        ? !data[value][0] || formData.append(value, data[value][0])
        : formData.append(value, data[value])
    }
    try {
      await updateAccount(auth?.profile?.id, formData)
      setError2({})
      setDisabled(false)
      setNotification1(true)
    } catch (error) {
      setError({ status: true, message: error.response.data.message })
    }
  }

  const changePassword = async (data) => {
    try {
      await changeNewPassword({...data, phone_number: auth?.profile?.User?.phone_number})
      reset()
      setError2({})
      setNotification2(true)
    } catch (error) {
      setError2({ status: true, message: error.response.data.message })
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setNotification1(false)
      setNotification2(false)
    }, 6000)
  }, [notification1, notification2])

  return (
    <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-9">
      <div>
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Profile
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                This information will be displayed publicly so be careful what
                you share.
              </p>
            </div>
          </div>
          <div className="mt-5 md:col-span-2 md:mt-0">
            <form onSubmit={handleSubmit(changeInformation)}>
              <div className="shadow sm:overflow-hidden sm:rounded-md">
                <Link
                  className="float-right m-5"
                  onClick={() => [setDisabled((prev) => !prev), clearErrors()]}
                >
                  {disabled ? (
                    <PencilSquareIcon className="h-6 text-green-900 hover:text-green-700" />
                  ) : (
                    <XCircleIcon className="h-6 text-green-900 hover:text-green-700" />
                  )}
                </Link>
                <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                  <Error error={error.status} message={error.message} />
                  <div>
                    <Photo
                      name="avatar"
                      register={register}
                      errors={errors}
                      setValue={setValue}
                      label="Avatar"
                      isDisabled={disabled}
                      imageSource={imageSource.avatar}
                    />
                  </div>
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-2">
                      <InputField
                        name="first_name"
                        label="First Name"
                        type="text"
                        errors={errors}
                        register={register}
                        disabled={disabled}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-2">
                      <InputField
                        name="middle_name"
                        label="Middle Name"
                        type="text"
                        errors={errors}
                        register={register}
                        disabled={disabled}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-2">
                      <InputField
                        name="last_name"
                        label="Last Name"
                        type="text"
                        errors={errors}
                        register={register}
                        disabled={disabled}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <InputField
                        name="phone_number"
                        label="Phone Number"
                        type="number"
                        errors={errors}
                        register={register}
                        disabled
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <InputField
                        name="email"
                        label="Email"
                        type="text"
                        errors={errors}
                        register={register}
                        disabled={disabled}
                      />
                    </div>
                  </div>

                  <div>
                    <TextArea
                      name="address"
                      label="Address"
                      type="text"
                      errors={errors}
                      register={register}
                      rows={3}
                      disabled={disabled}
                    />
                  </div>
                </div>

                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                  {!disabled && (
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                    >
                      Save
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      {!disabled && (
        <>
      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>
      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Change password
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Update your password associated with your account.
              </p>
            </div>
          </div>
          <div className="mt-5 md:col-span-2 md:mt-0">
            <form onSubmit={handleSubmit2(changePassword)}>
              <div className="overflow-hidden shadow sm:rounded-md">
                <div className="bg-white px-4 py-5 sm:p-6">
                <Error error={error2.status} message={error2.message} />
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-4">
                      <InputField
                        name="current_password"
                        label="Current Password"
                        type="password"
                        errors={errors2}
                        register={register2}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-4">
                      <InputField
                        name="password"
                        label="New Password"
                        type="password"
                        errors={errors2}
                        register={register2}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-4">
                      <InputField
                        name="confirm_password"
                        label="Confirm New Password"
                        type="password"
                        errors={errors2}
                        register={register2}
                      />
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  >
                    Change Password
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      </>
      )}
      <Notification show={notification1} setShow={setNotification1} title={"Profile information changed"} subtitle={"Your account information was updated"} />
      <Notification show={notification2} setShow={setNotification2} title={"Password changed"} subtitle={"Your account password was updated"} />
    </div>
  )
}
