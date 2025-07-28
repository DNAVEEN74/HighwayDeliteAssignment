import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Dashboard } from './pages/dashboard'
import { RegisterPage } from './pages/register'

function App() {
  return (
    <div>
      <Routes>
        <Route path='/Dashboard' element={<Dashboard/>} />
        <Route path='/SignUp' element={<RegisterPage comp='SignUp' />} />
        <Route path='/SignIn' element={<RegisterPage comp='SignIn' />} />
      </Routes>
    </div>
  )
}

export default App
