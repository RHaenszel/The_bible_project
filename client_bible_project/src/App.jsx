import { useState, useEffect, createContext } from 'react'
import { SignUp } from './components/SignUp'
import { LogIn } from './components/Login'
import { currentUser, logOut } from './utilites'
import Cookies from 'js-cookie';
import axios from 'axios';
import { NavBar } from './components/NavBar';
import { Outlet } from 'react-router-dom';
// import './App.css'

export const UserContext = createContext(null)

function App() {
  const [user, setUser] = useState({"user_data" : null})

  const csrftoken = Cookies.get('csrftoken')
  // console.log(csrftoken)
  axios.defaults.headers.common["X-CSRFToken"] = csrftoken

  useEffect (() => {
    const getCurrentUser = async () => {
      setUser(await currentUser());
    }
    getCurrentUser()
  }, []);

  console.log("User", user)
  

  return (

    <div className="App container">

      <UserContext.Provider value={{user, setUser}} >
        <NavBar />
      </UserContext.Provider>

      <div className="container">  
        
        <h3>Hello {user.user_data !== null ? user.user_data.first_name : null} {user.user_data !== null ? user.user_data.last_name : null}</h3>
        {user.user_data !== null ? <h4>Email: {user.user_data.email}</h4> : null }

        <UserContext.Provider value={{user, setUser}} >
          <Outlet />
        </UserContext.Provider>
        
        <button className="btn btn-primary mt-1" onClick={() => logOut(setUser)} >Log Out</button>
      </div>
    </div>
  )
}

export default App
