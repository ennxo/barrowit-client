import { hotlines } from '../data'
import headerBg from '/images/16.png'

export const Hotline = () => {
  return (
    <div className="mt-10">
      {/* Header */}
      <div className="relative bg-orange-300 pb-32">
        <div className="absolute inset-0">
          <img
            className="h-full w-full object-cover"
            src={headerBg}
            loading='lazy'
            alt=""
          />
          <div className="absolute inset-0 bg-orange-300 mix-blend-multiply" aria-hidden="true" />
        </div>
        <div className="relative mx-auto max-w-7xl py-24 px-6 sm:py-32 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">Contact/Emergency Hotlines</h1>
        </div>
      </div>

      {/* Overlapping cards */}
      <section className="relative z-10 mx-auto -mt-32 max-w-7xl px-6 pb-32 lg:px-8" aria-labelledby="contact-heading">
        <h2 className="sr-only" id="contact-heading">
          Contact us
        </h2>
        <div className="grid grid-cols-1 gap-y-20 lg:grid-cols-3 lg:gap-y-0 lg:gap-x-8">
          {hotlines.map((link) => (
            <div key={link.name} className="flex flex-col rounded-2xl bg-white shadow-xl">
              <div className="relative flex-1 px-6 pt-16 pb-8 md:px-8">
                <div className="absolute top-0 inline-block -translate-y-1/2 transform rounded-xl bg-green-600 p-5 shadow-lg">
                  <link.icon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-medium text-gray-900">{link.name}</h3>
                <ul className="mt-4 text-base text-gray-900 font-bold">{link.description}</ul>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
