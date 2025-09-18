import './App.css'
import Pages from "@/pages/index.jsx"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from './contexts/AuthContext'
import ErrorBoundary from './components/errors/ErrorBoundary'
import { Auth0Provider } from '@auth0/auth0-react'

function App() {
  return (
    <ErrorBoundary>
      <Auth0Provider
        domain={import.meta.env.VITE_AUTH0_DOMAIN}
        clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
        authorizationParams={{
          redirect_uri: window.location.origin,
          audience: import.meta.env.VITE_AUTH0_AUDIENCE,
          scope: 'openid profile email'
        }}
      >
        <AuthProvider>
          <Pages />
          <Toaster />
        </AuthProvider>
      </Auth0Provider>
    </ErrorBoundary>
  )
}

export default App