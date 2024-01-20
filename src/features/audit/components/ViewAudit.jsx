import { useNavigate, useParams } from 'react-router-dom'
import { useFetch } from '../../../hooks'
import { getAudit } from '../api'
import { ArrowUturnLeftIcon } from '@heroicons/react/24/solid'
import { BeatLoader } from 'react-spinners'

export const ViewAudit = () => {
  const { id } = useParams()
  const { data: audit, hasPending } = useFetch(getAudit(id))
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
        <h3 className="text-lg font-medium leading-6 text-gray-900">{audit.actor}</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">{audit.createdAt}</p>
        </div>
        <button onClick={() => navigate(-1)}className="ml-auto"><ArrowUturnLeftIcon className='h-5'/></button>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
        <dl className="sm:divide-y sm:divide-gray-200">
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Action</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{audit.action?.toUpperCase()}</dd>
          </div>
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Database Table</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{audit.table}</dd>
          </div>
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Created At</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{audit.createdAt}</dd>
          </div>
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Updated At</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{audit.updatedAt}</dd>
          </div>
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Description</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {audit.description}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  )
}
