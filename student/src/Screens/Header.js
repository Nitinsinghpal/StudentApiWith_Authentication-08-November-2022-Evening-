import React from 'react'
import { Link, Outlet } from 'react-router-dom'
function Header() {
  return (
    <>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <a class="navbar-brand" href="/">Navbar</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
  
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
            <Link className='nav-link' to="/">Home</Link>
        </li>
        <li class="nav-item">
        <Link className='nav-link' to="/about">About</Link>

        </li>
        <li class="nav-item">
        <Link className='nav-link' to="/student">Student</Link>

        </li>
        <li class="nav-item">
        <Link className='nav-link' to="/class">Class</Link>

        </li>
        <li class="nav-item">
        <Link className='nav-link' to="/previousState">Demo</Link>

        </li>
        <li class="nav-item">
        <Link className='nav-link' to="/demoBulkRegister">DemoBulkRegister</Link>

        </li>
        <li class="nav-item">
        <Link className='nav-link' to="/multiCheckBox">MultiCheckBox</Link>

        </li>
        <li class="nav-item">
        <Link className='nav-link' to="/useState">UseState</Link>

        </li>
       
      
      </ul>
      
      <Link className='nav-link' to="/register">
        <button class="btn btn-outline-success my-2 my-sm-0">Register</button>
</Link>
<Link className='nav-link' to="/bulkApp">
        <button class="btn btn-outline-success my-2 my-sm-0">BulkRegister</button>
</Link>

      
<Link className='nav-link' to="/login">
        <button class="btn btn-outline-success my-2 my-sm-0" data-toggle="modal" data-target="#newLogin">Login</button>
      </Link>

      {/* <form class="form-inline my-2 my-lg-0">
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">register</button>
      </form>
      <form class="form-inline my-2 my-lg-0">
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Login</button>
      </form> */}
    </div>
  </nav>
  <Outlet/>
  </>
  )
}

export default Header