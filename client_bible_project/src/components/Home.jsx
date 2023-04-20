import { useState, useEffect, useContext } from "react";
import { UserContext } from "../App";

export function Home () {

    const {user, setUser} = useContext(UserContext)


    return (

        <div className="container">

            <h2>Home Page</h2>
            <h4>
                Welcome {user.user_data !== null ? user.user_data.first_name : null} 
                &nbsp;{user.user_data !== null ? user.user_data.last_name : null}
            </h4>

        </div>

    )
}