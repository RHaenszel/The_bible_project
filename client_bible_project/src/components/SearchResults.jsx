import { useState, useEffect, useContext } from "react";
import { UserContext, SearchContext, BibleBookContext } from "../App";
import SearchComp from "./sub/SearchComp";



export function SearchResults () {

    const {user, setUser} = useContext(UserContext)
    const {searchData, setSearchData} = useContext(SearchContext)
    const {bibleBook, setBibleBook} = useContext(BibleBookContext)
    
    // console.log("Search Page SearchData: ", searchData)

    return (

        <div className="container">

            <h2>Search Page</h2>
            { searchData.length == 0 ? <p>No search results found</p> : <p>Results</p>}
            
            <div className="container">
            {searchData.map((item) => (<SearchComp 
                            book_id={item.book_id}
                            book_name={item.book_name}
                            chapter={item.chapter}
                            verse_start={item.verse_start}
                            verse_end={item.verse_end}
                            verse_text={item.verse_text}
                                            />))}
            
            </div>
        </div>

    )
}

export default SearchResults

