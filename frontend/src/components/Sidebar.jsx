import React from 'react'
import "./sidebar.css"
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { NavLink } from "react-router-dom"
import { sidemenu } from "./sidemenu"
import  backGround from '../images/background.png'
export default function Sidebar({ issidebar, islogin }) {
    return (
        <div className='main' style={{backgroundImage:backGround}} >
        <div className='layout' >
        {/* <div className={`${issidebar ? "smallsidebar" : "bigsidebar"} vh-100 w-25 layout `}> */}
        <div className="bigsidebar vh-100  " >
        <h4 className='p-3'>AppointEase</h4>
            <List component="nav" aria-labelledby="nested-list-subheader" >
                {
                    sidemenu ? sidemenu.map((menu, index) => (
                        <>
                        

                        <NavLink exact className="menu-items p-5" activeClassName="active-menu" to={menu.path} key={index} >
                            
                            <ListItem button >
                                
                                <ListItemIcon style={{ color: "white" }} >
                                    {menu.icon}
                                </ListItemIcon>
                                {
                                    issidebar ? <ListItemText primary={menu.name} /> : null
                                }
                                <h5>{menu.name}</h5>
                            </ListItem>
                        </NavLink>
                        </>

                    )) : null
                }
            </List>
            
            
        </div>
          <div className='content' >
                <div className='body'>
                    {/* <h1>Hello!</h1> */}
                </div>
              </div>
            
          </div>
        
        </div>
    )
}