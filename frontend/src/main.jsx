import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import store from './redux/store.js'
import { Provider } from 'react-redux'
import {Route,RouterProvider,createRoutesFromElements } from 'react-router'
import {createBrowserRouter} from 'react-router-dom'

import Login from './pages/auth/Login.jsx'
import Signup from './pages/auth/Signup.jsx'
import ProductList from './pages/user/ProductList.jsx'
import ProductDetails from './pages/user/ProductDetails.jsx'
import UpdateProduct from './pages/user/UpdateProduct.jsx'
import CreateProduct from './pages/user/CreateProduct.jsx'
import UserRoute from './components/UserRoutes.jsx'

const routes=createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} >
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/' element={<ProductList />} />
      <Route  path='' element={<UserRoute/>}>
      <Route path='/products/:pId' element={<ProductDetails />} />
      <Route path='/update-product/:pId' element={<UpdateProduct />} />
      <Route path='/create-product' element={<CreateProduct />} />
      </Route>


    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={routes} />
  </Provider>
)
