import { Fragment, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { Bars3Icon, ShoppingCartIcon, XMarkIcon } from '@heroicons/react/24/outline'
import logo from "/logo.png"
import { cn } from '../../utils'
import { Link, redirect, useLocation, useNavigate } from 'react-router-dom'
import { useAuth, useCart, useFetch, useFilter, useLogout } from '../../hooks'
import { HeaderButtons } from './components'
import { SlideOver } from '../SlideOver'
import { useEffect } from 'react'

export const Header = () => {
    const { auth } = useAuth()
    const { profile } = auth 
    const { carts } = useCart()
    const { setQuery } = useFilter()
    const redirect = useNavigate()
    const total = carts.reduce((n, { total_quantity }) => n + total_quantity || 0 , 0)
    const logOut = useLogout()
    
    const source = profile?.avatar
    const { pathname } = useLocation()
    const [hasAppear, setHasAppear] = useState(false)
    const navigate = [
        { name: 'Home', to: '/', current: true },
        { name: 'Browse Asset', to: '/browse', current: false },
        { name: 'About', to: '/about', current: false },
        { name: 'FAQs', to: '/faqs', current: false },
        { name: 'Sign In', to: '/auth/login', accessToken: auth?.accessToken, hidden: true },
        { name: 'Create account', to: '/auth/register', accessToken: auth?.accessToken, hidden: true }
    ]

    const [navigations, setNavigations] = useState(navigate)
    const profileLinks = [
        { name: 'Your Profile', to: '/profile' },
        { name: 'Borrowed History', to: '/history'},
        { name: 'Sign Out', to: '#', onClick: logOut },
    ]

    const setCurrent = (link) => {
        //Set the current page to active
        const updatedCurrent = navigations.map((navigation) => ({
          ...navigation,
          current: navigation.name === link.name
        }))
        setNavigations(updatedCurrent)
    }

    const handleSearch = (e) => {
      const query = e.target.value
      if(e.key === 'Enter') {
        e.preventDefault()
        setQuery(query)
        redirect('/browse', {replace: true})
      }
      e.target.value === '' && setQuery('')
    }

    useEffect(() => {
      const current = navigations.find((navigation) => navigation.to === pathname)
      current && setCurrent(current)
    }, [pathname])

  return (
    <Disclosure as="nav" className="bg-gray-50 shadow mb-1">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex px-2 lg:px-0">
                <Link to="/" className="flex flex-shrink-0 items-center">
                  <img
                    className="block h-8 w-auto lg:hidden"
                    src={logo}
                    alt="Barrow It"
                  />
                  <img
                    className="hidden h-8 w-auto lg:block"
                    src={logo}
                    alt="Barrow It"
                  />
                </Link>
                <div className="hidden lg:ml-6 lg:flex lg:space-x-8">
                  {navigations.map((navigation, index) => (
                    <Link
                    to={navigation.to}
                    key={index}
                    className={cn("inline-flex items-center border-b-2 border-green-500 px-1 pt-1 text-sm font-medium text-gray-900", {"border-green-500 text-gray-900": navigation.current}, {"border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700": !navigation.current}, {"hidden": navigation.hidden})}
                    aria-current={navigation.current ? 'page' : undefined}
                    onClick={() => setCurrent(navigation)}
                  >
                    {navigation.name}
                  </Link>
                  ))}
                </div>
              </div>
              <div className="flex flex-1 items-center justify-center px-2 lg:ml-6 lg:justify-end">
                <div className="w-full max-w-lg lg:max-w-xs">
                  <label htmlFor="search" className="sr-only">
                    Search
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input
                      id="search"
                      name="search"
                      className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 leading-5 placeholder-gray-500 focus:border-green-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-green-500 sm:text-sm"
                      placeholder="Search"
                      type="search"
                      onKeyDown={handleSearch}
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center lg:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="hidden lg:ml-4 lg:flex lg:items-center">
                {/* Profile dropdown */}
                {auth?.accessToken ?
                <Menu as="div" className="relative mr-4 flex-shrink-0">
                  <div>
                    <Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src={source}
                        alt=""
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
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {profileLinks.map((link, index) => (
                      <Menu.Item key={index}>
                        {({ active }) => (
                          <Link
                            to={link.to}
                            className={cn('block px-4 py-2 text-sm text-gray-700', {'bg-gray-100': active })}
                            onClick={link?.onClick}
                          >
                            {link.name}
                          </Link>
                        )}
                      </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
                :
                <HeaderButtons/>
                }
              </div>
              <div className="flex items-center">
              <button
                  type="button"
                  className="flex-shrink-0 p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                  <span className="sr-only">View carts</span>
                  <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" onClick={() => setHasAppear(prev => !prev)}/>
                </button>
              <span className="block text-sm font-medium text-gray-700 group-hover:text-gray-800">{total}</span>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="lg:hidden">
            <div className="space-y-1 pt-2 pb-3">
              {/* Current: "bg-green-50 border-green-500 text-green-700", Default: "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800" */}
              {navigations.map((navigation, index) => (
              <Disclosure.Button
                as={Link}
                to={navigation.to}
                key={index}
                className={cn("block border-l-4 py-2 pl-3 pr-4 text-base font-medium", {"bg-green-50 border-green-500 text-green-700" : navigation.current}, {"border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800": !navigation.current}, {"hidden": navigation.accessToken})}
                onClick={() => setCurrent(navigation)}
              >
                {navigation.name}
              </Disclosure.Button>
              ))}
            </div>
            {auth?.accessToken && 
            <div className="border-t border-gray-200 pt-4 pb-3">
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={source}
                    alt=""
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">{`${profile.first_name} ${profile.last_name}`}</div>
                  <div className="text-sm font-medium text-gray-500">{profile["User"].email}</div>
                </div>
              </div>
              <div className="mt-3 space-y-1">
                {profileLinks.map((link, index) => (
                <Disclosure.Button
                  as={Link}
                  to={link.to}
                  key={index}
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                  onClick={link?.onClick}
                >
                  {link.name}
                </Disclosure.Button>
                ))}
              </div>
            </div>
            }
          </Disclosure.Panel>
          <SlideOver open={hasAppear} setOpen={setHasAppear}/>
        </>
      )}
    </Disclosure>
  )
}
