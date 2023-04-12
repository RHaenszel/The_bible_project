import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom"
import { logOut } from "../utilites"
import { UserContext } from "../App";

export const NavBar = () => {
    
    const {user, setUser} = useContext(UserContext)

    return (

        <>

            <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link className="navbar-brand" to={'/'} >The Bible Project</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                    <Link className="nav-link active" to={'/'} >Home</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" to={'/login/'} >Log In</Link>
                    </li>
                    <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Dropdown
                    </a>
                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#">Action</a></li>
                        <li><a className="dropdown-item" href="#">Another action</a></li>
                        <li><hr className="dropdown-divider"/></li>
                        <li><a className="dropdown-item" href="#">Something else here</a></li>
                    </ul>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" to={'/login/'} >Another Link</Link>
                    </li>
                </ul>
                <form className="d-flex" role="search">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                    <button className="btn btn-outline-success btn-sm" type="submit">Search</button>
                    <button className="btn btn-primary ms-1 btn-sm" onClick={() => logOut(setUser)} >Log Out</button>
                </form>
                </div>
            </div>
            </nav>

        </>

    )
}