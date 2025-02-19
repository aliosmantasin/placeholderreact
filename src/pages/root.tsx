import { Fragment } from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../component/layout/Footer'
import Navbar from '../component/layout/Navbar'



const RootLayout = () => {
  return (
    <Fragment>

      <Navbar/>
      <Outlet />
      <Footer />
      
    </Fragment>
  )
}

export default RootLayout

