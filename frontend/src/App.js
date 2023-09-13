import React from 'react';
import Login from './Login';
import Signup from './Signup';
import Dashboard from './Dashboard';
import Appointment from './Appointment';
import Confirmation from './Confirmation';
// import Sidebar from './components/Sidebar';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './Home';
import AdminLogin from './AdminLogin';
import Switch from 'react-switch'
import Sidebar from './components/Sidebar';

function App() {
    return(
        <BrowserRouter>
        {/* <Sidebar /> */}
        
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
          <Route path='/adminlogin' element={<AdminLogin />}></Route>
          <Route path='/dashboard' element={<Dashboard />}></Route>
          <Route path='/appointment' element={<Appointment />}></Route>
          <Route path='/confirmation' element={<Confirmation />}></Route>
          <Route path='*' element={<div>Page Not Found!</div>}></Route>
        </Routes>
        
        
        </BrowserRouter>
    )
}



export default App