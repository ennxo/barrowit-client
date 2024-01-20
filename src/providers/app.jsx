import { BrowserRouter as Router } from "react-router-dom"
import { ErrorBoundary } from "react-error-boundary"
import { Error } from "../features/misc"
import { AuthProvider } from "../context/auth"
import { CartProvider } from "../context/cart"
import { FilterProvider } from "../context/filter"

export const AppProvider = ({ children }) => {
  return (
    <AuthProvider>
      <ErrorBoundary FallbackComponent={Error}>
      <CartProvider>
        <FilterProvider>
        <Router>{children}</Router>
        </FilterProvider>
        </CartProvider>
      </ErrorBoundary>
    </AuthProvider>
  )
}
