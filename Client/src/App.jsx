import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import RootLayout from './RootLayout'
import Landing from './components/landing/Landing'
import Home from './components/home/Home'
function App() {
  let provider = createBrowserRouter([
    {
      path: '',
      element: <RootLayout />,
      children : [
        {
          path : '',
          element : <Landing />
        },
        {
          path : '/home',
          element : <Home />
        }
      ]
    }
  ])
  return (
    <RouterProvider router={provider} />
  )
}

export default App