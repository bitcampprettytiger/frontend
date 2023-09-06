import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '../App.css'
import Register from '../Login,Join/join/Register';
import Login from './login/Login';
const LoginRoute = () => {
  return (
    <div className='view'>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
      </Routes>
    </BrowserRouter>
  </div>
  )
}

export default LoginRoute