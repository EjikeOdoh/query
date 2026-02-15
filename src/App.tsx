
import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Navigation from './pages/Navigation'
import TokenProvider from './context/TokenContext'
import ProfileProvider from './context/ProfileContext'
import CurrentYearProvider from './context/CurrentYearContext'

const queryClient = new QueryClient()

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <TokenProvider>
        <ProfileProvider>
          <CurrentYearProvider>
            <Navigation />
          </CurrentYearProvider>
        </ProfileProvider>
      </TokenProvider>
    </QueryClientProvider>
  )
}

export default App
