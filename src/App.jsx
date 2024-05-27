import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import AppLayout from './components/layouts/AppLayout'
import AuthLayout from './components/layouts/AuthLayout'
import Home from '@pages/Home'
import Login from '@pages/Login'

function App() {

  return (
    <BrowserRouter>
      <Routes>

        <Route path='/' element={<AppLayout/>}>
          <Route index element={<Home/>}/>
        </Route>

        <Route path='/auth' element={<AuthLayout/>}>
          <Route index element={<Login/>}/>
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
