import Header from './components/Header'
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer'

function App() {
  return (
    <div className='min-h-screen relative bg-gray-100 '>
      <Header />
      <div className='pb-20'>
      <Outlet />
      </div>
      <Footer/>
    </div>
  )
}
export default App