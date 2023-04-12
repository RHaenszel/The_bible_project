import { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";




export function SearchComp(props){

    console.log("Props:", props)

    return (
        <div className="card mt-1 me-5">
            <h5 className="card-header">{props.book_name_alt}</h5>
            <div className="card-body">
                <h6 className="card-title">Chapter: {props.chapter} 
                &nbsp; &nbsp; Verse: {props.verse_start} to {props.verse_end}</h6>
                
                <p>{props.verse_text}</p>

            </div>
        </div>

    )


}




export default SearchComp


/*

 book_id={item.book_id}
book_name_alt={item.book_name_alt}
chapter={item.chapter}
verse_start={item.verse_start}
verse_end={item.verse_end}
verse_text={item.verse_text}


*/