
import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Students from './pages/Students'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {BrowserRouter, Route, Routes} from 'react-router'
import StudentDetail from './pages/StudentDetails'



const queryClient = new QueryClient()

function App() {

  return (
    <BrowserRouter>
    <QueryClientProvider client={queryClient}>
   <Routes>
      <Route path='/' element={<Students />} />
      <Route path='/student/:studentId' element={<StudentDetail />} />

   </Routes>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>

    </BrowserRouter>
  )
}

export default App
