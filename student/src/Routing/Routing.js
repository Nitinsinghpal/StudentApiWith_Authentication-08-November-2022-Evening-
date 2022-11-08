import React from 'react'
import { NavLink,Route,Navigate } from 'react-router-dom'
import Home from '../Screens/Home';

function Routing() {
    const loggedIn=true;
    return (
        <>
            <NavLink
                to="/"
                style={({ isActive }) => ({ color: isActive ? "red" : "black" })}
            >
                Home
            </NavLink>

           
        
        </>
    )
}

export default Routing