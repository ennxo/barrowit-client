import { Link, useNavigate, useParams } from 'react-router-dom'
import { useFetch } from '../../../hooks'
import { getAccount } from '../api'
import { ArrowUturnLeftIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'
import { ImageModal } from '../../../components/Modal'
import { BeatLoader } from 'react-spinners'
import { VerifyModal } from './VerifyModal'

export const ViewAccount = () => {
  const { id } = useParams()
  const [showImage, setShowImage] = useState(false)
  const [verifyModal, setVerifyModal] = useState(false)
  const { data: account, hasPending } = useFetch(getAccount(id))
  const { User: user } = account
  const navigate = useNavigate()
  return hasPending ? 
  (
  <div className='flex flex-col justify-center items-center min-h-screen py-20'>
    <BeatLoader color="#16a34a" />
  </div>
  )
  :
  (
    <div className="overflow-hidden bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6 flex">
        <div>
        <img
        className="inline-block h-14 w-14 rounded-md"
        src={account.avatar}
        alt="account-avatar"
        />    
        <h3 className="text-lg font-medium leading-6 text-gray-900">{account.full_name}</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">{user?.roles.toUpperCase()}</p>
        </div>
        <button onClick={() => navigate(-1)}className="ml-auto"><ArrowUturnLeftIcon className='h-5'/></button>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
        <dl className="sm:divide-y sm:divide-gray-200">
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Phone Number</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{user?.phone_number}</dd>
          </div>
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Email Address</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{user?.email}</dd>
          </div>
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Address</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {account.address}
            </dd>
          </div>
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Valid ID ({account.id_type})</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <div role="list" className="divide-y divide-gray-200 rounded-md border border-gray-200">
                <div className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                    <Link className="w-full h-full hover:opacity-60" onClick={() => setShowImage(prev => !prev)}>
                    <img src={account.valid_id} alt="asset-image" className="w-full h-60 object-scale-down"/>
                    </Link>
                </div>
              </div>
              {!!parseInt(account?.User.isVerified) || (
              <button onClick={() => setVerifyModal(prev => !prev)} className="flex w-full justify-center rounded-md border border-transparent bg-orange-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"> 
                Verify Account
            </button>
              )}
            </dd>
          </div>
        </dl>
      </div>
      <ImageModal open={showImage} setOpen={setShowImage} imageSrc={account.valid_id} />
      <VerifyModal open={verifyModal} setOpen={setVerifyModal} account={account} />
    </div>
  )
}
