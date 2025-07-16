
import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Navigation from './pages/Navigation'
import TokenProvider from './context/TokenContext'

const queryClient = new QueryClient()

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <TokenProvider>
        <Navigation />
      </TokenProvider>
    </QueryClientProvider>
  )
}

export default App
