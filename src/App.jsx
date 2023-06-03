import { useState } from 'react'
import { BrowserRouter ,Routes , Route } from "react-router-dom"
import HomePage from './pages/HomePage'
import SigninPage from './pages/SignInPage'
import SignUpPage from "./pages/SignUpPage"
import HeaderComponent from './assets/components/Header'
import LogoutPage from './pages/LogoutPage'
import CoursePage from './pages/CoursePage'
import NotFoundPage from './pages/NotFoundPage'
import SignleCoursePage from './pages/SignleCourse'
import CartPage from './pages/CartPage'
import ProfilePage from './pages/ProfilePage'
import CartAdminPage from './pages/admin/CartAdminPage'
import CourseAdminPage from './pages/admin/CourseAdminPage'

function App() {
  const [count, setCount] = useState(0)

  return (

    <BrowserRouter>
      <HeaderComponent />
      <Routes>
        {/* User */}
        <Route path='/' Component={ HomePage } />
        <Route path='/signin' Component={ SigninPage } />
        <Route path='/signup' Component={ SignUpPage } />
        <Route path='/signout' Component={ LogoutPage } />
        <Route path='/courses' Component={ CoursePage } />
        <Route path='/carts' Component={ CartPage } />
        <Route path='/courses/:title' Component={ SignleCoursePage } />
        <Route path='/profile' Component={ ProfilePage } />
        <Route path='*' Component={ NotFoundPage } />
        {/* Admin */}
        <Route path='/admin/cart' Component={ CartAdminPage } />
        <Route path='/admin/course' Component={ CourseAdminPage  } />

      </Routes>

    </BrowserRouter>

  )
}

export default App
