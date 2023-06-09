import { useState, useEffect, createContext } from "react";
import { SignUp } from "./components/SignUp";
import { LogIn } from "./components/Login";
import { currentUser, logOut } from "./utilites";
import Cookies from "js-cookie";
import axios from "axios";
import { NavBar } from "./components/NavBar";
import { Outlet } from "react-router-dom";
import './App.css'

export const UserContext = createContext(null);
export const SearchContext = createContext(null);
export const BibleBookContext = createContext(null);

function App() {
  const [user, setUser] = useState({ user_data: null });
  const [searchData, setSearchData] = useState([]);
  const [bibleBook, setBibleBook] = useState({
    name_bible: "ENGESV",
    book: "LUK",
    chapter: 1,
    start: 1,
    end: 2,
  });

  const csrftoken = Cookies.get("csrftoken");
  // console.log(csrftoken)
  axios.defaults.headers.common["X-CSRFToken"] = csrftoken;

  useEffect(() => {
    const getCurrentUser = async () => {
      setUser(await currentUser());
    };
    getCurrentUser();
  }, []);

  console.log("User", user);
  // console.log("searchData: ", searchData[0])
  // console.log("APP bibleBook", bibleBook)
  return (

    <div className="App container border border-success-subtle rounded-2 background_target2">
      
      <BibleBookContext.Provider value={{ bibleBook, setBibleBook }}>
        <SearchContext.Provider value={{ searchData, setSearchData }}>
          <UserContext.Provider value={{ user, setUser }}>
            <NavBar />
          </UserContext.Provider>
        </SearchContext.Provider>
      </BibleBookContext.Provider>
      <div className="container">
        
        <p className="container border border-success-subtle rounded-2">
        {user.user_data !== null ? <>Welcome {user.user_data.first_name} {user.user_data.last_name} </> : null}
          {/* {user.user_data !== null ? user.user_data.first_name : null}{" "}
          {user.user_data !== null ? user.user_data.last_name : null}{" "}
          {user.user_data !== null ? user.user_data.email : null} */}
        </p>
        
        {/* {searchData} */}
        <div className="container mb-4 background_target">
        <BibleBookContext.Provider value={{ bibleBook, setBibleBook }}>
          <SearchContext.Provider value={{ searchData, setSearchData }}>
            <UserContext.Provider value={{ user, setUser }}>
              <Outlet />
            </UserContext.Provider>
          </SearchContext.Provider>
        </BibleBookContext.Provider>
        {/* <button className="btn btn-primary mt-1" onClick={() => logOut(setUser)} >Log Out</button> */}
        </div>
      </div>
    </div>
  );
}

export default App;
