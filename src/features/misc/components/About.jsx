import { CloudArrowUpIcon, LockClosedIcon, ServerIcon } from '@heroicons/react/20/solid'

const features = [
  {
    name: 'Push to deploy.',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'SSL certificates.',
    description: 'Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.',
    icon: LockClosedIcon,
  },
  {
    name: 'Database backups.',
    description: 'Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.',
    icon: ServerIcon,
  },
]

export const About = () => {
  return (
    <div className="overflow-hidden bg-white py-24 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-y-16 gap-x-8 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:ml-auto lg:pt-4 lg:pl-4">
            <div className="lg:max-w-lg">
              <h2 className="text-lg font-semibold leading-8 tracking-tight text-orange-600">About Us</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-green-600 sm:text-4xl">Our Mission</p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
              Our mission is to leverage technology to strengthen our barangay’s sense of community and resilience. We aim to provide a reliable, user-friendly website platform that enables residents to borrow and reserve barangay assets. This platform will serve as a lifeline during emergencies and events, ensuring that all residents have access to the resources they need when they need them most.
              </p>
              <p className="mt-5 text-3xl font-bold tracking-tight text-green-600 sm:text-4xl">Our Vision</p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
              We envision a future where our barangay is a model of digital innovation and community cooperation. Through our website platform, we aim to promote resource sharing and mutual aid, fostering a community where everyone’s material needs are met, especially during emergencies and events. We strive to make our barangay a place where technology enhances the spirit of bayanihan, contributing to a more connected, resilient, and supportive community.
              </p>
            </div>
          </div>
          <div className="flex items-start justify-end lg:order-first">
            <img
              src="/images/02.png"
              alt="Product screenshot"
              className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] object-contain"
              width={2432}
              height={1442}
              loading='lazy'
            />
          </div>
        </div>
      </div>
    </div>
  )
}

// import { features } from "../data"
// export const About = () => {
//   return (
//     <div className="bg-white py-24 sm:py-32">
//       <div className="mx-auto max-w-7xl px-6 lg:px-8">
//         <div className="mx-auto max-w-2xl lg:text-center">
//           <h2 className="text-lg font-semibold leading-8 tracking-tight text-green-600">BarrowIt</h2>
//           <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
//             Our Mission
//           </p>
//           <p className="mt-6 text-lg leading-8 text-gray-600">
//           Our mission is to leverage technology to strengthen our barangay’s sense of community and resilience. We aim to provide a reliable, user-friendly website platform that enables residents to borrow and reserve barangay assets. This platform will serve as a lifeline during emergencies and events, ensuring that all residents have access to the resources they need when they need them most.
//           </p>
//         </div>
//         <div className="mt-24 mx-auto max-w-2xl lg:text-center">
//           <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
//             Our Vision
//           </p>
//           <p className="mt-6 text-lg leading-8 text-gray-600">
//           We envision a future where our barangay is a model of digital innovation and community cooperation. Through our website platform, we aim to promote resource sharing and mutual aid, fostering a community where everyone’s material needs are met, especially during emergencies and events. We strive to make our barangay a place where technology enhances the spirit of bayanihan, contributing to a more connected, resilient, and supportive community.
//           </p>
//         </div>
//       </div>
//     </div>
//   )
// }
