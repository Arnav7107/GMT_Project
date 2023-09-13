import React from 'react'
import "./components/sidebar.css"
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { NavLink } from "react-router-dom"
import { sidemenu } from "./components/sidemenu"
import  backGround from './images/background.png';
import Sidebar from './components/Sidebar';
export default function Dashboard({ issidebar, islogin }) {
    return (
      <>
        
      <div className='main' >
        <div className='layout' >
        <div className='vh-100'><Sidebar /></div>
            <div className='content' >
                <div className='body flex-column'>
                    <h1 className='p-3'>Welcome to AppointEase!</h1>
                    <h5 className='p-3'>Upcoming Appointments</h5>
                    <h5 className='p-3'>Appointment History</h5>
                </div>
            </div>
            
        
        </div>
        </div>
        </>
    )
}