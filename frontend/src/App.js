import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import background from "../src/image.jpg";


function App() {
  return (
    <>
      <Router >
        {/* <div style={{  backgroundImage: `url(${background})`,backgroundSize: 'auto 100%'}}> */}
        <div>
          <Header />
          <Routes>
            {/* <Route path='/' element={<Dashboard />} /> */}
            <Route path='/' element={<div className='container'><Dashboard /></div>} />

            {/* <Route path='/login' element={<Login />} /> */}
            <Route path='/login' element={<div className='container1'><Login /></div>} />

            {/* <Route path='/register' element={<Register />} /> */}
            <Route path='/register' element={<div className='container1'><Register /></div>} />

          </Routes>
        </div>
        
      </Router>
      <ToastContainer />
    </>
  )
}

export default App