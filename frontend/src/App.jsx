import React from 'react'
import { Outlet, useLocation } from 'react-router';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Navbar from './components/Navbar';


const App = () => {
  const location=useLocation();
  const noNavbarRoutes=["/login", "/signup"]
  return (
    <>
      <ToastContainer/>
      {!noNavbarRoutes.includes(location.pathname) && <Navbar/>}
      <div className='py-1 min-h-screen h-auto bg-gray-700 '>
      <main >
        <Outlet/>
      </main>
      </div>
    </>
    
  )
}
export default App;