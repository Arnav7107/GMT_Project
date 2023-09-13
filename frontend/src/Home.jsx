import React, { useEffect,useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import  backGround from './images/background.png';
import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarToggler,
    MDBIcon,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBDropdown,
    MDBDropdownToggle,
    MDBDropdownMenu,
    MDBDropdownItem,
    MDBDropdownLink,
    MDBCollapse,
    MDBRipple,
    MDBBadge,
    MDBInput,
    MDBListGroup,
    MDBListGroupItem
  } from 'mdb-react-ui-kit';

const Home = () => {
    const [auth,setAuth] = useState(false);
    const [name,seName] = useState('');
    const [message,setMessage] = useState('');
    const [showShow, setShowShow] = useState(false);

  const toggleShow = () => setShowShow(!showShow);

    axios.defaults.withCredentials = true;
    useEffect(() =>{
        axios.get('http://localhost:4000/')
        .then( res =>{
            if(res.data.Status === 'Success')
            {
                setAuth(true);
                seName(res.data.name);
            }else{
                setAuth(false);
                setMessage(res.data.Message);
            }
        })
    },[])

    const handleLogout = () =>{
        axios.get('http://localhost:4000/logout')
        .then(res =>{
            if(res.data.Status === 'Success'){
                window.location.reload(true);  
            }else{
                alert("error");
            }
            
        }).catch(err =>console.log(err))
    }
  return (
    <div className='bg-dark vh-100' >
    <div className=' vh-100 d-flex justify-content-center align-items-center'>
         <div className='container mt-4 justify-content-center align-items-center'>
        {
            auth ?
            <div>
                <h3 className='text-white'>Log Out of AppointEase?  {name}</h3>
                


  

                <button onClick={handleLogout} className='btn btn-danger'>Log Out</button>
            </div>
            :
            <div>
                {/* {message} */}
                <div className='d-flex flex-row mb-3 p-4 m-5 justify-content-center align-items-center ' style={{padding: "0rem"}}>
                <h3 className='text-white'>Log In Now</h3>
                <Link to='/login' className='btn btn-primary ms-5 '>Log In</Link>
                </div>
                <div className='d-flex flex-row mb-3 p-4 m-5 justify-content-center align-items-center'>
                <h3 className='d-flex flex-row mb-3 ms-5 my-0 font-weight-bold text-white'>If you are Admin</h3>
                <Link to='/adminlogin' className='btn btn-primary ms-5'>Admin Login</Link>
                </div>
                
                
                <div className='d-flex flex-row mb-3 p-4 m-5 justify-content-center align-items-center'>
                <h4 className='text-white'>New User??</h4>
                <Link to='/signup' className='btn btn-success ms-5'>Sign Up</Link>
                </div>
                
                
            </div>
        }
    </div>
    </div>
    </div>
   
  )
}

export default Home