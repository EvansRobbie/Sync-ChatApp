import './App.css'
import {Routes, Route, } from 'react-router-dom'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Home from './Pages/Home'
import { ProtectedRoute } from './components/ProtectedRoute'

function App() {
 
  return (
    <div className='w-full relative h-screen'>
      <Routes>
        <Route path='/' element={<ProtectedRoute><Home/></ProtectedRoute>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
      </Routes>
      
    </div>
  )
}

export default App
