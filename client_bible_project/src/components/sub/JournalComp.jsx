import { useState, useEffect, useContext } from "react";
import { UserContext, SearchContext, BibleBookContext } from "../App";




export function JournalComp () {

    const {user, setUser} = useContext(UserContext)
    const {searchData, setSearchData} = useContext(SearchContext)
    const {bibleBook, setBibleBook} = useContext(BibleBookContext)
    
    // console.log("Search Page SearchData: ", searchData)

    return (

        <div className="container">

            
        </div>

    )
}

export default JournalComp