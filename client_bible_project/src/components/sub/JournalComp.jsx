import { useState, useEffect, useContext } from "react";
import { UserContext, SearchContext, BibleBookContext } from "../../App";
                        


export function JournalComp (props) {

    const {id, title , name_bible, book, chapter, 
        start, end, journal_entry, user_fk_id, 
        setJournalTitle, setJournalEntry, setJournalBiblePassageData} = props

    const {user, setUser} = useContext(UserContext)
    const {searchData, setSearchData} = useContext(SearchContext)
    const {bibleBook, setBibleBook} = useContext(BibleBookContext)
    // console.log("PROPS :", props)
    // console.log("Search Page SearchData: ", searchData)

    return (

        <div className="container card">
            <div className="container card-body"
                onClick={(event) => [
                    event.preventDefault(),
                    setJournalTitle(title),
                    setJournalEntry(journal_entry),
                    setBibleBook({
                        name_bible: name_bible,
                        book: book,
                        chapter: chapter,
                        start: start,
                        end: end,
                        id: id
                    })
                  ]}
            
            
            >

                <p>{id}{title}</p>
            
            </div>
            
        </div>

    )
}

export default JournalComp