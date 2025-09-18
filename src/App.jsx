import './App.css'
import Pages from "@/pages/index.jsx"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from './contexts/AuthContext'
import ErrorBoundary from './components/errors/ErrorBoundary'
import { UserProvider } from '@auth0/nextjs-auth0/client'

function App() {
  return (
    <ErrorBoundary>
      <UserProvider>
        <AuthProvider>
          <Pages />
          <Toaster />
        </AuthProvider>
      </UserProvider>
    </ErrorBoundary>
  )
}

export default App