import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePages from './pages/HomePages'
import Singup from './component/Singup-user'
import Login from './component/Login-user'
import { ToggleLeft } from 'lucide-react'
import { Toaster  } from 'react-hot-toast'

function App() {

  return (
    <div className="bg-gray-900 h-screen text-white flex justify-center items-center relative">
       <div className="absolute top-5  right-10  text-2xl">
      <ToggleLeft  onClick={() => {console.log("hello")}} />
      </div>
      <Routes>
        <Route path='/' element={<HomePages />} />
        <Route index element={<Singup />} />
        <Route path='/login' element={<Login />} />
      </Routes>
       <Toaster  />
    </div>
  )
}

export default App
 