import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom"
import { logOut, search } from "../utilites"
import { UserContext, SearchContext } from "../App";

export const NavBar = () => {
    
    const [searchTerm, setSearchTerm] = useState('')
    const {user, setUser} = useContext(UserContext)
    const {searchData, setSearchData} = useContext(SearchContext)
    const navigate = useNavigate();

    // console.log("NavBar")
    // console.log("NavBar SearchData", searchData)

    return (

        <>
{user.user_data !== null ? user.user_data.first_name : null}
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link className="navbar-brand" to={'/'} >The Bible Project</Link>
                <button className="navbar-toggler" 
                        type="button" 
                        data-bs-toggle="collapse" 
                        data-bs-target="#navbarSupportedContent">
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
                    <li className="nav-item">
                    <Link className="nav-link" to={'/signup/'} >Sign Up</Link>
                    </li>
                    
                    <li className="nav-item">
                    <Link className="nav-link" to={'/browse/'} >Browse</Link>
                    </li>
                    {user.user_data !== null ? (
                    <li className="nav-item">
                    <Link className="nav-link" to={'/journal/'} >Journal</Link>
                    </li>
                    ) : (null) }

                </ul>
                <form className="d-flex" 
                        role="search"
                        onSubmit={(event) => [
                            event.preventDefault(),
                            search(searchTerm, setUser, setSearchData),
                            setSearchTerm(""),
                            navigate("/search")
                        ]}
                        >
                    <input className="form-control me-2" 
                            type="search" 
                            placeholder="Search" 
                            value={searchTerm}
                            onChange={(event) => setSearchTerm(event.target.value)}
                            />
                    <button className="btn btn-outline-success btn-sm" 
                            type="submit"
                            >Search</button>
                </form>
                <button className="btn btn-primary ms-3 btn-sm" 
                            onClick={() => [logOut(setUser),
                                            navigate("/")
                                            ]} >Log Out</button>
                </div>
            </div>
            </nav>

        </>

    )
}