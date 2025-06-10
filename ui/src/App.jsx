import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePages from './pages/HomePages'
import Singup from './component/Singup-user'



function App() {

  return (
    <div className="bg-gray-900 h-screen text-white flex justify-center items-center relative">
      <Routes>
        <Route path='/' element={<HomePages />} />   <Route path='/signupUser' element={<Singup />} />
     
      </Routes>
    </div>
  )
}

export default App
