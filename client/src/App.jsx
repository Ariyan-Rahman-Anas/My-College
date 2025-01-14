import Header from './components/Header'
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer'

function App() {
  return (
    <div className='min-h-screen max-w-[1920px] mx-auto relative bg-gray-100 '>
      <Header />
      <div className='py-4'>
      <Outlet />
      </div>
      <Footer/>
    </div>
  )
}
export default App