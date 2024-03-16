import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import Authonicate from './ContextHandler/Authonicate/Authonicate.jsx'
import rout from './Rout/Rout.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Authonicate>
      <RouterProvider router={rout}></RouterProvider>
    </Authonicate>
  </React.StrictMode>,
)
