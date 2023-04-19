import { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";




export function BibleBrowseFormater(props){

    // console.log("Props:", props)

    return (
        
               <>
                &nbsp;<b>({props.verse_start})</b> {props.verse_text} 
               </>  

    )

}


export default BibleBrowseFormater