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
export const SearchContext = createContext(null)
export const BibleBookContext = createContext(null)

function App() {
  const [user, setUser] = useState({"user_data" : null})
  const [searchData, setSearchData] = useState([])
  const [bibleBook, setBibleBook] = useState({
    'name_bible' : "ENGESV",
    'book' : "MAT",
    'chapter' : 1,
    'start' : 1,
    'end' : 25
})

  const csrftoken = Cookies.get('csrftoken')
  // console.log(csrftoken)
  axios.defaults.headers.common["X-CSRFToken"] = csrftoken

  useEffect (() => {
    const getCurrentUser = async () => {
      setUser(await currentUser());
    }
    getCurrentUser()
  }, []);

  // console.log("User", user)
  // console.log("searchData: ", searchData[0])
  console.log("APP bibleBook", bibleBook)
  return (

    <div className="App container">
      <BibleBookContext.Provider value={{bibleBook, setBibleBook}} >
        <SearchContext.Provider value={{searchData, setSearchData}} >
          <UserContext.Provider value={{user, setUser}} >
            <NavBar />
          </UserContext.Provider>
        </SearchContext.Provider>
      </BibleBookContext.Provider>
      <div className="container">  
        <p>-------------App.jsx-----------</p>
        <h3>Hello {user.user_data !== null ? user.user_data.first_name : null} {user.user_data !== null ? user.user_data.last_name : null}</h3>
        {user.user_data !== null ? <h4>Email: {user.user_data.email}</h4> : null }
        {/* {searchData} */}
        <p>-------------App.jsx-----------</p>
        <BibleBookContext.Provider value={{bibleBook, setBibleBook}} >
          <SearchContext.Provider value={{searchData, setSearchData}} >
            <UserContext.Provider value={{user, setUser}} >
              <Outlet />
            </UserContext.Provider>
          </SearchContext.Provider>
        </BibleBookContext.Provider>
        {/* <button className="btn btn-primary mt-1" onClick={() => logOut(setUser)} >Log Out</button> */}
      </div>
    </div>
  )
}

export default App
