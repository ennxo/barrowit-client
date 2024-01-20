import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowUturnLeftIcon } from '@heroicons/react/24/solid'
import { getArchivedAsset } from '../../api'
import { useFetch } from '../../../../hooks'
import { useState } from 'react'
import { ImageModal } from '../../../../components/Modal'
import { BeatLoader } from 'react-spinners'

export const ViewAssetsArchived = () => {
  const { id } = useParams()
  const { data: asset, hasPending } = useFetch(getArchivedAsset(id))
  const [showImage, setShowImage] = useState(false)
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
        <h3 className="text-lg font-medium leading-6 text-gray-900">{asset.name}</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">{asset.status ? 'Available or In Use Asset' : 'In Stock Asset'}</p>
        </div>
        <button onClick={() => navigate(-1)}className="ml-auto"><ArrowUturnLeftIcon className='h-5'/></button>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
        <dl className="sm:divide-y sm:divide-gray-200">
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Total Quantity</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{asset.total_quantity}</dd>
          </div>
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Total Cost</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{`₱${asset.total_cost}`}</dd>
          </div>
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Total Depreciation</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{`₱${asset.total_depreciation}`}</dd>
          </div>
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Total Scrap Value</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{`₱${asset.total_scrap}`}</dd>
          </div>
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Description</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {asset.description}
            </dd>
          </div>
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Attachments</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <div role="list" className="divide-y divide-gray-200 rounded-md border border-gray-200">
                <div className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                    <Link className="w-full h-full hover:opacity-60" onClick={() => setShowImage(prev => !prev)}>
                    <img src={asset.image} alt="asset-image" className="w-full h-60 object-scale-down"/>
                    </Link>
                </div>
              </div>
            </dd>
          </div>
        </dl>
      </div>
      <ImageModal open={showImage} setOpen={setShowImage} imageSrc={asset.image} />
    </div>
  )
}
