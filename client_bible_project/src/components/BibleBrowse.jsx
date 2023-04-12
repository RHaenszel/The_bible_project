import { useState, useEffect, useContext } from "react";
import { useLoaderData } from 'react-router-dom';
import { UserContext, SearchContext, BibleBookContext } from "../App";
import axios from 'axios';
import BibleBrowseFormater from "./sub/BibleBrowseFormater";

export async function loaderBibleBrowse() {
    let response = await axios.post('/passages/', {
        'name_bible' : "ENGESV",
        'book' : "MAT",
        'chapter' : 1,
        'start' : 1,
        'end' : 25
    });
    console.log("LOADER BROWSER", response.data)
    
    return response.data
}

export const signUp = async(firstName, lastName, email, password) => {
    let response = await axios.post('/signup/', {
        'first_name' : firstName,
        'last_name' : lastName,
        'email' : email,
        'password' : password
    });
    console.log(response.data.success)
    return response.data.success
}

export function BibleBrowse () {

    const {user, setUser} = useContext(UserContext)
    const {searchData, setSearchData} = useContext(SearchContext)
    const {bibleBook, setBibleBook} = useContext(BibleBookContext)

    const biblePassageData = useLoaderData()

    console.log("BibleBrowse Loader Data", biblePassageData)
    
    return (

        <div className="container">

            <h2>Bible Browser</h2>
            <div className="container">

            {/* { searchData.length == 0 ? <p>Empty</p> : <p>Not Empty{searchData[0]['book_name']}</p>} */}
                <p>browse page</p>
                <div className="card mt-1 me-5">
                    <h5 className="card-header">{biblePassageData.newdata[0].book_name}</h5>
                    <div className="card-body">
                        <h6 className="card-title">Chapter: {biblePassageData.chapter} 
                &nbsp; &nbsp; Verse: {biblePassageData.start_verse_number} to {biblePassageData.last_verse_number}</h6>

                    
                        <div className="container">
                        {biblePassageData.newdata.map((item) => (<BibleBrowseFormater 
                                        book_id={item.book_id}
                                        book_name={item.book_name}
                                        chapter={item.chapter}
                                        verse_start={item.verse_start}
                                        verse_end={item.verse_end}
                                        verse_text={item.verse_text}
                                                        />))}
                        </div>
                    </div>
                </div>
            </div>

        </div>

    )

}

export default BibleBrowse