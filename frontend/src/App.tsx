import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Dashboard } from './pages/dashboard'
import { RegisterPage } from './pages/register'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <div>
      <Routes>
        <Route path='/Dashboard' element={<Dashboard />} />
        <Route path='/SignUp' element={<RegisterPage comp='SignUp' />} />
        <Route path='/SignIn' element={<RegisterPage comp='SignIn' />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  )
}

export default App