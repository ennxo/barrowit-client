import { Link } from "react-router-dom"
import { faqs } from "../data"

export const Frequent = () => {
    return (
      <div className="bg-white">
        <div className="mx-auto max-w-7xl py-16 px-6 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold leading-10 tracking-tight text-green-600">Frequently Asked Questions (FAQs)</h2>
            <p className="mt-6 text-base leading-7 text-gray-600">
            This section provides answers to the most commonly asked questions about our services. If you can’t find the answer you’re looking for, please don’t hesitate to contact us.
            <br/>
            <br/>
            Please note that by using our services, you agree to abide by {' '}
              <Link to="/terms-and-conditions" className="font-semibold text-orange-600 hover:text-green-500 underline">
              our Terms and Conditions. 
              </Link>
            <br/>
              We encourage you to read them carefully.
            </p>
          </div>
          <div className="mt-20">
            <dl className="space-y-16 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-16 sm:space-y-0 lg:gap-x-10">
              {faqs.map((faq) => (
                <div key={faq.id}>
                  <dt className="text-base font-semibold leading-7 text-green-600">{faq.question}</dt>
                  <dd className="mt-2 text-base leading-7 text-gray-600">{faq.answer}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    )
  }
  