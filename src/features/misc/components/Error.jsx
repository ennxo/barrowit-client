
export const Error = ({error, resetErrorBoundary}) => {
    return ( 
      <main className="mx-auto flex w-full max-w-7xl flex-grow flex-col px-6 lg:px-8 min-h-screen">
          <div className="my-auto flex-shrink-0 py-16 sm:py-32">
            <p className="text-base font-semibold text-green-600">Error</p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Something went wrong!</h1>
            <p className="mt-2 text-base text-gray-500">{error.message}</p>
            <div className="mt-6">
              <a className="text-base font-medium text-green-600 hover:text-green-500" onClick={resetErrorBoundary}>
                Go back home
                <span aria-hidden="true"> &rarr;</span>
              </a>
            </div>
          </div>
        </main>
     )
}