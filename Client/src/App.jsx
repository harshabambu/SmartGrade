import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import RootLayout from './RootLayout'
import Home from './components/home/Home'
function App({children}) {
  let provider = createBrowserRouter([
    {
      path: '',
      element: <RootLayout />,
      children : [
        {
          path : '',
          element : <Home />
        }
      ]
    }
  ])
  return (
    <RouterProvider router={provider}>
      {children}
    </RouterProvider>
  )
}

export default App