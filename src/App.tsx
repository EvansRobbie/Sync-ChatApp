import './App.css'
import {Routes, Route} from 'react-router-dom'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Home from './Pages/Home'

function App() {

  return (
    <div className='w-full relative h-screen'>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
      </Routes>
      
    </div>
  )
}

export default App
