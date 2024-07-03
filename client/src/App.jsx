import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import About from './pages/About'
import Profile from './pages/Profile'
import Header from './components/Header'
import PrivateRoute from './components/PrivateRoute'


function App() {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/about' element={<About/>}/>
        {/* Protect profile page */}
        <Route element={<PrivateRoute/>}>
          <Route path='/profile' element={<Profile/>}/>
        </Route>
        
      </Routes>
    </BrowserRouter>
    
  )
}

export default App